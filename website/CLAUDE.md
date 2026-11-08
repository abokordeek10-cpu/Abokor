# Abora Automation – Website

Diese Datei beschreibt die Website von Abora Automation. Lies sie vollständig, bevor du etwas baust, und halte dich bei allen Entscheidungen an sie.

## Das Unternehmen

- **Name:** Abora Automation
- **Domain:** abora-automation.de
- **Sitz:** Viernheim (nicht Mannheim)
- **Inhaber:** Abokor Deek Osman
- **Adresse:** Werkstraße 29, 68519 Viernheim
- **E-Mail:** abokorosman@abora-automation.de
- **Telefon:** 0176 87823235
- **Server:** Hetzner, IP 2.31.26.76, SSH-Benutzer root
- **Impressum und Datenschutz:** Texte stammen vom Inhaber und werden wörtlich übernommen. Nichts dazu erfinden.
- **Was wir machen:** Wir automatisieren für Handwerksbetriebe den Weg von der ersten Anfrage bis zur Bewertung: Anfragen beantworten und vorsortieren, Termine buchen, Angebote vorbereiten, Angebote nachfassen, Bewertungen einholen.
- **Zielgruppe:** Inhaber kleiner und mittlerer Handwerksbetriebe aller Gewerke in Deutschland (Sanitär/Heizung, Elektro, Dach, Maler, Tischler, Garten- und Landschaftsbau usw.). Sie sind tagsüber auf der Baustelle, erledigen das Büro abends und haben wenig Zeit und wenig Lust auf Technik.
- **Slogan:** „Du machst das Handwerk. Wir machen den Rest.“

## Ziel der Website

Jede Seite führt zu **einer** Handlung: **kostenloses Erstgespräch buchen.** Der wichtigste Button heißt überall „Kostenloses Erstgespräch“.

Besucher kommen oft aus unseren TikTok- und Instagram-Reels. Die Website greift dieselbe Geschichte auf: Problem ohne KI → Lösung mit KI → wir bauen das für dich.

## Ton und Sprache

- Deutsch, **Du-Form**, direkt, kurz, bodenständig. Sätze, die ein Handwerker in der Mittagspause versteht.
- Keine Fachbegriffe wie „Workflow“, „API“, „Lead“, „CRM“. Stattdessen: „Anfrage“, „Kunde“, „läuft automatisch“.
- Konkrete Alltagsbeispiele aus verschiedenen Gewerken (Badsanierung, Elektroinstallation, Dachreparatur).
- **Keine erfundenen Zahlen, Kundenstimmen, Bewertungen, Kundenlogos oder Statistiken.** Wir haben noch keine Kunden. Wo später Referenzen hinkommen, steht ein ehrliches Pilotkunden-Angebot.

## Angebot und Preise

Das Modell: **einmaliger Aufbau + monatliche Betreuung.**

- **Aufbau (einmalig):** Analyse im Erstgespräch, Einrichtung der Automatisierungen, Anbindung an Telefon, E-Mail, WhatsApp und Kalender, Testphase, Einweisung.
- **Betreuung (monatlich):** Laufender Betrieb und Überwachung, Anpassungen, Support, Server- und KI-Kosten, monatlicher Kurzbericht.
- **Pakete:**
  - **Start:** die 1–2 Bausteine, die im Betrieb am meisten bringen
  - **Komplett:** alle 6 Bausteine
- **Preise (festgelegt, stehen in `src/config.ts`):**
  - Start: ab 990 € einmalig, ab 149 € / Monat
  - Komplett: ab 2.490 € einmalig, ab 299 € / Monat
  - Hinweis unter den Preisen: „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.“
- **Pilotangebot:** „Die ersten 3 Betriebe bekommen den Aufbau zum halben Preis. Dafür gibst du uns ehrliches Feedback und wir dürfen dich als Referenz nennen, wenn du zufrieden bist.“
- **Laufzeit:** Die Betreuung ist monatlich kündbar. **Aufbaudauer:** meist 2 bis 4 Wochen.
- **Daten:** Server in Deutschland (Falkenstein). KI-Funktionen über Claude von Anthropic. Vertrag zur Auftragsverarbeitung vor dem Start.

## Die 6 Bausteine (Leistungen)

1. **Anfragen** – Anrufe, WhatsApp, E-Mails und Website-Anfragen landen an einem Ort und werden sofort beantwortet, auch wenn der Chef auf der Baustelle ist.
2. **Vorsortieren** – Die KI fragt Ort, Umfang, Budget und Fotos ab und sortiert nach Dringlichkeit. Nur passende Anfragen landen beim Chef.
3. **Termine** – Passende Kunden buchen direkt einen Besichtigungstermin.
4. **Angebote** – Aus Sprachnotiz und Fotos entsteht ein Angebotsentwurf, den der Chef nur noch prüft.
5. **Nachfassen** – Offene Angebote werden automatisch und freundlich nachverfolgt.
6. **Bewertungen** – Nach dem Auftrag gehen Rechnung, Zahlungserinnerung und Bewertungsanfrage automatisch raus.

## Seitenstruktur

| Seite | Pfad | Inhalt |
|---|---|---|
| Startseite | `/` | siehe unten |
| Leistungen | `/leistungen` | die 6 Bausteine ausführlich, je mit „Ohne uns“ / „Mit uns“ |
| Für wen | `/fuer-wen` | alle Gewerke als Kacheln, je mit einem typischen Alltagsproblem |
| So arbeiten wir | `/ablauf` | Erstgespräch → Analyse → Aufbau → Start → Betreuung |
| Preise | `/preise` | Modell Aufbau + Abo, Pakete Start und Komplett, FAQ zu Kosten |
| Über uns | `/ueber-uns` | Text vom Inhaber: „Ich bin Abokor aus Viernheim und baue Automatisierungen für Handwerksbetriebe. Handwerker stehen den ganzen Tag auf der Baustelle und machen das Büro abends. Genau das will ich ihnen abnehmen.“ |
| Ratgeber | `/ratgeber` | Übersicht für Blogartikel, dazu 1 Beispielartikel: „Warum Handwerker Aufträge verlieren, bevor sie sie sehen“ |
| Erstgespräch | `/kontakt` | Formular + Hinweis, was im Gespräch passiert |
| Impressum | `/impressum` | Text vom Inhaber, wörtlich übernommen |
| Datenschutz | `/datenschutz` | Text vom Inhaber, wörtlich übernommen (Stand: November 2026) |

Keine Rechtstexte erfinden. Impressum und Datenschutz stammen vom Inhaber und werden nur wörtlich übernommen.

## Startseite – Abschnitte in dieser Reihenfolge

1. **Einstieg:** Überschrift „Du machst das Handwerk. Wir machen den Rest.“, ein Satz darunter, was wir tun, Button „Kostenloses Erstgespräch“. Daneben bzw. darunter das Reel als Video (`/media/abora-reel.mp4`, Hochformat, mit Vorschaubild, startet nicht automatisch mit Ton).
2. **Problem:** 4 Kacheln: Anfragen bleiben liegen · Fahrten zu Kunden, die nicht passen · Angebote ohne Antwort · Büro frisst den Feierabend.
3. **Lösung:** Die 6 Bausteine als verbundener Weg von „Anfrage“ bis „Bewertung“.
4. **Rechner „Was kosten dich verlorene Anfragen?“:** Eingaben: verpasste/liegengebliebene Anfragen pro Woche, Anteil davon, der ein Auftrag geworden wäre (%), durchschnittlicher Auftragswert (€). Ergebnis: geschätzter Umsatzverlust pro Monat und pro Jahr. Startwerte bewusst niedrig wählen und deutlich als Beispiel kennzeichnen. Hinweis: „Rechne mit deinen eigenen Zahlen.“
5. **Ablauf:** 4 Schritte bis zur Automatisierung.
6. **Zusammenarbeit:** „Einmal aufbauen, dauerhaft entlastet“ – kurz das Modell Aufbau + Betreuung, Link zu `/preise`.
7. **Pilotkunden-Angebot:** Ehrlich formuliert: „Wir suchen die ersten Handwerksbetriebe, mit denen wir gemeinsam starten.“ Vorteil: siehe Pilotangebot oben.
8. **FAQ:** Was kostet das? · Muss ich mich mit Technik auskennen? · Was passiert mit den Daten meiner Kunden? · Wie lange dauert der Aufbau? · Kann ich jederzeit kündigen? (Antworten siehe „Angebot und Preise“)
9. **Abschluss:** Slogan + Button.

## Design

- **Farben:**
  - Dunkelblau (Hauptfarbe, Hintergründe dunkler Abschnitte): `#14202E`
  - Blau-Grau (Flächen): `#3D5875`
  - Gelb (Akzent, Buttons, Hervorhebungen): `#FFC83D`
  - Hell (Hintergrund heller Abschnitte): `#F6F4EF`
  - Text dunkel: `#111111`
- **Schrift:** Inter, **lokal eingebunden** (keine Google-Fonts-Verbindung, wegen DSGVO). Überschriften fett (800), eng gesetzt.
- **Stil:** klar, kräftig, bodenständig. Wechsel zwischen dunklen und hellen Abschnitten. Große Überschriften, viel Luft. Keine glänzende Tech-Optik, keine Roboter-Grafiken.
- **Bildsprache:** Platzhalter für Fotos aus echtem Handwerksalltag (Baustelle, Werkstatt, Handy auf der Werkzeugkiste). Platzhalter mit `TODO: BILD` und Bildbeschreibung im `alt`-Text.
- **Wiederkehrendes Element:** Handy-Benachrichtigungen als Grafik (weiße abgerundete Karte, App-Icon „A“, Titel fett, z. B. „Neue Anfrage“, „Termin gebucht“, „Angebot angenommen ✓“). Das greift den Look aus dem Reel auf.
- **Mobile zuerst:** Die meisten Besucher kommen vom Handy aus TikTok/Instagram. Jede Seite muss auf 375 px Breite perfekt aussehen. Button zum Erstgespräch auf dem Handy gut erreichbar (z. B. feste Leiste unten).

### Ergänzung: lebendige Bildsprache (hat bei Widersprüchen Vorrang)

**Ziel:** Die Website wirkt lebendig, nicht wie Farbflächen mit Text. Bilder haben Vorrang vor einfarbigen Abschnitten. Stimmung aller Fotos: dunkel, warm, nah dran, echter Handwerksalltag.

**Einstieg (Startseite):**
- Foto: `website/bilder/einstieg.jpg` (dunkles Hochformat: Hände mit Hammer und Nagel).
- Handy (ab 375 px): Foto über den ganzen Bildschirm, Überschrift und Button direkt darauf.
- Desktop: Foto rechts, nicht als beschnittenes Vollbild. Es läuft nach links weich in `#14202E` aus, links stehen Text und Button.
- Überschrift: „Du machst das Handwerk. Wir machen den Rest.“
- Satz darunter: „Deine KI beantwortet Anfragen, bucht Termine und fasst Angebote nach, während du auf der Baustelle bist.“
- Button: „Kostenloses Erstgespräch“, groß und gelb (`#FFC83D`).
- **Kein Reel** auf der Website (Entscheidung des Inhabers).

**Bilder in den Abschnitten:**
- Problem, Lösung, Zusammenarbeit, Pilotangebot und Abschluss bekommen jeweils ein eigenes Hintergrundfoto.
- Rechner und FAQ bleiben ruhig: stark abgedunkeltes Foto oder helle Fläche.
- Über jedem Foto liegt ein dunkler Verlauf in `#14202E`, damit der Text auch bei 375 px gut lesbar ist.
- Fotos für Handy und Desktop optimieren und lokal ausliefern.
- **Keine weiteren Fotos** (Entscheidung des Inhabers). Einziges Foto ist `bilder/einstieg.jpg` (Einstieg und Abschluss). Alle anderen Abschnitte nutzen den warmen, dunklen Verlauf in `#14202E`. Keine Bild-Platzhalter und keine `TODO: BILD` mehr.

**KI sichtbar machen:** KI zeigt sich durch das, was sie tut. Keine Roboter, keine Neuronen-Netze, keine glänzende Tech-Optik.
- Im Einstieg erscheinen über dem Foto nacheinander animierte Handy-Benachrichtigungen: „Neue Anfrage: automatisch beantwortet“, „Termin gebucht“, „Angebot angenommen ✓“.
- Im Abschnitt Lösung läuft ein animierter WhatsApp-Chat, deutlich als Beispiel gekennzeichnet: Eine Kundin schreibt „Mein Wasserhahn tropft“, die KI fragt Ort und Foto ab und bietet einen Termin an.
- Dezente Bewegung beim Scrollen. Alle Animationen respektieren die Systemeinstellung „Bewegung reduzieren“ (`prefers-reduced-motion`).

**Arbeitsweise Startseite:** Plan zeigen und OK abwarten → nur Startseite bauen und lokale Vorschau starten → selbst bei 375 px und Desktop-Breite prüfen (Lesbarkeit, Bildausschnitt, Button-Erreichbarkeit) → restliche Seiten und Deployment erst nach OK.

## Technik

- **Ausgabe:** statische Website. Kein Server-Code, keine Datenbank. Ergebnis ist ein Ordner mit fertigen Dateien.
- **Framework:** Astro oder Next.js mit statischem Export – entscheide dich für die einfachere Lösung und begründe kurz.
- **Hosting:** eigener Server bei **Hetzner** (Linux). Auf dem Server läuft bereits **n8n** unter `n8n.abora-automation.de`. Die Website soll unter `abora-automation.de` und `www.abora-automation.de` laufen, mit HTTPS.
  - Prüfe zuerst per SSH, was auf dem Server schon läuft: Docker ja/nein, welcher Webserver bzw. Reverse Proxy (z. B. Caddy, Nginx, Traefik) n8n ausliefert. Passe dich daran an, statt etwas Zweites daneben aufzusetzen.
  - **n8n darf dabei nicht kaputtgehen.** Vor jeder Änderung an Proxy- oder Docker-Konfiguration: Backup der Datei anlegen, Änderung erklären und auf mein OK warten.
  - Wenn noch kein Reverse Proxy existiert: Caddy empfehlen (automatisches HTTPS).
  - Bau ein Deploy-Skript (z. B. `deploy.sh` mit `rsync`), das die fertigen Dateien mit einem Befehl auf den Server lädt.
  - Sinnvolle Sicherheits-Header (HSTS, X-Content-Type-Options, Referrer-Policy) und Komprimierung (gzip/zstd) aktivieren.
- **DNS:** Die A-Records von `abora-automation.de` und `www` müssen auf die Server-IP zeigen. Sag mir genau, welche Einträge ich bei meinem Domain-Anbieter setzen muss.
- **Kontaktformular:** Felder: Name, Betrieb, Gewerk (Auswahl), Telefon, E-Mail, „Was nervt dich im Büro am meisten?“ (Textfeld), Rückrufwunsch (Zeitraum), Pflicht-Checkbox Datenschutz. Senden per `POST` (JSON) an einen n8n-Webhook. Die URL steht in **einer** Konfigurationsdatei als `N8N_WEBHOOK_URL` mit Platzhalter. Spamschutz per Honeypot-Feld. Klare Erfolgs- und Fehlermeldung.
- **Terminbuchung:** Platz für einen späteren Kalender-Link, markiert mit `TODO: KALENDER`.
- **Kein Tracking, keine externen Skripte, keine Cookies** → kein Cookie-Banner nötig. Videos und Schriften lokal.
- **SEO:** eigener Titel und Beschreibung pro Seite, saubere Überschriften-Hierarchie, `sitemap.xml`, `robots.txt`, Open-Graph-Bild, strukturierte Daten (`ProfessionalService`) mit Platzhaltern für Adresse. Sprache `de`.
- **Leistung und Zugänglichkeit:** schnelle Ladezeit, Bilder optimiert, ausreichende Kontraste, Tastaturbedienung, Labels an allen Formularfeldern.

## Arbeitsweise

1. Zeig zuerst einen kurzen Plan (Framework, Ordnerstruktur, Komponenten) und warte auf mein OK.
2. Baue dann zuerst die **Startseite** fertig, damit ich Design und Ton prüfen kann.
3. Danach die restlichen Seiten.
4. Dann das Deployment auf den Hetzner-Server (siehe Abschnitt Hosting), Schritt für Schritt mit meinem OK.
5. Am Ende: Liste aller `TODO`-Stellen und eine kurze Anleitung, wie ich Änderungen später neu hochlade.
