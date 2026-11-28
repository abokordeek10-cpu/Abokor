# Abora Dashboard (Kunden-Login)

**Seite:** https://abora-automation.de/dashboard (noindex, nicht in der Sitemap, Link „Kunden-Login“ in der Fußzeile)
**Schnittstelle:** n8n-Workflow „Abora Dashboard-API“ unter `/webhook/abora-dashboard`

- Anmeldung mit **Zugangscode** pro Betrieb. In `zugaenge.js` steht nur die SHA-256-Prüfsumme, nie der Code.
- Die Betriebs-Kennung kommt **nur** aus dem geprüften Code. Der Browser kann keine fremden Daten anfordern; zusätzlich filtert „Liste bauen“ noch einmal nach `betrieb_id`.
- Daten: Tabelle `abora_anfragen` (gefüllt vom Workflow „Abora Anfragen-Eingang“).
- Funktionen: Kennzahlen, Anfragen (offen/erledigt/alle) mit Zusammenfassung, Kontakt, Originaltext, „Als erledigt markieren“, Wochenübersicht. Bereich „Freigaben“ wartet auf die Bausteine Angebote/Rechnungen.

## Neuen Kunden freischalten
1. `python3 neuer-zugang.py <betrieb_id> "<Name>"` → Code dem Kunden geben (persönlich, nicht per E-Mail im Klartext speichern), Zeile in `zugaenge.js` einfügen.
2. Derselbe `betrieb_id`-Eintrag muss in `../anfragen/betriebe.js` stehen.
3. `python3 baue-workflow.py` → `dashboard-workflow.json` neu importieren (alten Workflow vorher unpublishen und löschen).

## Einrichten
Import `dashboard-workflow.json` → Publish. Die Tabelle `abora_anfragen` muss existieren (Anfragen-Eingang → „Tabelle einmal anlegen“).
