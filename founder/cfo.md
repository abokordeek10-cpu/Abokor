# Unit economics: Abora Automation – Paket Start (verpasster Anruf -> SMS/WhatsApp, Zusammenfassung, Formular/E-Mail)

Every number below comes from the input file. Nothing is looked up or guessed.

## One Kunde-Monat (ein Betrieb, ein Monat)

| line | per Kunde-Monat (ein Betrieb, ein Monat) |
| --- | ---: |
| Price | $79.00 |
| Eigene Twilio-Mobilnummer je Kunde (30 $/Monat, Quelle: cfo-sources.md) | -$28.00 |
| SMS/WhatsApp an Anrufer, Annahme 40 verpasste Anrufe x ca. 0,10 EUR (SCHAETZUNG Menge) | -$4.00 |
| Eingehende Minuten (Ansage/Nachricht fuer Festnetz-Anrufer), ca. 40 Min x 0,01 $ | -$0.50 |
| KI-Zusammenfassung + Spracherkennung Sprachnachrichten (SCHAETZUNG) | -$1.50 |
| Betreuung/Wartung 1 Std. je Kunde x 25 EUR Gruenderzeit (SCHAETZUNG) | -$25.00 |
| **Contribution** (what each Kunde-Monat (ein Betrieb, ein Monat) leaves to pay the fixed costs) | **$20.00** (25%) |

## The margin that matters

Fixed costs: $96 a month (Hetzner-Server (ca. 6 EUR) $6, Domain, E-Mail, Kleinkram (SCHAETZUNG) $10, Betriebshaftpflicht / IT-Versicherung (SCHAETZUNG, Angebot einholen) $20, KI-Kosten Live-Demo und Tests (SCHAETZUNG) $10, Werbung/Material (SCHAETZUNG) $50, Gehalt Gruender $0).

- **Break-even: 5 Kunde-Monat (ein Betrieb, ein Monat)s a day.** Below that you lose money every month.
- **Profit margin at your plan** (20 a day): **19%** of every sale, after every cost.
- Capacity: 40 a day.

## Year 1, month by month

| month | Kunde-Monat (ein Betrieb, ein Monat)s a day | revenue | profit | cumulative (after $560 startup) |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 0 | $0 | -$96 | -$656 |
| 2 | 1 | $79 | -$76 | -$732 |
| 3 | 2 | $158 | -$56 | -$788 |
| 4 | 3 | $237 | -$36 | -$824 |
| 5 | 4 | $316 | -$16 | -$840 |
| 6 | 5 | $395 | $4 | -$836 |
| 7 | 6 | $474 | $24 | -$812 |
| 8 | 8 | $632 | $64 | -$748 |
| 9 | 10 | $790 | $104 | -$644 |
| 10 | 12 | $948 | $144 | -$500 |
| 11 | 14 | $1,106 | $184 | -$316 |
| 12 | 16 | $1,264 | $224 | -$92 |

- **Year 1 operating profit: $468** on $6,399 of revenue.
- After the $560 startup spend: -$92.
- Startup money earned back: not within year 1.
- Cash you need before it pays for itself: **$840**.

## What if

| scenario | margin at plan | break-even a day | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | 19% | 5 | $468 |
| Price -10% | 10% | 8 | -$172 |
| Volume -20% | 18% | 5 | $144 |
| Unit costs +15% | 8% | 9 | -$249 |

## Red flags

- The startup spend is not earned back within year 1.
