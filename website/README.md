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

Einmalig: In `deploy.sh` die Server-Adresse eintragen und sicherstellen, dass du dich per SSH-Schlüssel anmelden kannst.

Danach reicht immer:

```bash
cd website
./deploy.sh
```

Das Skript baut die Website neu und lädt sie per `rsync` auf den Server. n8n wird dabei nicht angefasst.

---

## Einrichtung auf dem Hetzner-Server (einmalig, Schritt für Schritt)

> **Wichtig:** n8n läuft schon auf dem Server und darf nicht kaputtgehen. Vor jeder Änderung an Proxy- oder Docker-Konfiguration wird ein Backup angelegt.

### Schritt 1: Nachsehen, was läuft (ändert nichts)

```bash
ssh root@2.31.26.76
docker ps 2>/dev/null; systemctl is-active caddy nginx traefik 2>/dev/null; ss -tlnp | grep -E ':80|:443'
```

Die Ausgabe zeigt, ob Docker läuft und welcher Webserver (Caddy, Nginx oder Traefik) die Ports 80/443 belegt. **Danach entscheiden wir gemeinsam, welcher Weg passt.**

### Schritt 2a: Wenn Caddy läuft (ohne Docker)

```bash
cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.backup-$(date +%F)
mkdir -p /var/www/abora-automation.de
```

Dann den Website-Block aus `deploy/Caddyfile.beispiel` **zusätzlich** in `/etc/caddy/Caddyfile` einfügen (n8n-Block bleibt unverändert) und prüfen:

```bash
caddy validate --config /etc/caddy/Caddyfile && systemctl reload caddy
```

Caddy holt das HTTPS-Zertifikat automatisch.

### Schritt 2b: Wenn Nginx läuft

Datei `deploy/nginx.beispiel.conf` als `/etc/nginx/sites-available/abora-automation.de` anlegen, dann:

```bash
ln -s /etc/nginx/sites-available/abora-automation.de /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d abora-automation.de -d www.abora-automation.de
```

### Schritt 2c: Wenn Caddy oder Traefik in Docker läuft

Dann muss der Ordner `/var/www/abora-automation.de` in den Proxy-Container eingebunden werden (Docker-Volume). Das hängt von deiner `docker-compose.yml` ab. Diesen Schritt machen wir gemeinsam, wenn wir die Ausgabe aus Schritt 1 kennen.

### Schritt 2d: Wenn noch gar kein Reverse Proxy läuft

Empfehlung: **Caddy**, weil es HTTPS automatisch einrichtet. Dann wie in 2a vorgehen.

### Schritt 3: Website hochladen

```bash
./deploy.sh
```

## DNS-Einträge beim Domain-Anbieter

Die Server-IP findest du in der Hetzner Cloud Console beim Server.

| Typ | Name / Host | Wert | TTL |
|---|---|---|---|
| A | `@` (= abora-automation.de) | `2.31.26.76` | 3600 |
| A | `www` | `2.31.26.76` | 3600 |
| AAAA | `@` | `[SERVER-IPv6]` (nur wenn der Server IPv6 hat) | 3600 |
| AAAA | `www` | `[SERVER-IPv6]` (nur wenn der Server IPv6 hat) | 3600 |

Den bestehenden Eintrag für `n8n` **nicht** ändern. Falls es für `@` oder `www` schon Einträge gibt (z. B. von Squarespace oder einer Parkseite), müssen diese ersetzt werden. Bis die Änderung überall ankommt, kann es einige Minuten bis wenige Stunden dauern. Prüfen mit:

```bash
dig +short abora-automation.de
dig +short www.abora-automation.de
```

## Kontaktformular und n8n

Das Formular sendet per `POST` ein JSON an `N8N_WEBHOOK_URL` (`src/config.ts`):

```json
{
  "name": "…", "betrieb": "…", "gewerk": "…", "telefon": "…", "email": "…",
  "nervt": "…", "rueckruf": "Abends (17–19 Uhr)", "datenschutz": true,
  "quelle": "https://abora-automation.de/kontakt", "gesendet_am": "2026-…"
}
```

In n8n:
1. Workflow mit **Webhook**-Knoten anlegen, Methode `POST`, Antwort sofort mit Status 200.
2. Unter *Options → Allowed Origins (CORS)* `https://abora-automation.de` eintragen, sonst blockiert der Browser die Anfrage.
3. Die **Production URL** des Webhooks in `src/config.ts` eintragen und neu hochladen.
