# Aufsichtsrat: Abora Automation

Stand: 16. November 2026 · Gutachten: `board/offers.md`, `board/monopoly.md`, `board/product.md`

## Abstimmung

**2× FUND IF, 1× PASS · Durchschnitt 4,3 von 10**

| Blickwinkel | Note | Stimme | Kern |
|---|---|---|---|
| Angebot (Offers) | 5 | FUND IF | Echter Schmerz, wenig Aufwand für den Kunden, aber null Beweis, und das Start-Paket bringt Ordnung statt Aufträge. |
| Monopol (Monopoly) | 3 | PASS | Kein Burggraben, kein bewiesener Weg zum Kunden, Markt viel zu breit („alle Gewerke, ganz Deutschland“). |
| Produkt (Product) | 5 | FUND IF | Schmales, klares Start-Produkt mit guter Demo, aber vielleicht der falsche Kanal, keine Fehlerüberwachung und zu viele Baustellen. |

## Risiken, die mehr als ein Mitglied genannt hat (zuerst)

1. **Telefon und WhatsApp fehlen im Start-Paket** (Angebot + Produkt). Wenn Handwerker die meisten Anfragen per Telefon oder WhatsApp bekommen, löst Start nur den kleinsten Teil des Problems, und Kunden kündigen.
2. **Zu breit, zu viel gleichzeitig** (Monopol + Produkt). Sechs Bausteine, Telefon-Agent, Recherche-Agent, Plattform-Vision, alle Gewerke, ganz Deutschland, mit zwei Leuten und null Kunden.
3. **Kein Beweis** (Angebot + Monopol). Keine Kunden, keine Fallgeschichte, ein einziger Anruf. Ein Handwerker hat keinen Grund zu glauben, dass 990 € ein Ergebnis bringen.
4. **Preis ohne Kostenrechnung** (alle drei). Niemand weiß, was ein Kunde im Monat kostet (Server, KI, eure Stunden) und was es kostet, einen Kunden zu gewinnen.

Nur ein Mitglied, aber gefährlich:
- **Kein Schutz vor Nachahmern** (Monopol): n8n + Claude kann jede Agentur in Wochen nachbauen.
- **Stille Fehler** (Produkt): Fällt die Verbindung aus, erfährt es der Handwerker von einem verärgerten Kunden.

## Bedingungen (Checkliste für die nächsten Skills)

**Fokus**
- [ ] Bis 3 Pilotbetriebe 60 Tage fehlerfrei laufen: nur Start bauen und verkaufen. Telefon-Agent, Bausteine 3–6 und Plattform parken. (Produkt)
- [ ] Ein Gewerk in einer Region wählen, z. B. Sanitär/Heizung im Rhein-Neckar-Kreis, und dort die erste Wahl werden. (Monopol)
- [ ] Business und Komplett erst verkaufen, wenn Start 3 dokumentierte Ergebnisse hat. (Angebot)

**Produkt**
- [x] Hauptkanal klären. **Antwort der Gründer (16.11.2026): Die meisten Anfragen kommen per Anruf.** → Start wird um verpasste Anrufe gebaut. Bei jedem Pilot in Woche 1 trotzdem nachzählen (Anrufe, WhatsApp, E-Mail, Formular). (Produkt, Angebot)
- [ ] Vor dem ersten Pilot: Fehlermeldungen, tägliche Prüfung jeder Verbindung, schriftliche Reaktionszeit bei Störungen. (Produkt)
- [ ] Die ersten 5 Minuten des Handwerkers nach dem Start festlegen und mit einem echten Handwerker testen. (Produkt)

**Angebot**
- [ ] Start um ein messbares Ergebnis bauen, z. B. „jede Anfrage in wenigen Minuten beantwortet“, plus automatisches Nachfassen offener Angebote und ein Wochenbericht. (Angebot) → `/founder-offer`
- [ ] Eine bezahlbare Garantie, z. B. Einrichtung zurück, wenn das Ergebnis in 60 Tagen nicht erreicht wird. Vorher mit `/founder-cfo` durchrechnen. (Angebot)
- [ ] Die 3 Pilots als Beweis nutzen: Antwortzeit und gewonnene Angebote vorher/nachher messen, Erlaubnis zur Veröffentlichung einholen. (Angebot)

**Zahlen und Markt**
- [ ] Kosten pro Kunde und Monat; deckt 149 € das mit Puffer? (alle) → `/founder-cfo`
- [ ] Kosten, um einen Kunden zu gewinnen (Anrufe, Stunden), über einen einzigen Kanal festhalten. (Monopol, Angebot) → `/founder-cfo`
- [ ] Wer verkauft das schon an Handwerker (Agenturen, Handwerker-Software mit KI, Freelancer), zu welchem Preis, mit Garantie? (alle) → `/founder-competitors`
- [ ] Was ist eine verpasste Anfrage in Euro wert, je Gewerk? (Angebot) → `/founder-consumer`
- [ ] Einen möglichen Burggraben benennen und den ersten Schritt dahin: Gewerk-Wissen aus echten Anfragen oder Empfehlungen über Innung/Kreishandwerkerschaft. (Monopol)

## Uneinigkeit im Aufsichtsrat

- **Monopol stimmt PASS, die anderen FUND IF.** Angebot und Produkt sehen ein tragfähiges Dienstleistungsgeschäft, Monopol sieht ohne Nische und Schutz keine dauerhafte Firma. Die PASS-Stimme kippt zu FUND IF, wenn ihr euch auf ein Gewerk in einer Region festlegt.
- **Was zuerst kommt:** Angebot will mehr ins Start-Paket packen (Nachfassen, WhatsApp, Garantie), Produkt will es schmal halten und erst stabil machen. Beides geht zusammen, wenn das Zusätzliche genau ein messbares Ergebnis stützt.

## Die stärkste Version, die der Aufsichtsrat sieht

Nicht „KI-Automatisierung für alle Handwerker in Deutschland“, sondern: **„Kein Kunde wartet mehr. Für Sanitär- und Heizungsbetriebe im Rhein-Neckar-Kreis.“** Ein Paket, das jede Anfrage auf dem Kanal beantwortet, über den sie wirklich kommt (vermutlich WhatsApp und Anrufbeantworter statt Kontaktformular), offene Angebote automatisch nachfasst und dem Chef jeden Abend eine kurze Übersicht schickt. Dazu eine Garantie auf die Antwortzeit und gemessene Ergebnisse aus drei Pilotbetrieben in der Nähe, die man besuchen kann. Erst wenn das in einem Gewerk und einer Region läuft, kommen das nächste Gewerk, die nächste Region und irgendwann die Plattform. Das weicht vom Pitch ab: weniger Gewerke, weniger Gebiet, ein anderer Kanal im Kern, aber ein Ergebnis statt einer Funktion.
