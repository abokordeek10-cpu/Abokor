// ─────────────────────────────────────────────────────────────
//  Abora Dashboard – Zugänge
//  Pro Betrieb: SHA-256 des Zugangscodes → Betriebs-Kennung und Name.
//  Hier stehen NUR Prüfsummen, nie die Codes selbst.
//  Neuen Zugang anlegen: python3 neuer-zugang.py <betrieb_id> "<Name>"
// ─────────────────────────────────────────────────────────────
const ZUGAENGE = {
  '3b89aba98af7098ee755c60d6d40a94e7f1edc5ba88a64271ec709b7be219850': { betrieb_id: 'abora', name: 'Abora Automation' },
  '01a420d472745a17997dd89a560757aaffe18914fc32b487fc08625e15fa2c84': { betrieb_id: 'test-sanitaer', name: 'Sanitär Muster (Test)' },
};
