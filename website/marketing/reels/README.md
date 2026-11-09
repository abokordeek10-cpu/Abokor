# Reels

Vorlage für Hochformat-Reels (1080 × 1920) im Look der Website. Die Inhalte stehen in `reels.json`
(echte Antworten aus der Live-Demo), `reel.html` spielt sie ab, `aufnahme.cjs` nimmt sie mit Playwright auf.

```bash
cd website/marketing/reels
mkdir -p fonts && cp ../../public/fonts/*.woff2 fonts/
python3 -m http.server 8765 --bind 127.0.0.1 &
node aufnahme.cjs notfall      # oder: termin, angebot
# danach mit ffmpeg nach MP4 (H.264, 30 fps) wandeln, siehe Projekt-Chat
```

Die fertigen MP4-Dateien liegen nicht im Repository (zu groß).
