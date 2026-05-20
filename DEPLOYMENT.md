# Deployment auf Hostinger

## Schritt 1: React-App bauen
```bash
npm install
npm run build
```
Das erzeugt den `dist/` Ordner.

## Schritt 2: Hostinger MySQL anlegen
1. Hostinger hPanel → Datenbanken → MySQL-Datenbank erstellen
2. Datenbankname, Benutzername und Passwort notieren
3. phpMyAdmin öffnen → `api/setup.sql` importieren

## Schritt 3: PHP-Konfiguration anpassen
In `api/config.php` eintragen:
- `DB_HOST` → meist `localhost`
- `DB_NAME` → Ihr Datenbankname
- `DB_USER` → Ihr DB-Benutzername
- `DB_PASS` → Ihr DB-Passwort
- `MAIL_TO` → Ihre Praxis-E-Mail-Adresse
- `ALLOWED_ORIGIN` → Ihre Domain (z.B. `https://www.praxis-brandelik.de`)

## Schritt 4: Dateien hochladen (via FTP/Hostinger File Manager)
Folgende Dateien in `public_html/` hochladen:

```
public_html/
├── index.html          ← aus dist/
├── assets/             ← aus dist/assets/
├── .htaccess           ← aus public/.htaccess
└── api/
    ├── config.php
    ├── contact.php
    ├── appointment.php
    └── anamnese.php
```

> **Wichtig:** Die `api/`-Ordner-Dateien direkt hinzufügen – NICHT in einen Unterordner.

## Schritt 5: SSL aktivieren
Hostinger hPanel → SSL → Let's Encrypt aktivieren (kostenlos)

## Lokale Entwicklung
```bash
npm run dev
```
API-Calls werden auf Port 8080 proxied. Für lokale Tests einen einfachen PHP-Server starten:
```bash
php -S localhost:8080 -t api/
```
