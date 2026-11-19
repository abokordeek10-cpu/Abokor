"""Baut den n8n-Workflow „GTA-6-Trend-Scout“.  Aufruf: python3 baue-workflow.py"""
import json, uuid, pathlib, secrets
hier = pathlib.Path(__file__).parent
skill = (hier.parent / 'skills/eigene/gta6-trend-recherche/SKILL.md').read_text(encoding='utf-8')
skill = skill.split('---', 2)[2].strip()  # ohne Kopfzeilen
code = lambda f: (hier / f).read_text(encoding='utf-8').replace('//@@SKILL@@', 'const SKILL = ' + json.dumps(skill, ensure_ascii=False) + ';')
pfad = hier / '.webhook-pfad'
if not pfad.exists():
    pfad.write_text(secrets.token_hex(8))
geheim = pfad.read_text().strip()
u = lambda: str(uuid.uuid4())

def node(name, typ, version, pos, params, **extra):
    return {'id': u(), 'name': name, 'type': typ, 'typeVersion': version, 'position': pos, 'parameters': params, **extra}

def claude(name, pos, body_expr):
    return node(name, 'n8n-nodes-base.httpRequest', 4.2, pos, {
        'method': 'POST', 'url': 'https://api.anthropic.com/v1/messages',
        'authentication': 'genericCredentialType', 'genericAuthType': 'httpHeaderAuth', 'sendHeaders': True,
        'headerParameters': {'parameters': [{'name': 'anthropic-version', 'value': '2026-10-21'},
                                            {'name': 'anthropic-beta', 'value': 'server-side-fallback-2026-07-01'}]},
        'sendBody': True, 'specifyBody': 'json', 'jsonBody': body_expr,
        'options': {'timeout': 600000, 'response': {'response': {'fullResponse': True, 'neverError': True}}}},
        credentials={'httpHeaderAuth': {'name': 'Anthropic API'}})

nodes = [
    node('Jeden Tag 6:00', 'n8n-nodes-base.scheduleTrigger', 1.2, [0, 0], {'rule': {'interval': [{'field': 'cronExpression', 'expression': '0 6 * * *'}]}}),
    node('Jetzt starten', 'n8n-nodes-base.manualTrigger', 1, [0, 200], {}),
    node('Auftrag', 'n8n-nodes-base.code', 2, [240, 100], {'jsCode': code('1-auftrag.js')}),
    claude('Claude recherchiert', [480, 100], '={{ JSON.stringify($json.anfrage) }}'),
    node('Pause prüfen', 'n8n-nodes-base.code', 2, [720, 100], {'jsCode': code('2-pause.js')}),
    node('Pausiert?', 'n8n-nodes-base.if', 2, [960, 100], {'conditions': {'options': {'caseSensitive': True, 'typeValidation': 'loose'}, 'combinator': 'and',
        'conditions': [{'id': u(), 'leftValue': '={{ $json.pausiert }}', 'rightValue': True, 'operator': {'type': 'boolean', 'operation': 'true', 'singleValue': True}}]}, 'options': {}}),
    claude('Claude macht weiter', [1200, 0], '={{ JSON.stringify($json.weiter) }}'),
    node('Briefing speichern', 'n8n-nodes-base.code', 2, [1440, 100], {'jsCode': code('3-speichern.js')}),
    node('Briefing-Seite', 'n8n-nodes-base.webhook', 2, [0, 450], {'httpMethod': 'GET', 'path': f'gta6-briefing-{geheim}', 'responseMode': 'responseNode', 'options': {}}, webhookId=u()),
    node('Seite bauen', 'n8n-nodes-base.code', 2, [240, 450], {'jsCode': code('4-anzeigen.js')}),
    node('Seite zeigen', 'n8n-nodes-base.respondToWebhook', 1.1, [480, 450], {'respondWith': 'text', 'responseBody': '={{ $json.html }}',
        'options': {'responseHeaders': {'entries': [{'name': 'Content-Type', 'value': 'text/html; charset=utf-8'}]}}}),
]
k = [('Jeden Tag 6:00', 'Auftrag', 0), ('Jetzt starten', 'Auftrag', 0), ('Auftrag', 'Claude recherchiert', 0), ('Claude recherchiert', 'Pause prüfen', 0),
     ('Pause prüfen', 'Pausiert?', 0), ('Pausiert?', 'Claude macht weiter', 0), ('Pausiert?', 'Briefing speichern', 1), ('Claude macht weiter', 'Briefing speichern', 0),
     ('Briefing-Seite', 'Seite bauen', 0), ('Seite bauen', 'Seite zeigen', 0)]
con = {}
for a, b, i in k:
    m = con.setdefault(a, {'main': [[], []] if a == 'Pausiert?' else [[]]})['main']
    m[i].append({'node': b, 'type': 'main', 'index': 0})
wf = {'name': 'GTA-6-Trend-Scout', 'nodes': nodes, 'connections': con, 'settings': {'executionOrder': 'v1', 'timezone': 'Europe/Berlin'}, 'active': False}
(hier / 'trend-scout-workflow.json').write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding='utf-8')
print('geschrieben: trend-scout-workflow.json')
print('Briefing-Seite: https://n8n.abora-automation.de/webhook/gta6-briefing-' + geheim)
