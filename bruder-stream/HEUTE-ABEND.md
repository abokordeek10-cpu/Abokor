# Checkliste: erster Stream heute Nacht

## Was heute schon fertig ist
| | Was | Wie |
|---|---|---|
| ✅ | **GTA-Coach** | Claude-Projekt anlegen (siehe unten), live am Handy oder zweiten Bildschirm fragen |
| ✅ | **Stream-Manager** | Claude-Projekt anlegen, „Stream heute“ schreiben → Titel und Ankündigung |
| ✅ | **Clip-Agent** | Programm `clip-agent/clipper.py`, läuft morgen früh auf der Aufnahme von heute |
| ✅ | **Trend-Scout** | n8n-Workflow, ab morgen 6:00 jeden Tag ein Briefing |
| ⏳ | Chat-Bot mit KI | später; heute einfache Befehle mit Nightbot (siehe unten) |
| ⏳ | Watcher (Twitch-Aufnahmen automatisch holen) | später; heute nimmt OBS selbst auf |
| ⏳ | Google-Cloud-Server | später; heute reicht der PC |

## 1. Claude-Projekte anlegen (10 Minuten)
1. claude.ai → links **Projekte** → **Neues Projekt** → Name „GTA-6-Coach“.
2. Bei **Anweisungen** den Inhalt von `skills/eigene/gta6-coach/SKILL.md` einfügen (ohne die drei Zeilen oben zwischen `---`).
3. Zweites Projekt „Stream-Manager“ mit `agenten/1-stream-manager.md`.
4. Im Stream-Manager heute schreiben: „Stream heute: erster Stream, GTA 6 zum Release.“

## 2. Einfacher Chat-Bot für heute: Nightbot (10 Minuten, kostenlos)
1. nightbot.tv → mit Twitch anmelden → **Join Channel**. Auf Twitch den Bot zum Moderator machen: im Chat `/mod nightbot`.
2. **Commands** → Add:
   - `!zeiten` → „Live: [eure Zeiten eintragen]“
   - `!socials` → „TikTok: … · YouTube: … · Instagram: …“
   - `!setup` → „PS5, Elgato HD60 X, OBS, iPhone 13 als Kamera“
   - `!regeln` → „Kein Spam, keine Beleidigungen, keine Spoiler. Viel Spaß!“
3. **Spam Protection** → Links, Caps und Wiederholungen einschalten.
4. **Timers** → alle 20 Minuten: „Folgt für mehr GTA 6! Clips auf TikTok: …“

## 3. OBS vor dem Start
- [ ] PS5: Einstellungen → System → **HDCP aus**
- [ ] Elgato: PS5 → HDMI IN, HDMI OUT → Fernseher/Monitor, USB → PC
- [ ] OBS: Quelle „Videoaufnahmegerät“ (Elgato), Quelle iPhone über Camo, Mikro
- [ ] Encoder NVENC H.264 · 1080p30 (ruckelt es: 720p60) · 6000 kbps
- [ ] Mikro-Filter: Rauschunterdrückung + Noise Gate
- [ ] **Aufnahme** in mkv zusätzlich zum Stream, **Replay-Puffer** mit Taste
- [ ] 2 Minuten Teststream oder Testaufnahme ansehen: Ton synchron? Ruckelt es? Unten in OBS keine „übersprungenen Frames“?
- [ ] LAN-Kabel statt WLAN

## 4. Während des Streams
- Bei jedem krassen Moment: **Replay-Taste** drücken.
- Neue Orte, Geldmethoden, Überraschungen kurz auf einem Zettel notieren: Das sind morgen eure Guide-Videos.
- Keine Story-Spoiler im Titel.

## 5. Morgen früh
1. **Trend-Scout-Briefing** öffnen (Link aus dem Workflow, siehe `trend-scout/README.md`).
2. **Clip-Agent** auf die Aufnahme von heute Nacht laufen lassen → `freigabe.html` → beste 2–3 Clips posten.
3. Replay-Clips direkt posten, falls sie stark sind.
