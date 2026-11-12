# Übungs-Handwerker (Cold-Call-Training)

ElevenLabs-Agent, der einen Handwerksbetriebs-Inhaber spielt, damit Abokor Kaltanrufe üben kann.
Kein echter Mensch beteiligt → Gespräche dürfen aufgenommen und als Content gezeigt werden (KI-Label setzen).

- Agent-ID: `agent-id.txt` · Prompt: `prompt.md`
- Stimme: "Übungs-Handwerker Otto" (deutsche Stimme aus der ElevenLabs-Bibliothek), LLM claude-haiku-5-5
- 7 Persönlichkeiten (freundlich, keine Zeit, Skeptiker, Preisfrager, genervt, hat schon Hilfe, interessiert)
- Variablen: betrieb, name, gewerk, schwierigkeit (leicht/mittel/schwer)
- "Stopp" / "Feedback" → steigt aus der Rolle aus und gibt Feedback mit Note
