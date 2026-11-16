# CFO-Kosten-Inputs – Abora Automation

Stand: 16.11.2026. Nur öffentliche Preise. **Methode:** Anbieterseiten konnten in dieser Sitzung nicht direkt geöffnet werden; alle Werte stammen aus Suchergebnis-Auszügen der verlinkten Seiten (offizielle Seiten bevorzugt). Status je Zeile: **bestätigt** = offizielle Seite im Auszug zitiert; **unsicher** = nur Drittquelle oder widersprüchlich; **nicht geprüft** = nicht gefunden. USD-Preise sind nicht in EUR umgerechnet.

## 1. Twilio Deutschland

| Posten | Preis | Status | Quelle |
|---|---|---|---|
| Deutsche **Mobilnummer** (Sprache + SMS) | **30,00 $ / Monat** | bestätigt | [Twilio Voice DE](https://www.twilio.com/en-us/voice/pricing/de), [SIP DE](https://www.twilio.com/en-us/sip-trunking/pricing/de) |
| Deutsche **Ortsnetznummer** (local) | 1,35 $ / Monat (Drittquellen: 1,15 $) | bestätigt (1,35 $) | [Twilio Voice DE](https://www.twilio.com/en-us/voice/pricing/de) |
| Eingehender Anruf (local + mobile) | **0,0100 $ / Min** | bestätigt | [Twilio Voice DE](https://www.twilio.com/en-us/voice/pricing/de) |
| Ausgehender Anruf auf dt. Mobilnummer | 0,0420 $ / Min | bestätigt | [Twilio Voice DE](https://www.twilio.com/en-us/voice/pricing/de) |
| **SMS ausgehend an dt. Mobilnummer** | **0,112 $ / SMS** (Stand Okt. 2026) | bestätigt | [Twilio SMS DE](https://www.twilio.com/en-us/sms/pricing/de) |
| SMS eingehend (auf Mobilnummer) | 0,0075 $ / SMS | bestätigt | [Twilio SMS DE](https://www.twilio.com/en-us/sms/pricing/de) |
| **Regulatory Bundle** | Pflicht. Adresse muss im Vorwahlbereich liegen (bei Ortsnummer), keine Postfächer; Firmen reichen Handelsregisterauszug oder **Gewerbeanmeldung** mit dt. Adresse ein; **Mobilnummern nicht für Privatpersonen**; Prüfung bis 3 Werktage | bestätigt (Kernaussagen), genaue Dokumentliste für Mobil unsicher | [Twilio Guidelines DE](https://www.twilio.com/en-us/guidelines/de/regulatory) |
| SMS-Fähigkeit der Ortsnummer | Wahrscheinlich nur Sprache; für SMS **Mobilnummer** nötig. SMS an Festnetz geht nie (Fehler 21614) | unsicher (Quellen widersprechen sich) | [Twilio SMS-Guidelines DE](https://www.twilio.com/en-us/guidelines/de/sms), [Porting DE](https://www.twilio.com/en-us/guidelines/de/porting) |

Folge für das Produkt: **Ruft ein Kunde vom Festnetz an, kann keine SMS zugestellt werden.** Dann bleibt nur WhatsApp (falls die Nummer WhatsApp hat) oder Rückruf.

Nicht geprüft: Kosten der **Rufumleitung** beim Mobilfunkvertrag des Handwerkers (bei vielen Tarifen inklusive, aber nicht verifiziert).

## 2. SMS-Alternativen Deutschland

| Anbieter | Preis pro SMS (DE) | Status | Quelle |
|---|---|---|---|
| seven.io | ab 0,075 € | unsicher (nur Drittverzeichnisse; offizielle Seite zeigt im Auszug nur eingehend 0,01 €) | [european-alternatives](https://european-alternatives.eu/product/seven), [seven.io Preise](https://seven.io/en/prices/) |
| seven.io Rufnummer | ab 19,90 €/Monat + 9,90 € Einrichtung | unsicher (Drittquelle) | [DroidSender](https://droidsender.com/sms-prices/germany) |
| sipgate | 5,88 ct pro SMS (netto/brutto unklar); Drittquelle: 9,9 ct netto | unsicher | [sipgate alle Tarife](https://www.sipgate.de/alletarife), [europeanpurpose](https://europeanpurpose.com/tool/sipgate) |
| Bird (MessageBird) | ca. 0,056 € + Carrier-Gebühren | unsicher; laut einer Quelle war SMS bei Bird im Aug. 2026 gar nicht kaufbar | [Chatarmin](https://chatarmin.com/en/blog/bird-pricing), [rework](https://resources.rework.com/de/tools/messaging-sms/best-messagebird-alternatives) |
| Allo (zum Vergleich) | 0,10 $ pro Segment | bestätigt (Anbieterseite) | [Allo SMS-Preise](https://www.withallo.com/de/sms-pricing) |

Nicht geprüft: ob bei seven.io/sipgate **Antworten** der Kunden auf die SMS empfangen werden können (für Abora nötig).

## 3. WhatsApp Business Platform (Meta)

| Posten | Wert | Status | Quelle |
|---|---|---|---|
| Abrechnung | **pro Template-Nachricht** (seit 1.7.2025, nicht mehr pro Gespräch) | bestätigt | [Meta Pricing](https://developers.facebook.com/docs/whatsapp/pricing) |
| Utility-Template nach Deutschland | ca. **0,0456 €** (USD-Karte: 0,055 $) | unsicher (Drittquellen, übereinstimmend) | [whautomate](https://whautomate.com/whatsapp-business-api-pricing-germany), [eesel](https://www.eesel.ai/blog/whatsapp-business-api-pricing) |
| Marketing-Template Deutschland | ca. 0,1131 € (0,1365 $) | unsicher | dieselben |
| **Antwort innerhalb 24 h, nachdem der Kunde geschrieben hat** | Freitext-Nachrichten im offenen Kundenservice-Fenster **kostenlos**; Utility-Templates im Fenster ebenfalls kostenlos | bestätigt für Meta-Doku – **aber:** Twilio meldet eine Meta-Preisänderung zum **1.10.2026** (neue Gebühren für „AI provider“ bei ausgehenden Nicht-Template-Nachrichten im Fenster); Details **nicht verifiziert** | [Meta Pricing](https://developers.facebook.com/docs/whatsapp/pricing), [Twilio Notice Okt. 2026](https://support.twilio.com/hc/en-us/articles/53100462475931-Notice-Changes-to-WhatsApp-s-Pricing-October-2026) |
| **Braucht eine vom Unternehmen gestartete Nachricht ein Template?** | **Ja.** Außerhalb des 24-h-Fensters sind nur genehmigte Templates erlaubt | bestätigt | [Meta Pricing](https://developers.facebook.com/docs/whatsapp/pricing) |
| Twilio-Aufschlag WhatsApp | 0,005 $ pro Nachricht (ein- und ausgehend) | bestätigt | [Twilio WhatsApp Pricing](https://www.twilio.com/en-us/whatsapp/pricing) |

Folge: Nach einem verpassten Anruf hat der Kunde **noch nicht geschrieben** → die erste WhatsApp ist eine Unternehmens-Nachricht → **Utility-Template nötig, ca. 0,046 € + 0,005 $**. Antwortet der Kunde, sind Folge-Nachrichten 24 h lang (bis 1.10.2026 sicher) kostenlos bei Meta.

## 4. Anthropic Claude API (pro 1 Mio. Tokens, Input / Output)

| Modell | Input | Output | Status | Quelle |
|---|---|---|---|---|
| Claude Haiku 5.5 (Haiku-Klasse) | 0,10 $ | 0,50 $ (bis 100K Prompt; darüber 0,50 / 2,50 $) | bestätigt (Anthropic-Modelltabelle, Stand 3.11.2026, + Drittquelle) | [Anthropic Pricing](https://platform.claude.com/docs/en/about-claude/pricing), [metacto](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration) |
| Claude Sonnet 5.5 | 2,00 $ | 10,00 $ | bestätigt | wie oben |
| Claude Opus 5.5 | 4,00 $ | 20,00 $ | bestätigt | wie oben |
| Batch-Verarbeitung | ca. 50 % Rabatt | bestätigt | wie oben |

Grobe Größe: Eine Zusammenfassung mit 2.000 Input- und 300 Output-Tokens kostet mit Haiku 5.5 ca. 0,00035 $, mit Sonnet 5.5 ca. 0,007 $ (eigene Rechnung).

## 5. Sprache-zu-Text (Sprachnachrichten)

| Dienst | Preis | Status | Quelle |
|---|---|---|---|
| ElevenLabs Scribe v2 (Batch) | **0,22 $ / Stunde** ≈ 0,0037 $ / Min | unsicher: API-Preisseite sagt 0,22 $, FAQ sagt noch „ab 0,40 $/h“ | [ElevenLabs API Pricing](https://elevenlabs.io/pricing/api), [Stork-Review](https://www.stork.ai/blog/de/elevenlabs-speech-to-text-scribe-2026) |
| ElevenLabs Scribe v2 Realtime | 0,39 $ / Stunde | unsicher | [ElevenLabs API Pricing](https://elevenlabs.io/pricing/api) |
| OpenAI gpt-4o-transcribe / whisper-1 | 0,006 $ / Min | unsicher (nur Drittquellen, OpenAI-Seite nicht gelesen) | [activepieces](https://www.activepieces.com/blog/openai-whisper-api-pricing-per-minute-rates-2026), [costgoat](https://costgoat.com/pricing/openai-transcription) |
| OpenAI gpt-4o-mini-transcribe | 0,003 $ / Min | unsicher | dieselben |

## 6. Hetzner Cloud Server

| Server | Preis | Status | Quelle |
|---|---|---|---|
| CX22 | nicht mehr in aktuellen Quellen; wurde offenbar durch CX23 ersetzt | unsicher | [Hetzner Cost-Optimized](https://www.hetzner.com/de/cloud/cost-optimized/) |
| CX23 (2 vCPU, 4 GB RAM, 40 GB SSD) | ca. **3,99–6,49 €/Monat** je nach Standort/IPv4/Steuer; Drittquelle nach Erhöhung vom 15.6.2026: **5,49 €** | unsicher (Spalten in Hetzner-Tabelle im Auszug nicht beschriftet); laut Drittquelle zeitweise nicht bestellbar | [Hetzner Preisanpassung](https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/), [bitdoze](https://www.bitdoze.com/hetzner-cloud-cost-optimized-plans/) |

Für die Planung: **ca. 6 €/Monat** als sichere Annahme (eigene Rundung nach oben).

## 7. n8n selbst gehostet – Lizenz

- n8n steht unter der **Sustainable Use License**; Nutzung kostenlos für „internal business purposes“. [n8n License](https://docs.n8n.io/n8n-community-license)
- Laut offizieller **License FAQ** erlaubt: **Automationen für Kunden auf der eigenen Instanz bauen, solange die Kunden sie nicht selbst erstellen oder ändern können.** Nicht erlaubt: n8n als Dienst anbieten, in dem Kunden selbst Workflows bauen. Für Verwaltung vieler Kunden-Instanzen: license@n8n.io / Partnerprogramm. [n8n License FAQ](https://docs.n8n.io/n8n-community-license/community-license/license-faq)
- Status: **weitgehend bestätigt**, aber FAQ nur in Auszügen gelesen. Abora-Modell (Kunde hat keinen Zugang zu n8n, bekommt nur Nachrichten) passt nach diesen Auszügen zur erlaubten Nutzung. Ein Forum-Beitrag berichtet, der n8n-Support habe genau so ein Setup als zulässig bestätigt ([Community](https://community.n8n.io/t/can-i-use-n8n-cloud-to-manage-workflows-for-multiple-consulting-clients/236130)). **Empfehlung:** kurze schriftliche Bestätigung bei license@n8n.io einholen.

## 8. Ersatz-Kosten (Vergleich für Preis-Argument)

| Posten | Wert | Quelle |
|---|---|---|
| Minijob-Grenze 2026 | 603 €/Monat (2027: 633 €) | [Minijob-Zentrale](https://magazin.minijob-zentrale.de/neue-verdienstgrenze-2026/) |
| Bürofachkraft Vollzeit, Median | ca. 3.508 € brutto/Monat (Gehaltsportal, nicht Entgeltatlas) | [MeinGehalt](https://www.meingehalt.net/gehalt/buerofachkraft.html) |
| Telefonservice mit Menschen | 100–400 €/Monat und mehr (Anbieter-Blog) | [CloudTalk](https://www.cloudtalk.io/de/blog/bester-ki-telefonservice-fuer-handwerker/) |

## Nicht verifiziert (Zusammenfassung)

- WhatsApp-Preisänderung ab 1.10.2026 (Details)
- Hetzner CX23 exakter aktueller Preis und Verfügbarkeit
- seven.io / sipgate / Bird: offizielle Preise für ausgehende SMS und Rück-SMS-Empfang
- OpenAI-Transkription offizieller Preis
- Kosten der Rufumleitung beim Mobilfunkanbieter des Handwerkers
