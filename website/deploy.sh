#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  Website bauen und auf den Hetzner-Server hochladen.
#  Aufruf (im Ordner website/):   ./deploy.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

# TODO: SERVER – diese drei Werte anpassen
SERVER="root@[SERVER-IP]"            # SSH-Zugang, z. B. root@123.45.67.89
ZIEL="/var/www/abora-automation.de"   # Ordner auf dem Server, aus dem der Webserver ausliefert
SSH_PORT="22"

cd "$(dirname "$0")"

if [[ "$SERVER" == *"["* ]]; then
  echo "Bitte zuerst SERVER in deploy.sh eintragen." >&2
  exit 1
fi

echo "▶ Abhängigkeiten prüfen …"
npm ci --no-audit --no-fund

echo "▶ Website bauen …"
npm run build

echo "▶ Hochladen nach $SERVER:$ZIEL …"
ssh -p "$SSH_PORT" "$SERVER" "mkdir -p '$ZIEL'"
# --delete entfernt auf dem Server Dateien, die es lokal nicht mehr gibt
rsync -az --delete --human-readable --info=stats1 \
  -e "ssh -p $SSH_PORT" \
  dist/ "$SERVER:$ZIEL/"

echo "✓ Fertig. Die Website ist aktualisiert: https://abora-automation.de"
