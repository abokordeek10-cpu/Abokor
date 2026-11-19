// Seite mit den letzten Briefings (Abruf im Browser über die Webhook-Adresse).
const speicher = $getWorkflowStaticData('global');
const liste = speicher.briefings || [];
const html = `<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GTA-6-Briefing</title><style>body{font-family:system-ui,sans-serif;background:#0b0f19;color:#e8e8e8;max-width:860px;margin:auto;padding:16px;line-height:1.5}
h1{color:#ffc83d}section{background:#151b2b;border-radius:12px;padding:16px;margin:16px 0}.b{white-space:pre-wrap}a{color:#7fb3ff;word-break:break-all}</style>
<h1>GTA-6-Morgen-Briefing</h1>${liste.length ? liste.map((b) => b.html).join('') : '<p>Noch kein Briefing. Das erste kommt morgen um 6:00 Uhr (oder im Workflow „Jetzt starten“ ausführen, während er aktiv ist).</p>'}</html>`;
return [{ json: { html } }];
