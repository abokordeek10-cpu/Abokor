# Stream-Agenten für den Gaming-Stream

Plattformen: **Twitch, YouTube Live, TikTok Live** · Inhalt: **Gaming**

## Das Team

| Agent | Was er macht | Wo er läuft | Aufwand |
|---|---|---|---|
| **1. Stream-Manager** | plant Streams, Titel, Ankündigungen, wertet Zahlen aus | Claude-Projekt (oder Gemini-Gem) mit `agenten/1-stream-manager.md` | 10 Minuten einrichten |
| **2. Clip-Agent** | findet die besten Momente im Stream und macht daraus Hochkant-Clips für TikTok, Reels, Shorts | Programm: Aufnahme → Spracherkennung → Claude sucht Momente → automatisch schneiden | ca. 1 Tag bauen |
| **3. Chat-Bot** | begrüßt, beantwortet Fragen (Zeiten, Setup, Regeln), hält Spam fern | Streamer.bot (kostenlos) auf dem Stream-PC, für KI-Antworten über n8n mit Claude | ca. 1 Tag einrichten |

**Reihenfolge:** 1 → 2 → 3. Der Stream-Manager hilft sofort. Clips bringen die meisten neuen Zuschauer. Der Chat-Bot lohnt sich erst, wenn im Chat viel los ist.

## Gleichzeitig auf allen drei Plattformen streamen

Das ist kein Agent, aber die Grundlage:
- **OBS Studio** (kostenlos) zum Streamen.
- **Mehrfach-Stream:** z. B. über einen Dienst wie Restream, oder in OBS mit einem Multi-RTMP-Plugin auf Twitch und YouTube gleichzeitig.
- **TikTok Live vom PC** braucht einen eigenen Stream-Schlüssel bzw. **TikTok LIVE Studio**. Ob das Konto ihn schon bekommt, hängt von TikToks Bedingungen ab (z. B. Alter, Follower). In der TikTok-App unter LIVE nachsehen.
- **Hochkant für TikTok:** TikTok will 9:16. Entweder eine zweite Szene in OBS (z. B. mit dem kostenlosen Plugin „Aitum Vertical“) oder TikTok nur über Clips bespielen.
- **Upload-Geschwindigkeit:** für mehrere Plattformen gleichzeitig mindestens 10–15 MBit/s Upload. Sonst lieber über einen Dienst wie Restream (dann geht nur ein Stream vom PC raus).

## Regeln, die beachtet werden müssen
- **Alter:** Für TikTok LIVE und für Geld verdienen (Twitch-Affiliate, YouTube-Partner) gibt es Mindestalter, meist 18. Bitte vorher prüfen.
- **Chat-Bot:** muss als Bot erkennbar sein (eigenes Konto, z. B. „…Bot“), darf nicht so tun, als sei er dein Bruder, und keine Zuschauer privat anschreiben.
- **Viele Zuschauer bei Gaming sind minderjährig:** Der Bot fragt nie nach persönlichen Daten und meldet Problematisches an die Moderatoren.
- **Clips:** Spielmusik und fremde Inhalte können zu Urheberrechts-Sperren führen. Im Zweifel Spielmusik leiser stellen.
