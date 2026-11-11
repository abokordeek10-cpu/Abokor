# Telefon-Agent (Rückruf-Assistent)

KI-Agent bei ElevenLabs, der mit Abokors geklonter Stimme Handwerksbetriebe anruft – **nur** Betriebe,
die vorher im persönlichen Gespräch zugestimmt haben, dass der KI-Assistent anruft (Zustimmung mit Datum notieren).
Der Agent meldet sich als KI-Assistent, nimmt Wunschtermine auf und sammelt Notizen (Data Collection).

- Agent-ID: siehe `agent-id.txt` · Prompt: `prompt.md`
- Stimme: "meine stimme" (d0sz7I0K0CRY3FtLuSu0), Modell eleven_flash_v2_5, LLM claude-haiku-5-5
- Variablen pro Anruf: name, betrieb, gewerk

## Noch offen
1. Twilio: Konto, Upgrade, deutsche Nummer (Regulatory Bundle) → Nummer in ElevenLabs importieren.
2. Echte Begrüßung (Aufnahme von Abokor) vor das Gespräch schalten.
3. Nach jedem Anruf Zusammenfassung an Abokor (ElevenLabs Post-Call-Webhook → n8n → E-Mail/WhatsApp).
