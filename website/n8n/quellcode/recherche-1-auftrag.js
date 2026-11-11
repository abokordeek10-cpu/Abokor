// Recherche-Agent, Schritt 1: Ziel des Tages festlegen und die Anfrage an Claude bauen.
// Wechselt jeden Tag Ort und Gewerke, damit die Liste nicht immer gleich ist.
// Merkt sich bereits vorgeschlagene Betriebe (Workflow-Static-Data), damit keiner doppelt kommt.

const ORTE = ['Viernheim', 'Mannheim', 'Weinheim', 'Lampertheim', 'Heidelberg', 'Bensheim',
  'Ladenburg', 'Hemsbach', 'Lorsch', 'Heppenheim', 'Schriesheim', 'Ludwigshafen am Rhein',
  'Bürstadt', 'Hirschberg an der Bergstraße', 'Schwetzingen'];
const GEWERKE = ['Sanitär und Heizung', 'Elektro', 'Dachdecker', 'Maler und Lackierer',
  'Schreiner / Tischler', 'Trockenbau', 'Garten- und Landschaftsbau', 'Fliesenleger',
  'Fenster und Türen', 'Bodenleger', 'Zimmerei', 'Klima und Lüftung'];

const heute = new Date();
const tag = Math.floor(heute.getTime() / 86400000);
const ort = ORTE[tag % ORTE.length];
const gewerk1 = GEWERKE[tag % GEWERKE.length];
const gewerk2 = GEWERKE[(tag + 5) % GEWERKE.length];

const speicher = $getWorkflowStaticData('global');
const bekannt = (speicher.bekannt || []).slice(-300);

const system = `Du bist Recherche-Assistent von Abora Automation (Abokor Osman, Viernheim).
Abora richtet Handwerksbetrieben eine KI ein, die Anfragen sofort beantwortet, Termine bucht, Angebote vorbereitet und nachfasst.
Abokor ruft Inhaber kleiner Handwerksbetriebe persönlich an (Geschäftskunden, Kaltakquise am Telefon).

Deine Aufgabe: Finde mit der Websuche echte, aktive Handwerksbetriebe und bereite die Anrufe vor.

Regeln:
- Nur öffentlich verfügbare Firmenangaben: Firmenname, Ort, geschäftliche Telefonnummer und Website (am besten aus Impressum oder Google-Unternehmensprofil). Keine privaten Daten von Personen, keine privaten Handynummern aus Bewertungen o. Ä.
- Erfinde nichts. Wenn du eine Telefonnummer nicht sicher findest, lass das Feld leer. Lieber weniger Betriebe als falsche.
- Bevorzuge kleine Betriebe (Inhaber arbeitet selbst mit, 1 bis 15 Mitarbeiter). Keine großen Ketten, keine Vermittlungsportale, keine Callcenter mit 0800-Nummern.
- Für jeden Betrieb brauchst du einen konkreten, sachlichen Grund, warum das Thema für ihn interessant sein könnte (z. B. Bewertungen erwähnen schwere Erreichbarkeit oder späte Rückmeldung, Stellenanzeige für Büro- oder Bürokraft, keine Online-Terminbuchung, Notdienst mit vielen Anrufen, sehr viele Leistungen). Ohne Grund: Betrieb weglassen.
- Der Einstiegssatz ist ein kurzer, freundlicher Satz in Sie-Form, den Abokor am Telefon nach der Begrüßung sagen kann und der auf den Grund eingeht. Ohne Fachwörter, ohne "KI".
- Priorität 1 = sehr passend, 2 = passend, 3 = vielleicht.

Antworte am Ende NUR mit einem JSON-Objekt zwischen <json> und </json> in genau dieser Form:
{"strategie":{"fokus":"…","warum":"…","beste_anrufzeit":"…","tipp":"…"},
 "betriebe":[{"name":"…","gewerk":"…","ort":"…","telefon":"…","website":"…","grund":"…","einstiegssatz":"…","prioritaet":1}]}
"strategie" fasst in je 1 bis 2 Sätzen zusammen: worauf Abokor heute achten soll, warum diese Betriebe, wann anrufen, ein praktischer Tipp für die Gespräche.`;

const nutzer = `Heute: ${ort} und Umgebung (bis ca. 10 km).
Gewerke: ${gewerk1} und ${gewerk2}.
Finde 12 bis 15 passende Betriebe, sortiert nach Priorität.
${bekannt.length ? 'Diese Betriebe wurden schon vorgeschlagen und dürfen NICHT noch einmal vorkommen:\n' + bekannt.join('; ') : ''}`;

const anfrage = {
  model: 'claude-opus-5-5',
  max_tokens: 16000,
  fallbacks: 'default',
  output_config: { effort: 'medium' },
  system,
  tools: [
    { type: 'web_search_20260209', name: 'web_search', max_uses: 12,
      user_location: { type: 'approximate', country: 'DE', city: ort, timezone: 'Europe/Berlin' } },
    { type: 'web_fetch_20260209', name: 'web_fetch', max_uses: 15 },
  ],
  messages: [{ role: 'user', content: nutzer }],
};

return [{ json: { anfrage, ort, gewerke: `${gewerk1}, ${gewerk2}`, datum: heute.toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' }) } }];
