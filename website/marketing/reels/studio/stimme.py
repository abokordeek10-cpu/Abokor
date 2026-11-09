"""Erzeugt die Sprecherstimme (ElevenLabs, geklonte Stimme) mit Wort-Zeitstempeln.
Aufruf: python3 stimme.py geschichten/<id>.json [ausgabeordner]
Legt <id>.mp3 und <id>.woerter.json im Ausgabeordner ab (Standard: ausgabe/)."""
import base64, json, os, re, sys, urllib.request

STIMME = 'd0sz7I0K0CRY3FtLuSu0'  # "meine stimme"
g = json.load(open(sys.argv[1], encoding='utf-8'))
aus = sys.argv[2] if len(sys.argv) > 2 else 'ausgabe'
os.makedirs(aus, exist_ok=True)
ziel = os.path.join(aus, g['id'])
if os.path.exists(ziel + '.woerter.json') and json.load(open(ziel + '.woerter.json')).get('text') == g['text']:
    print('Stimme schon vorhanden:', g['id']); sys.exit()

body = json.dumps({'text': g['text'], 'model_id': 'eleven_v4', 'language_code': 'de',
                   'voice_settings': {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.15, 'speed': 1.03}}).encode()
req = urllib.request.Request(
    f'https://api.elevenlabs.io/v1/text-to-speech/{STIMME}/with-timestamps?output_format=mp3_44100_128',
    data=body, headers={'xi-api-key': os.environ.get('ELEVENLABS_API_KEY', 'proxy-injected'), 'Content-Type': 'application/json'})
d = json.load(urllib.request.urlopen(req, timeout=180))
open(ziel + '.mp3', 'wb').write(base64.b64decode(d['audio_base64']))

a = d.get('normalized_alignment') or d['alignment']
zeichen, st, en = a['characters'], a['character_start_times_seconds'], a['character_end_times_seconds']
woerter, akt = [], None
for c, s, e in zip(zeichen, st, en):
    if c.isspace():
        if akt: woerter.append(akt); akt = None
        continue
    if akt is None: akt = {'w': c, 's': s, 'e': e}
    else: akt['w'] += c; akt['e'] = e
if akt: woerter.append(akt)
woerter = [w for w in woerter if re.search(r'\w', w['w'])]
json.dump({'text': g['text'], 'woerter': woerter}, open(ziel + '.woerter.json', 'w'), ensure_ascii=False)
print(g['id'], len(woerter), 'Wörter,', round(woerter[-1]['e'], 1), 's')
