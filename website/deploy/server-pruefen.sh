#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  NUR LESEN: zeigt, was auf dem Server läuft. Ändert nichts.
#  Aufruf vom eigenen Rechner (im Ordner website/):
#    ssh root@2.31.26.76 'bash -s' < deploy/server-pruefen.sh
#  Passwörter und Schlüssel werden bewusst NICHT ausgegeben.
# ─────────────────────────────────────────────────────────────

echo "== System =="
. /etc/os-release 2>/dev/null && echo "$PRETTY_NAME"
df -h / | tail -1

echo; echo "== Wer belegt Port 80, 443 und 5678? =="
ss -tlnp 2>/dev/null | grep -E ':(80|443|5678)\s' || echo "nichts gefunden"

echo; echo "== Webserver als Dienst =="
for s in caddy nginx traefik apache2; do printf '%-8s %s\n' "$s" "$(systemctl is-active "$s" 2>/dev/null || true)"; done

echo; echo "== Docker =="
if command -v docker >/dev/null; then
  docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
  echo; echo "-- Compose-Projekte --"
  docker compose ls 2>/dev/null || true
  echo; echo "-- Eingebundene Ordner je Container --"
  docker ps -q | xargs -r docker inspect --format '{{.Name}}: {{range .Mounts}}{{.Source}} -> {{.Destination}}  {{end}}'
  echo; echo "-- n8n-Löscheinstellungen (nur EXECUTIONS_*-Variablen) --"
  docker ps -q | xargs -r docker inspect --format '{{.Name}}{{range .Config.Env}}{{"\n"}}  {{.}}{{end}}' | grep -E '^/|EXECUTIONS_DATA' || true
  echo; echo "-- Log-Einstellung der Container --"
  docker ps -q | xargs -r docker inspect --format '{{.Name}}: {{.HostConfig.LogConfig.Type}} {{.HostConfig.LogConfig.Config}}'
  echo; echo "-- /etc/docker/daemon.json --"
  cat /etc/docker/daemon.json 2>/dev/null || echo "(keine)"
else
  echo "Docker ist nicht installiert"
fi

echo; echo "== Caddy-Konfiguration =="
cat /etc/caddy/Caddyfile 2>/dev/null || echo "(kein /etc/caddy/Caddyfile)"
for f in $(docker ps -q 2>/dev/null | xargs -r docker inspect --format '{{range .Mounts}}{{.Source}} {{end}}' 2>/dev/null); do
  case "$f" in *Caddyfile*) echo "-- $f --"; cat "$f";; esac
done

echo; echo "== Nginx =="
ls -1 /etc/nginx/sites-enabled 2>/dev/null || echo "(kein Nginx)"

echo; echo "== Systemprotokoll (journald) =="
grep -hvE '^\s*(#|$)' /etc/systemd/journald.conf /etc/systemd/journald.conf.d/*.conf 2>/dev/null || true
journalctl --disk-usage 2>/dev/null

echo; echo "== Logrotate für Webserver =="
ls -1 /etc/logrotate.d 2>/dev/null | grep -Ei 'nginx|caddy|apache' || echo "(keine)"

echo; echo "== Ordner für die Website =="
ls -la /var/www 2>/dev/null || echo "(/var/www gibt es noch nicht)"
