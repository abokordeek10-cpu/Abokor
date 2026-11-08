// Grundfunktionen für jede Seite: Menü, Kopfzeile beim Scrollen, dezente Einblendungen.

const kopf = document.querySelector('[data-kopfzeile]');
const menueKnopf = document.querySelector('[data-menue-knopf]');
const menue = document.querySelector('[data-menue]');

// Kopfzeile bekommt einen Hintergrund, sobald gescrollt wird
if (kopf) {
  const pruefen = () => kopf.classList.toggle('gescrollt', window.scrollY > 24);
  pruefen();
  window.addEventListener('scroll', pruefen, { passive: true });
}

// Handy-Menü
if (menueKnopf && menue) {
  const setzen = (offen) => {
    menueKnopf.setAttribute('aria-expanded', String(offen));
    menueKnopf.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
    document.body.classList.toggle('menue-offen', offen);
  };
  menueKnopf.addEventListener('click', () => {
    setzen(menueKnopf.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menue-offen')) {
      setzen(false);
      menueKnopf.focus();
    }
  });
  menue.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setzen(false)));
  window.matchMedia('(min-width: 900px)').addEventListener('change', () => setzen(false));
}

// Feste Button-Leiste (Handy) ausblenden, solange der große Button im Einstieg sichtbar ist
const leiste = document.querySelector('.mobil-leiste');
const hauptCta = document.querySelector('[data-cta-haupt]');
if (leiste && hauptCta && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => leiste.classList.toggle('versteckt', e.isIntersecting)).observe(hauptCta);
}

// Dezente Einblendung beim Scrollen
const elemente = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const beobachter = new IntersectionObserver(
    (eintraege) => {
      eintraege.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('sichtbar');
          beobachter.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  elemente.forEach((el) => beobachter.observe(el));
} else {
  elemente.forEach((el) => el.classList.add('sichtbar'));
}
