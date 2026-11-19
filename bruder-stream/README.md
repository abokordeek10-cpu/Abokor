# GTA-6-Stream: Plan, Agenten und Skills

Stand 19.11.2026. Zusammengeführt aus der Planung im Claude-Chat und dieser Sitzung.

## Die Idee
GTA 6 erzeugt einen riesigen Hype, ähnlich wie damals Fortnite. Zwei Brüder streamen GTA 6 und machen daraus Kurzvideos.
- **Dein Bruder** hat den **Hauptkanal** und streamt regelmäßig (vor allem Twitch, zusätzlich YouTube/TikTok).
- **Du** kommst als **Co-Host** dazu, wenn du Zeit hast (Abi und Agentur gehen vor). Eigener Kanal später, vor allem mit Shorts und Erklärvideos.
- **Euer Vorteil:** GTA 6 startet als Einzelspieler. Einer spielt, der andere kommentiert und reagiert. Das Duo-Format hebt euch ab.
- **Die größte Chance:** In den ersten 2–3 Wochen sucht jeder auf Deutsch nach „GTA 6 schnell Geld“, „versteckte Orte“, „beste Autos“. Kurze Antworten in 30–90 Sekunden statt 20-Minuten-Videos. Wer früh gute Videos hat, wird gefunden.

## Fakten zum Spiel (vor Start prüfen)
- Zum Start nur **PlayStation 5 und Xbox Series X|S**, kein PC.
- Zum Start **Einzelspieler** (Story und freies Spielen). GTA Online und Roleplay (Rockstar arbeitet mit NoPixel) kommen laut Berichten später.

## Equipment
**Habt ihr:** Windows-PC mit **GTX 1650** (reicht, NVENC-Encoder), Bildschirm, USB-Mikro „YU7“ am Schwenkarm, iPhone 13 als Kamera (mit der App **Camo** als Webcam in OBS).

**Kaufen (ca. 250–300 €):**
| Teil | ca. Preis |
|---|---|
| Capture Card, z. B. Elgato HD60 X (PS5: HDCP in den Einstellungen ausschalten) | 150 € |
| DJI Mic Mini mit 2 Sendern (Lightning-Adapter fürs iPhone 13), auch für Agentur-Videos | 100–170 € |
| Licht (kleine Softbox oder LED-Panel) | 30–40 € |
| Handy-Stativ mit Halterung | 15 € |
| Kopfhörer, falls keine da | 20–30 € |

**Kostenlos:** OBS Studio, Camo.

**OBS-Einstellungen für die GTX 1650:** Encoder NVIDIA NVENC H.264 · 1080p/30 fps (ruckelt es: 720p/60) · Bitrate 6000 kbps · Preset „Quality“/P5 · Mikro-Filter Rauschunterdrückung + Noise Gate.
**Internet:** mindestens ca. 8 MBit/s Upload, LAN-Kabel statt WLAN. Vorher Teststream machen.

## Die Agenten

Laufen später auf einem **Server in Google Cloud**, vor allem **nachts** („Nacht-Agenten“). Morgens liegt alles fertig zur Freigabe bereit.

| Agent | Was er macht | Nutzt Skills | Basis |
|---|---|---|---|
| **1. Trend-Scout** (Recherche) | durchsucht jeden Morgen Reddit, YouTube, TikTok, X nach neuen GTA-6-Entdeckungen, Geldmethoden, Geheimnissen, Fragen der Spieler; Morgen-Briefing mit „davon gibt es auf Deutsch noch kaum Videos“ | `gta6-trend-recherche` | Claude mit Websuche |
| **2. GTA-Coach** | beantwortet live kurze Fragen: schnell durchspielen, Geld, Fundorte, spannende Orte | `gta6-coach` | sofort als Claude-Projekt oder Gemini-Gem, später per Chat-Befehl/Sprache |
| **3. Watcher** | speichert nach jedem Twitch-Stream das Video (VOD) und den Chat-Verlauf | – | angelehnt an TwitchVault |
| **4. Clip-Agent** | findet die besten Momente (Audio-Ausschläge + Chat-Aktivität + Inhalt), schneidet 9:16 mit Untertiteln, TikTok-Version über 60 s und Shorts-Version | `hook-und-clip-regeln` | Motor: **AutoClip** oder **OpenShorts** (Open Source), dazu eigene Schicht für Twitch-Chat-Signale |
| **5. Skript-Agent** | schreibt aus Briefing-Themen kurze Guide-Skripte, Titel, Bildunterschriften | `kurzvideo-guide-skript`, `hook-und-clip-regeln` | Claude |
| **6. Stream-Manager** | Wochenplan, Stream-Titel, Ankündigungen, Auswertung der Zahlen | – | `agenten/1-stream-manager.md` |
| **Freigabe-Warteschlange** | alle Clips und Texte landen hier, **ein Mensch** gibt frei, erst dann wird gepostet | – | eigene kleine Seite oder Ordner |

**Ablauf einer Woche:** Bruder streamt → Watcher speichert → nachts schneidet der Clip-Agent, der Trend-Scout recherchiert → morgens: Briefing + fertige Clips in der Freigabe → ihr gebt frei und postet → Skript-Agent liefert Ideen für Guide-Videos.

**Ein Agent, der GTA selbst spielt, geht nicht** (Konsole, keine Schnittstelle, Gefahr einer Sperre). Der Trend-Scout ersetzt das: Er findet die Themen, ihr prüft sie im Spiel.

## Skills
- **Offizielle Anthropic-Skills** (19 Stück, Apache-Lizenz, Stand Commit `e4bb5d9`, am 19.11.2026 geprüft): z. B. `skill-creator` (neue Skills bauen und testen), `pdf`, `docx`, `xlsx`, `pptx`, `frontend-design`, `webapp-testing`, `mcp-builder`, `claude-api`.
- **Eigene Skills** in `skills/eigene/`: `hook-und-clip-regeln`, `gta6-trend-recherche`, `gta6-coach`, `kurzvideo-guide-skript`.
- **Installieren auf dem Server:** `bash skills/installieren.sh`. Das legt alles nach `~/.claude/skills`, dort finden Claude Code und das Claude Agent SDK sie automatisch.

**Sicherheit:** Skills können Code ausführen. Fremde Skills und Repos (AutoClip, OpenShorts …) immer erst ansehen, bevor sie mit euren API-Schlüsseln auf den Server kommen. API-Schlüssel nie in Dateien im Repository speichern.

## Reihenfolge
1. **Diese Woche (vor Release):** Equipment kaufen, OBS einrichten, Teststream. GTA-Coach als Claude-Projekt anlegen.
2. **Release-Woche:** streamen, Clips anfangs von Hand (OBS-Replay-Buffer oder Twitch-Clips), Trend-Scout per Hand fragen.
3. **Danach:** Google-Cloud-Server einrichten, Skills installieren, Trend-Scout und Clip-Agent automatisch nachts laufen lassen, Freigabe-Warteschlange.

## Regeln
- Alter: Für TikTok LIVE und für Geld verdienen (Twitch-Affiliate, YouTube-Partner) meist 18. Vorher prüfen.
- Chat-Bot nur als erkennbarer Bot. Gaming-Zuschauer sind oft minderjährig: nie nach persönlichen Daten fragen.
- Nichts automatisch posten. Keine Spoiler in Titeln. Spielmusik leiser (Urheberrecht).
