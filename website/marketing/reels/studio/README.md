# Reel-Studio

Macht aus einem kurzen Drehbuch automatisch ein fertiges Reel (1080×1920, 30 fps) mit deiner geklonten Stimme,
Untertiteln Wort für Wort, Logo und Abschlusskarte.

- `geschichten/<id>.json` – Drehbuch: Text, Serie, Stil, Szenen, Bildunterschrift, Hashtags
- `stimme.py` – erzeugt Stimme + Wort-Zeiten über ElevenLabs (Stimme „meine stimme“)
- `reel.html` – die Schnitt-Maschine (Stile: `kinetisch`, `kino`, `papier`)
- `rendern.cjs` – macht daraus das MP4
- `GESCHICHTENBANK.md` – Serien und Ideen für jeden Tag

## Ablauf
```
python3 stimme.py geschichten/<id>.json
python3 -m http.server 8770 &
node rendern.cjs <id>            # oder: node rendern.cjs alle
node rendern.cjs <id> --vorschau # nur Standbilder zum Prüfen
```
Fertige Dateien landen in `ausgabe/` (nicht im Git).

## Szenentypen
`titel`, `liste`, `rennen`, `chat`, `zahl`, `uhr`, `karte`, `meldungen`, `ende`.
Jede Szene startet bei einem gesprochenen Wort (`"bei": "drittens"`, auch mehrere Wörter: `"bei": "das ist"`).
