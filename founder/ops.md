# Betrieb: Wie „Kein Anruf verloren“ im Alltag läuft

## 1. Der tägliche Ablauf (✳ = sieht der Kunde)

1. Handwerker geht nicht ran / ist besetzt → sein Handy leitet weiter auf die Abora-Nummer des Betriebs (bedingte Rufumleitung).
2. ✳ Anrufer hört eine kurze Ansage in der Stimme des Chefs (Festnetz-Anrufer können eine Nachricht hinterlassen).
3. ✳ Anrufer mit Handynummer bekommt sofort SMS oder WhatsApp (genehmigtes Template).
4. ✳ Anrufer antwortet mit Text, Foto oder Sprachnachricht.
5. Spracherkennung + KI fassen zusammen, erkennen „Notfall“.
6. ✳ Chef bekommt die Zusammenfassung per WhatsApp/SMS; Notfall sofort.
7. ✳ 18 Uhr: Abendübersicht an den Chef.
8. Täglich 7 Uhr: automatische Selbstprüfung (Nummer erreichbar, Testanruf, n8n läuft) → Warnung an Abokor und Ali bei Fehler.
9. Wöchentlich: Kurzbericht an den Chef (Anzahl Anrufer, zurückgeholte Anfragen) = euer Beweis.

**Anruf-Check (14 Tage, kostenlos):** gleicher Aufbau, aber ohne Nachricht an Anrufer. Gezählt wird: verpasste Anrufe, wie viele davon nicht erneut anriefen. Ergebnis als 1-seitiger Bericht. (Ob man das ohne Weiterleitung messen kann, z. B. über den Einzelverbindungsnachweis des Mobilfunkvertrags, ist zu prüfen; einfachste Variante: Weiterleitung auf eine Nummer, die nur zählt und ansagt „Wir rufen zurück“.)

## 2. Anbieter

| Was | Anbieter (Beispiele) | Preis (öffentlich, siehe `cfo-sources.md`) | Hinweise |
|---|---|---|---|
| Rufnummer + SMS | **Twilio** | Mobilnummer 30 $/Monat, SMS 0,112 $, eingehend 0,01 $/Min | Regulatory Bundle mit Gewerbeanmeldung nötig, dauert Tage |
| | **sipgate** (trunking/ team) | SMS ca. 5,88 ct; Nummernpreis **anfragen** | deutsche Firma, evtl. deutlich günstiger je Nummer |
| | seven.io / Bird | SMS ca. 0,06–0,08 € | nur SMS, keine Nummer für Anrufe |
| WhatsApp | Meta über Twilio | Utility-Template ca. 0,046 € + 0,005 $ | Template-Freigabe nötig; Folgenachrichten 24 h gratis |
| KI | Claude Haiku 5.5 (Anthropic) | 0,10 $ / 0,50 $ je Mio. Tokens | Zusammenfassung kostet Bruchteile eines Cents |
| Spracherkennung | ElevenLabs Scribe / OpenAI | ca. 0,006 $/Min (unsicher) | |
| Server | Hetzner | ca. 4–7 €/Monat | läuft schon |
| Automatisierung | n8n (selbst gehostet) | 0 € | Lizenz für Agentur-Nutzung bei license@n8n.io bestätigen lassen |

**Offene Angebote einholen:** sipgate-Nummernpreis, Betriebshaftpflicht/IT-Haftpflicht, Steuerberater.

## 3. Wer macht was (Vorschlag, bitte selbst festlegen)

| | Abokor | Ali |
|---|---|---|
| Rolle | Vertrieb und Gesicht | Technik und Betrieb |
| Mo–Fr 8–12 | Anrufe (15/Tag) | Demo, Check-Aufbau, Überwachung |
| Mo–Fr 13–17 | Termine vor Ort, Videos | Anrufe (15/Tag), Einrichtung bei Kunden |
| Täglich 7:15 | – | Selbstprüfung kontrollieren |
| Freitag | Zahlen der Woche | Wochenberichte an Kunden |

Keine Löhne eingeplant (Gründer). Sobald Lohn gezahlt wird: Steuerberater wegen Lohnnebenkosten.

## 4. Routinen (je eine Seite)

**A. Einrichtung beim Kunden (45 Minuten, vor Ort)**
1. AVV unterschreiben lassen.
2. Abora-Nummer für den Betrieb aktivieren, Testanruf.
3. Ansage mit dem Chef aufnehmen (sein Handy, 15 Sekunden).
4. Rufumleitung „bei Nichtannahme nach 20 Sekunden“ und „bei besetzt“ am Handy einstellen (GSM-Codes `**61*Nummer*11*20#` und `**67*Nummer#`, je nach Anbieter verschieden, vorher testen). Zusammen mit dem Chef testen: anrufen, nicht rangehen, SMS kommt.
5. Notfall-Wörter für sein Gewerk festlegen.
6. Chef zeigen, wie er den Ausgebucht-Modus schaltet und die Umleitung abschaltet (`##002#`).
7. Foto vom Zettel mit den Einstellungen in die Kundenakte.

**B. Störung**
1. Warnung kommt → innerhalb 30 Minuten prüfen.
2. Ist der Kunde betroffen → ihn anrufen, bevor er es merkt.
3. Notlösung: Kunde schaltet Umleitung ab (`##002#`), Anrufe gehen wieder auf seine Mailbox.
4. Ursache und Lösung ins Störungs-Logbuch.

**C. Beschwerde**
1. Gründer ruft innerhalb von 2 Stunden persönlich an.
2. Zuhören, nichts verteidigen, Lösung mit Datum zusagen.
3. Bei echtem Fehler: Monat gutschreiben.

**D. Kündigung**
1. Bestätigen, Weiterleitung am selben Tag mit dem Kunden entfernen.
2. Nummer abbestellen, Daten nach AVV löschen, Löschung bestätigen.
3. Fragen: „Was hätte dich gehalten?“ → ins Logbuch.

**E. Wöchentlich (Freitag)**
Wochenberichte an Kunden, Zahlen der Woche ins Logbuch, Kosten bei Twilio/Meta prüfen.

## 5. Werkzeuge
Kalender: Google Kalender (vorhanden). Kundenliste: einfache Tabelle. Buchhaltung: Steuerberater fragen (z. B. Lexware/sevDesk, ab ca. 10–15 €/Monat, Preis prüfen). Rechnungen: Kleinunternehmer-Hinweis § 19 UStG.

## 6. Genehmigungen, Recht, Versicherung (Checkliste, keine Rechtsberatung)
- [ ] Gewerbeanmeldung: vorhanden für Abokor. **Ali als Mitinhaber? → GbR, neue Anmeldung, Impressum ändern.** (Gewerbeamt Viernheim, Steuerberater)
- [ ] Kleinunternehmer-Regel bei GbR neu prüfen (Finanzamt/Steuerberater).
- [ ] **Twilio Regulatory Bundle** (Gewerbeanmeldung, Adresse).
- [ ] **AVV** mit jedem Kunden (ihr verarbeitet Telefonnummern und Nachrichten seiner Kunden), Unterauftragsverarbeiter nennen: Twilio, Meta, Anthropic, Hetzner, ggf. Spracherkennung. Drittland-Übermittlung (USA) prüfen.
- [ ] Datenschutzerklärung der Website und Hinweis in der SMS („automatische Nachricht“, Link zu Datenschutz).
- [ ] Keine Gesprächsaufnahme ohne Ansage; Nachricht hinterlassen nach Ansage ist üblich.
- [ ] WhatsApp-Template freigeben lassen (Meta-Regeln), nur Utility, keine Werbung.
- [ ] Betriebshaftpflicht mit IT-/Vermögensschaden (Angebot einholen).
- [ ] n8n-Lizenz schriftlich bestätigen lassen.

## 7. Risiken

| Risiko | Wahrscheinlichkeit | Schaden | Plan |
|---|---|---|---|
| Weiterleitung fällt aus, keiner merkt es | mittel | hoch | Selbstprüfung täglich, Warnung, Notlösung `##002#` |
| Mobilfunkanbieter des Kunden berechnet Weiterleitung | mittel | mittel | vorher klären, im Gespräch offen sagen |
| SMS kommt bei Festnetz-Anrufern nicht an | sicher | mittel | Ansage + Nachricht hinterlassen |
| WhatsApp-Template wird abgelehnt | mittel | niedrig | SMS als Standard |
| Twilio-Bundle dauert lange | mittel | mittel | sofort beantragen, sipgate parallel anfragen |
| Kunde findet die SMS unpersönlich | mittel | mittel | Text in seiner Sprache, er ruft selbst zurück |
| Kosten für Nummer fressen Marge | hoch | hoch | günstigere Nummer finden (größter Hebel) |
| Ein Gründer fällt aus | mittel | hoch | Abläufe aufschreiben, beide können Störung beheben |
| Kein einziger Pilot bis Januar | mittel | hoch | Zielgruppe/Gewerk wechseln, Preis 59 € testen |
| Datenschutz-Beschwerde | niedrig | hoch | AVV, Löschfristen, Offenlegung |
