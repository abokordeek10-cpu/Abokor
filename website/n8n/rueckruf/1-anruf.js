// ─────────────────────────────────────────────────────────────
//  Abora Rückruf – 1. Verpasster Anruf kommt rein (Twilio Voice)
// ─────────────────────────────────────────────────────────────
//@@EINSTELLUNGEN@@
const b = $input.first().json.body || {};
const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ok = b.AccountSid === EINSTELLUNGEN.twilioKonto;
const kunde = EINSTELLUNGEN.kunden[b.To];
const anrufer = String(b.From || '');
const unterdrueckt = !/^\+\d{6,}$/.test(anrufer) || anrufer === '+266696687';
const mobil = /^\+491[5-7]\d{7,}$/.test(anrufer);
const zeit = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' });

if (!ok) {
  return [{ json: { ok: false, twiml: '<?xml version="1.0" encoding="UTF-8"?><Response><Reject/></Response>' } }];
}

// Merken: Dieser Anrufer gehört zu diesem Betrieb (für die SMS-Antwort)
const speicher = $getWorkflowStaticData('global');
speicher.anrufer = speicher.anrufer || {};
const grenze = Date.now() - EINSTELLUNGEN.merkenTage * 86400000;
for (const [nr, e] of Object.entries(speicher.anrufer)) if (e.zeit < grenze) delete speicher.anrufer[nr];
if (kunde && mobil) speicher.anrufer[anrufer] = { kunde: b.To, zeit: Date.now(), antworten: 0 };

const name = kunde ? kunde.betrieb : 'unserem Betrieb';
const ansage = mobil
  ? `Hallo, Sie haben ${name} erreicht. Wir sind gerade auf einer Baustelle. Sie bekommen gleich eine SMS. Schreiben Sie uns darauf einfach kurz, worum es geht. Wir melden uns schnell zurück. Vielen Dank.`
  : `Hallo, Sie haben ${name} erreicht. Wir sind gerade auf einer Baustelle und rufen Sie so schnell wie möglich zurück. Vielen Dank.`;

return [{
  json: {
    ok: true,
    twiml: `<?xml version="1.0" encoding="UTF-8"?><Response><Say language="de-DE">${xml(ansage)}</Say><Hangup/></Response>`,
    smsAnAnrufer: Boolean(kunde && mobil),
    anrufer,
    smsVon: EINSTELLUNGEN.smsNummer,
    textAnrufer: `Hallo, hier ist ${name}. Wir sind gerade auf einer Baustelle und melden uns schnell bei Ihnen. Schreiben Sie uns gern kurz, worum es geht, gern mit Ort. Bei einem Notfall bitte NOTFALL schreiben. (Automatische Nachricht)`,
    chef: kunde ? kunde.chef : EINSTELLUNGEN.admin,
    textChef: kunde
      ? `📞 Verpasster Anruf ${zeit} Uhr von ${unterdrueckt ? 'unterdrückter Nummer' : anrufer}. ${mobil ? 'Anrufer hat eine SMS bekommen, seine Antwort kommt gleich hier an.' : 'Festnetz: bitte selbst zurückrufen.'}`
      : `⚠️ Abora: Anruf auf unbekannter Nummer ${b.To} von ${anrufer}. Kunde in den Einstellungen fehlt.`,
  },
}];
