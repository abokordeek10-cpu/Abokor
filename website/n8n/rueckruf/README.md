# Abora Rückruf: verpasster Anruf → SMS → Zusammenfassung an den Chef

## Was der Workflow macht

1. Der Handwerker geht nicht ran. Sein Handy leitet weiter auf **seine** Twilio-Nummer (eine Ortsnummer pro Kunde).
2. Der Anrufer hört eine kurze Ansage mit dem Namen des Betriebs.
3. **Anrufer mit Handynummer** bekommen sofort eine SMS von der **gemeinsamen Abora-SMS-Nummer**: „Schreiben Sie uns kurz, worum es geht.“ Festnetz-Anrufer können keine SMS empfangen; sie hören „Wir rufen zurück“.
4. Der Chef bekommt sofort eine SMS: „📞 Verpasster Anruf von …“.
5. Antwortet der Anrufer per SMS, ordnet n8n ihn dem richtigen Betrieb zu (gemerkt 14 Tage), Claude fasst die Nachricht zusammen und erkennt Notfälle, und der Chef bekommt z. B.:
   ```
   🔴 NOTFALL · Rohrbruch im Keller
   📍 Viernheim
   👤 Herr Müller
   Wasser läuft im Keller, bittet um sofortigen Rückruf.
   📞 +4917612345678
   ```
6. Der Anrufer bekommt einmal „Danke, Ihre Nachricht ist angekommen“.

Antwortet Claude nicht, geht der Originaltext an den Chef. Unbekannte Nummern und SMS ohne vorherigen Anruf gehen als Hinweis an Abokor.

## Einrichten (einmalig)

1. **Twilio:** Konto upgraden, Regulatory Bundle (Gewerbeanmeldung) einreichen, **eine Mobilnummer** kaufen (für SMS und erste Tests).
2. **n8n → Credentials → Neu → „Twilio API“**, Name genau `Twilio`. Account SID und Auth Token **direkt in n8n** eintragen, nie in den Chat oder eine Datei.
3. `einstellungen.js` ausfüllen: Account SID (AC…), SMS-Nummer, deine Handynummer, und einen Kunden-Eintrag (für den Test: deine Twilio-Nummer + dein Handy). Dann bauen:
   ```bash
   python3 baue-workflow.py
   ```
4. In n8n: **Import from File** → `rueckruf-workflow.json` → speichern → **aktivieren**. (Der Speicher „wer gehört zu welchem Betrieb“ funktioniert nur im aktiven Workflow.)
5. **Twilio → Phone Numbers → deine Nummer:**
   - *Voice → A call comes in* → Webhook, HTTP POST → **Anruf-Adresse** (zeigt `baue-workflow.py` an)
   - *Messaging → A message comes in* → Webhook, HTTP POST → **SMS-Adresse**

Die Adressen enthalten einen zufälligen Teil. Darum sind `rueckruf-workflow.json` und `.webhook-pfad` nicht im Git-Repository.

## Testen (mit deinem eigenen Handy)

1. Mit einem **zweiten Handy** die Twilio-Nummer anrufen → Ansage hören → SMS kommt → kurz antworten → Zusammenfassung kommt auf dein Handy.
2. Rufumleitung testen: Auf deinem Handy „bei Nichtannahme“ auf die Twilio-Nummer umleiten (meist `**61*+49…*11*20#`, „bei besetzt“ `**67*+49…#`, abschalten mit `##002#`; je nach Anbieter verschieden). Dann dich selbst anrufen und nicht rangehen.
3. **Prüfen:** Kommt bei einem *weitergeleiteten* Anruf die Nummer des echten Anrufers an (nicht deine eigene)? Das steht in n8n unter Executions → „Anruf (Twilio)“ → `From`. Wenn nicht, brauchen wir einen anderen Weg.

## Neuen Kunden hinzufügen

1. In Twilio eine Ortsnummer kaufen (ca. 1,35 $/Monat), dieselben zwei Webhook-Adressen eintragen.
2. In `einstellungen.js` einen Eintrag unter `kunden` ergänzen, neu bauen, in n8n neu importieren (alten Workflow vorher deaktivieren).
3. Beim Kunden die Rufumleitung auf seine Nummer einstellen.

## Noch nicht drin
- WhatsApp und Sprachnachrichten (SMS kann keine Sprachnachrichten transportieren). Kommt später über WhatsApp.
- KI-Telefonassistent, der Anrufe selbst annimmt (separat, ElevenLabs).
