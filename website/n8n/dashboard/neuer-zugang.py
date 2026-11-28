"""Erzeugt einen Zugangscode für das Abora-Dashboard.
Aufruf: python3 neuer-zugang.py <betrieb_id> "<Name des Betriebs>"
Gibt den Code (nur dem Kunden geben, nirgends speichern) und die Zeile für zugaenge.js aus."""
import hashlib, secrets, sys
if len(sys.argv) < 3:
    sys.exit('Aufruf: python3 neuer-zugang.py <betrieb_id> "<Name>"')
alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
code = '-'.join(''.join(secrets.choice(alphabet) for _ in range(4)) for _ in range(5))
h = hashlib.sha256(code.encode()).hexdigest()
print('Zugangscode (geheim):', code)
print("Zeile für zugaenge.js:")
print(f"  '{h}': {{ betrieb_id: '{sys.argv[1]}', name: '{sys.argv[2]}' }},")
