// ─────────────────────────────────────────────────────────────
//  Abora Dashboard – 2. Anfragen für den Browser aufbereiten
// ─────────────────────────────────────────────────────────────
const z = $('Zugang prüfen').first().json;
const felder = ['id', 'createdAt', 'kanal', 'status', 'dringlichkeit', 'anliegen', 'ort', 'name', 'telefon', 'email',
  'firma', 'zusammenfassung', 'fehlende_angaben', 'nachricht', 'erstantwort_gesendet'];
const anfragen = $input.all()
  .map((i) => i.json)
  .filter((r) => r && r.id !== undefined && r.betrieb_id === z.betrieb_id) // doppelte Sicherung: nur eigene Zeilen
  .map((r) => Object.fromEntries(felder.map((f) => [f, r[f] ?? null])));
return [{ json: { ok: true, betrieb: z.name, anfragen } }];
