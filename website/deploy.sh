#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  Website bauen und auf den Hetzner-Server hochladen.
#  Aufruf (im Ordner website/):   ./deploy.sh
#  Braucht Node.js (https://nodejs.org) und einen SSH-Zugang zum Server.
#  Caddy liefert die Dateien direkt aus /var/www/abora-automation.de aus,
#  ein Neustart ist nicht nötig. n8n wird nicht angefasst.
# ─────────────────────────────────────────────────────────────
set -euo pipefail

SERVER="root@2.31.26.76"
ZIEL="/var/www/abora-automation.de"

cd "$(dirname "$0")"

echo "▶ Website bauen …"
npm ci --no-audit --no-fund
npm run build

echo "▶ Hochladen nach $SERVER:$ZIEL …"
rsync -az --delete --human-readable --info=stats1 dist/ "$SERVER:$ZIEL/"

echo "✓ Fertig: https://abora-automation.de"
