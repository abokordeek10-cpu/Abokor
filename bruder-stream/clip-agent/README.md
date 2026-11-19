# Clip-Agent: aus der Stream-Aufnahme fertige Clips

Macht aus einer Aufnahme automatisch Hochkant-Clips (9:16) mit Untertiteln, je **TikTok-Version (über 60 s)** und **Kurz-Version (30–60 s)**, plus eine Seite **freigabe.html** mit Titel, Bildunterschrift und Hashtags. Es wird **nichts automatisch gepostet**.

## Einmal einrichten (Windows-PC)
1. **Python** installieren: python.org → Download → beim Installieren **„Add python.exe to PATH“** anhaken.
2. **ffmpeg** installieren: Eingabeaufforderung öffnen (Windows-Taste → `cmd`) und eingeben:
   ```
   winget install Gyan.FFmpeg
   ```
   Danach die Eingabeaufforderung schließen und neu öffnen.
3. Pakete installieren:
   ```
   pip install anthropic faster-whisper requests
   ```
4. **API-Schlüssel** aus der Claude Console (platform.claude.com → API Keys) als Umgebungsvariable setzen. Nur einmal nötig, danach Eingabeaufforderung neu öffnen:
   ```
   setx ANTHROPIC_API_KEY "dein-schlüssel"
   ```
   Den Schlüssel nie in eine Datei schreiben, nie auf GitHub, nie in den Chat.

## Benutzen
Ordner mit `clipper.py` öffnen, in die Adresszeile `cmd` tippen, Enter, dann:
```
python clipper.py "C:\Users\...\Videos\2026-11-19 22-00-00.mkv" --gpu
```
- `--gpu` nutzt die GTX 1650 zum Schneiden (schneller).
- `--anzahl 10` für mehr Clips (Standard 8).
- `--ohne-ki` geht auch ohne Claude-Schlüssel, nimmt dann einfach die lautesten Momente.
- `--transkription elevenlabs` statt Whisper, braucht `ELEVENLABS_API_KEY`.

Am Ende im Ordner `clips_<name>` die Datei **freigabe.html** öffnen, Clips ansehen, die guten hochladen.

**Zeit:** Whisper „small“ auf der GTX 1650 braucht grob ein Drittel bis die Hälfte der Stream-Länge (Schätzung). Am besten über Nacht laufen lassen.
**Kosten Claude:** ein Durchlauf für einen 3-Stunden-Stream ca. 0,10–0,50 € (Schätzung nach Preisliste, hängt von der Länge des Transkripts ab).

## OBS richtig aufnehmen
- Einstellungen → Ausgabe → Aufnahme: Format **mkv** (geht bei Absturz nicht kaputt), Encoder NVENC.
- Streamen **und** gleichzeitig aufnehmen („Aufnahme starten“ zusätzlich zu „Stream starten“).
- **Replay-Puffer** einschalten (Einstellungen → Ausgabe → Replay-Puffer, 60 Sekunden) und eine Taste dafür belegen (Einstellungen → Hotkeys → „Replay speichern“). Bei einem krassen Moment Taste drücken: Die letzten 60 Sekunden landen sofort als Datei im Video-Ordner. Das ist der schnellste Clip.
