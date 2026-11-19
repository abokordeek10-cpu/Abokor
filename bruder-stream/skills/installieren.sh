#!/usr/bin/env bash
# Installiert alle Skills für die Stream-Agenten.
#   - die offiziellen Anthropic-Skills (github.com/anthropics/skills, festgelegter, geprüfter Stand)
#   - die eigenen Skills aus dem Ordner "eigene"
# Ziel: ~/.claude/skills  (dort finden Claude Code und das Claude Agent SDK sie automatisch)
#
# Aufruf auf dem Server:   bash installieren.sh
# Anderes Ziel:            bash installieren.sh /pfad/zum/projekt/.claude/skills
set -euo pipefail

ZIEL="${1:-$HOME/.claude/skills}"
OFFIZIELL_COMMIT="e4bb5d960d87126ff3b3a8af1a104b7db67560ba"   # am 19.11.2026 geprüft
HIER="$(cd "$(dirname "$0")" && pwd)"

command -v git >/dev/null || { echo "Bitte zuerst git installieren (z. B. sudo apt-get install -y git)."; exit 1; }
mkdir -p "$ZIEL"

# Sicherung, falls schon Skills da sind
if [ -n "$(ls -A "$ZIEL" 2>/dev/null)" ]; then
  SICHERUNG="$ZIEL.sicherung-$(date +%Y%m%d-%H%M%S)"
  cp -a "$ZIEL" "$SICHERUNG"
  echo "Sicherung der bisherigen Skills: $SICHERUNG"
fi

# 1. Offizielle Skills genau in der geprüften Version holen
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
git -c advice.detachedHead=false clone -q https://github.com/anthropics/skills "$TMP/offiziell"
git -C "$TMP/offiziell" -c advice.detachedHead=false checkout -q "$OFFIZIELL_COMMIT"
for s in "$TMP"/offiziell/skills/*/; do
  name="$(basename "$s")"
  rm -rf "$ZIEL/$name"
  cp -a "$s" "$ZIEL/$name"
done

# 2. Eigene Skills (überschreiben gleichnamige)
for s in "$HIER"/eigene/*/; do
  name="$(basename "$s")"
  rm -rf "$ZIEL/$name"
  cp -a "$s" "$ZIEL/$name"
done

# 3. Prüfen
echo
echo "Installiert in $ZIEL:"
fehler=0
for s in "$ZIEL"/*/; do
  name="$(basename "$s")"
  if [ -f "$s/SKILL.md" ] && head -5 "$s/SKILL.md" | grep -q '^name:'; then
    echo "  ok  $name"
  else
    echo "  !!  $name (SKILL.md fehlt oder ohne name:)"; fehler=1
  fi
done
exit $fehler
