// GTA-6-Trend-Scout, Schritt 1: Auftrag an Claude bauen (Regeln aus dem Skill gta6-trend-recherche).
//@@SKILL@@
const heute = new Date().toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin', weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
const system = `Du bist der Trend-Scout für einen deutschen GTA-6-Twitch-Stream (zwei Brüder, Einzelspieler-Start auf PS5/Xbox).
Arbeite streng nach diesen Regeln:

${SKILL}

Wichtig: Suche wirklich im Internet (Websuche), vor allem Inhalte der letzten 24 bis 48 Stunden. Erfinde nichts. Jeder Punkt mit Link.
Antworte auf Deutsch, genau im Format „Morgen-Briefing“.`;
const anfrage = {
  model: 'claude-opus-5-5',
  max_tokens: 16000,
  fallbacks: 'default',
  output_config: { effort: 'medium' },
  system,
  tools: [
    { type: 'web_search_20260209', name: 'web_search', max_uses: 15,
      user_location: { type: 'approximate', country: 'DE', timezone: 'Europe/Berlin' } },
    { type: 'web_fetch_20260209', name: 'web_fetch', max_uses: 15 },
  ],
  messages: [{ role: 'user', content: `Heute ist ${heute}. Erstelle das GTA-6-Morgen-Briefing.` }],
};
return [{ json: { anfrage, heute } }];
