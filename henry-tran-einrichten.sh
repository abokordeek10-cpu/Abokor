#!/bin/bash
# Richtet henry-tran.de (Tran Koch) zusätzlich auf dem Abora-Server ein.
# - legt Backups von Caddyfile und docker-compose.override.yml an
# - lädt die Website nach /var/www/henry-tran.de
# - ergänzt Caddy um henry-tran.de und www.henry-tran.de (HTTPS automatisch)
# - prüft die neue Caddy-Konfiguration; bei Fehler wird alles zurückgesetzt
# - startet NUR den Caddy-Container neu (n8n läuft weiter)
set -euo pipefail
cd /root/n8n
STAMP=$(date +%Y%m%d-%H%M%S)
QUELLE=https://raw.githubusercontent.com/abokordeek10-cpu/Abokor/website-dist

echo "1/5 Backups anlegen"
cp Caddyfile "Caddyfile.backup-$STAMP"
cp docker-compose.override.yml "docker-compose.override.yml.backup-$STAMP"

echo "2/5 Website herunterladen"
mkdir -p /var/www/henry-tran.de
curl -fsSL "$QUELLE/henry-tran.tar.gz" | tar -xz -C /var/www/henry-tran.de

echo "3/5 Konfiguration ergänzen"
if ! grep -q "/srv/henry-tran" docker-compose.override.yml; then
  sed -i '/\/srv\/abora:ro/a\      - /var/www/henry-tran.de:/srv/henry-tran:ro' docker-compose.override.yml
fi
if ! grep -q "^henry-tran.de" Caddyfile; then
  cat >> Caddyfile <<'EOF'

# Website Tran Koch (Freund, gehostet auf diesem Server)
henry-tran.de {
	root * /srv/henry-tran
	encode zstd gzip
	try_files {path} {path}.html
	header {
		Strict-Transport-Security "max-age=31536000"
		X-Content-Type-Options "nosniff"
		Referrer-Policy "strict-origin-when-cross-origin"
		X-Frame-Options "SAMEORIGIN"
		-Server
	}
	file_server
}

www.henry-tran.de {
	redir https://henry-tran.de{uri} permanent
}
EOF
fi

echo "4/5 Neue Konfiguration prüfen"
if ! docker compose run --rm --no-deps caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile; then
  echo "FEHLER in der Konfiguration – setze alles zurück, nichts wurde geändert."
  cp "Caddyfile.backup-$STAMP" Caddyfile
  cp "docker-compose.override.yml.backup-$STAMP" docker-compose.override.yml
  exit 1
fi

echo "5/5 Caddy neu starten (n8n läuft weiter)"
docker compose up -d caddy
sleep 5
docker compose ps
echo "FERTIG – Backups: Caddyfile.backup-$STAMP und docker-compose.override.yml.backup-$STAMP"
