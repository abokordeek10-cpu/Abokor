#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  Richtet den Abora-Server auf einer neuen Google-Cloud-VM ein
#  (Debian 12): Docker, Caddy, n8n, Website abora-automation.de
#  und tran-koch.de. Kann gefahrlos mehrmals laufen.
#  Aufruf in der SSH-Konsole der VM:
#    curl -fsSL <Adresse dieses Skripts> | sudo bash
# ─────────────────────────────────────────────────────────────
set -euo pipefail
[ "$(id -u)" = 0 ] || { echo "Bitte mit sudo starten."; exit 1; }
REPO="https://raw.githubusercontent.com/abokordeek10-cpu/Abokor"
QUELLE="$REPO/relaunch-blueprint/website/deploy"
DIST="$REPO/website-dist"

echo "▶ 1/6 Auslagerungsspeicher (2 GB) …"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "▶ 2/6 Docker …"
command -v docker >/dev/null || curl -fsSL https://get.docker.com | sh

echo "▶ 3/6 Konfiguration …"
mkdir -p /root/abora /var/www/abora-automation.de /var/www/henry-tran.de
cd /root/abora
curl -fsSL "$QUELLE/docker-compose.yml" -o docker-compose.yml
curl -fsSL "$QUELLE/Caddyfile" -o Caddyfile
if [ ! -f .env ]; then
  ( umask 077; printf 'N8N_ENCRYPTION_KEY=%s\n' "$(openssl rand -hex 32)" > .env )
  echo "  Neuer n8n-Schlüssel in /root/abora/.env angelegt (nicht weitergeben, nicht löschen)."
fi

echo "▶ 4/6 Websites …"
curl -fsSL "$DIST/abora-website.tar.gz" | tar -xz -C /var/www/abora-automation.de
curl -fsSL "$DIST/henry-tran.tar.gz" | tar -xz -C /var/www/henry-tran.de

echo "▶ 5/6 Starten …"
docker compose pull -q
docker compose up -d

echo "▶ 6/6 Prüfen …"
sleep 5
docker compose ps
echo
echo "✓ Fertig. Externe IP dieses Servers: $(curl -fsS -H 'Metadata-Flavor: Google' http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip 2>/dev/null || echo 'siehe Google Cloud Console')"
echo "  Sobald die DNS-Einträge auf diese IP zeigen, holt Caddy die HTTPS-Zertifikate automatisch."
