# Abora Automation – Website

Statische Website mit [Astro](https://astro.build). Das Ergebnis ist ein Ordner `dist/` mit fertigen HTML-Dateien: kein Server-Code, keine Datenbank, keine Cookies, kein Tracking.

**Warum Astro?** Astro erzeugt von Haus aus fertige HTML-Dateien und schickt fast kein JavaScript mit. Außerdem optimiert es Fotos automatisch für Handy und Desktop. Next.js bräuchte dafür einen extra Export-Modus und mehr Einstellungen.

## Lokal ansehen

```bash
cd website
npm install
npm run dev        # Vorschau mit automatischem Neuladen: http://localhost:4321
npm run build      # fertige Website in dist/
npm run preview    # gebaute Website ansehen
```

## Wo steht was?

| Was | Wo |
|---|---|
| Webhook-URL, Kalender-Link, Kontaktdaten, Preise | `src/config.ts` |
| Texte der 6 Bausteine, Ablauf | `src/inhalte.ts` |
| Seiten | `src/pages/` (eine Datei pro Seite) |
| Ratgeber-Artikel | `src/pages/ratgeber/` + Liste in `src/artikel.ts` |
| Fotos | `bilder/` |
| Farben, Schrift, Grundstil | `src/styles/global.css` |
| Bausteine wie Benachrichtigung, Chat, Rechner | `src/components/` |

## Neues Foto einsetzen

1. Foto in `bilder/` legen, z. B. `bilder/problem.jpg` (gern groß, mind. 1600 px breit; Astro verkleinert automatisch).
2. In der Seite oben importieren: `import problemBild from '../../bilder/problem.jpg';`
3. Beim passenden Abschnitt `bild={problemBild}` ergänzen, z. B. `<FotoAbschnitt bild={problemBild} motiv="…">`.

## Änderungen hochladen

Die Website liegt auf dem Server in `/var/www/abora-automation.de`. Caddy liefert sie direkt von dort aus. Ein Neustart ist nicht nötig, und n8n wird nicht angefasst.

**Weg 1: mit Node.js auf dem Mac**

```bash
cd website
./deploy.sh
```

Das Skript baut die Website und lädt sie per `rsync` hoch.

**Weg 2: ohne Node.js**

Die fertig gebaute Website liegt auf dem Branch `website-dist` (Datei `abora-website.tar.gz`). Nach jeder Änderung wird sie dort neu abgelegt. Dann reicht auf dem Mac:

```bash
ssh root@2.31.26.76 'curl -fsSL https://raw.githubusercontent.com/abokordeek10-cpu/Abokor/website-dist/abora-website.tar.gz | tar -xz -C /var/www/abora-automation.de && ls /var/www/abora-automation.de'
```

---

## So ist der Server eingerichtet

- **Server:** Hetzner, Ubuntu 26.04, IP `2.31.26.76`
- **Docker-Compose-Projekt** in `/root/n8n/` mit zwei Containern:
  - `caddy` (Ports 80/443, automatisches HTTPS)
  - `n8n`
- **Caddyfile:** `/root/n8n/Caddyfile`, Kopie im Repo: `deploy/Caddyfile`
- **Zusatzdatei:** `/root/n8n/docker-compose.override.yml`, Kopie im Repo: `deploy/docker-compose.override.yml`. Sie bindet den Website-Ordner nur lesend in Caddy ein. Die Original-`docker-compose.yml` ist unverändert.
- **Backups vom 09.11.2026** in `/root/n8n/`: `Caddyfile.backup-2026-11-09`, `Caddyfile.backup-2026-11-09-b`, `docker-compose.yml.backup-2026-11-09`
- **Caddy schreibt keine Zugriffs-Logs.** Es werden also keine Besucher-IPs gespeichert.
- **Löschfristen (14 Tage):**
  - Systemprotokoll: `/etc/systemd/journald.conf.d/14-tage.conf` mit `MaxRetentionSec=14day`
  - Logs von Caddy und n8n gehen ins Systemprotokoll (`logging: driver: journald`) und fallen damit unter dieselbe Frist.
  - n8n löscht Ausführungen nach 336 Stunden (`EXECUTIONS_DATA_PRUNE=true`, `EXECUTIONS_DATA_MAX_AGE=336`).

Caddyfile ändern (auf dem Server):

```bash
cd /root/n8n && cp Caddyfile Caddyfile.backup-$(date +%F) && nano Caddyfile
docker compose exec caddy caddy validate --config /etc/caddy/Caddyfile && docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
```

Server-Zustand prüfen, nur lesend: `ssh root@2.31.26.76 'bash -s' < deploy/server-pruefen.sh`

## DNS (Squarespace Domains)

Unter account.squarespace.com/domains → abora-automation.de → DNS → Benutzerdefinierte Einträge:

| Art | Name | Daten | Zweck |
|---|---|---|---|
| A | `@` | `2.31.26.76` | Website |
| A | `www` | `2.31.26.76` | Website (leitet auf ohne www weiter) |
| A | `n8n` | `2.31.26.76` | n8n |
| MX | `@` | `smtp.google.com` | E-Mail (Google Workspace) |
| TXT | `@` | `v=spf1 include:_spf.google.com …` | E-Mail-Schutz |
| TXT | `google._domainkey` | `v=DKIM1; …` | E-Mail-Signatur |

Die Gruppe „Squarespace-Standardeinstellung“ wurde gelöscht. Sie darf nicht wieder hinzugefügt werden, sonst zeigt die Domain wieder auf Squarespace.

## Kontaktformular und n8n

Das Formular sendet per `POST` ein JSON an `N8N_WEBHOOK_URL` (`src/config.ts`):

```json
{
  "name": "…", "betrieb": "…", "gewerk": "…", "telefon": "…", "email": "…",
  "nervt": "…", "rueckruf": "Abends (17–19 Uhr)", "datenschutz": true, "website": "",
  "quelle": "https://abora-automation.de/kontakt", "gesendet_am": "2026-…"
}
```

In n8n:
1. Workflow mit **Webhook**-Knoten anlegen, Methode `POST`, Antwort sofort mit Status 200.
2. Unter *Options → Allowed Origins (CORS)* `https://abora-automation.de` eintragen, sonst blockiert der Browser die Anfrage.
3. Die **Production URL** des Webhooks in `src/config.ts` eintragen und neu hochladen.

### Spam aussortieren

Das Formular hat ein unsichtbares Feld **`website`** (Honeypot). Menschen sehen es nicht und lassen es leer, viele Bots füllen es aus. Die Website schickt solche Anfragen gar nicht erst ab. Bots, die direkt an den Webhook senden, fängst du in n8n ab:

1. Direkt nach dem Webhook-Knoten einen **If**-Knoten einfügen. Bedingungen (alle müssen zutreffen):
   - `{{ $json.body.website }}` → *is empty*
   - `{{ $json.body.datenschutz }}` → *is true*
   - `{{ $json.body.name }}` → *is not empty*
   - `{{ $json.body.email }}` → *matches regex* `^[^@\s]+@[^@\s]+\.[^@\s]+$`
   - optional: `{{ $json.headers.origin }}` → *equals* `https://abora-automation.de`
2. **true** → weiter zum E-Mail-Versand an dich.
3. **false** → nichts tun (Ausgang leer lassen). Die Ausführung wird nach 14 Tagen automatisch gelöscht.

## Offene TODOs

| TODO | Was fehlt | Wo |
|---|---|---|
| `KALENDER` | Link zur Online-Terminbuchung (kommt später). Sobald er eingetragen ist, erscheint auf `/kontakt` ein Button. | `src/config.ts` → `KALENDER_URL` |
