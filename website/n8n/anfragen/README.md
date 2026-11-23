# Abora Anfragen-Eingang (Kern des Start-Pakets)

**Was passiert:** Formular-Anfrage → Spamschutz → Claude ordnet ein (Dringlichkeit, Anliegen, Ort, Zusammenfassung, was fehlt) → **E-Mail an den Chef** → **freigegebene Erstantwort an den Kunden** → **Zeile in der Tabelle `abora_anfragen`** (Grundlage für Übersicht, Wochenbericht und später das Dashboard).

Antwortet Claude nicht, geht die Anfrage trotzdem raus, nur ohne Einordnung. Klappt das Speichern nicht, gehen die E-Mails trotzdem raus.

Mehrere Betriebe: In `betriebe.js` steht pro Kunde ein Eintrag (Name, Chef-E-Mail, Notfälle, Erstantwort). Das Formular eines Kunden schickt `betrieb_id` mit; ohne `betrieb_id` gilt `abora` (unser eigenes Kontaktformular).

## Einrichten
1. `python3 baue-workflow.py` (erzeugt `anfragen-workflow.json`).
2. n8n → Import from File → `anfragen-workflow.json`.
3. Bei **„E-Mail an Chef“** und **„Erstantwort an Kunden“** den vorhandenen **SMTP-Zugang** auswählen (derselbe wie beim Recherche-Agenten). „Claude sortiert vor“ nutzt den Zugang **Anthropic API**.
4. Unten links auf **„Tabelle einmal anlegen“** → Execute. Danach gibt es unter **Overview → Data tables** die Tabelle `abora_anfragen`.
5. Den alten Workflow **„My workflow 2“** auf **Unpublish** stellen (er nutzt denselben Pfad).
6. Diesen Workflow **Publish**.
7. Test: auf abora-automation.de/kontakt eine Anfrage mit deiner E-Mail senden → E-Mail an dich, Erstantwort an dich, neue Zeile in der Tabelle.
