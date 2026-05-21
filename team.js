const TEAM = {
  abokor: {
    name: 'Dr. med. dent. Abokor Deek',
    role: 'Zahnarzt & Praxisinhaber',
    tagline: '15 Jahre Erfahrung in Implantologie und ästhetischer Zahnheilkunde',
    avatar: 'https://i.pravatar.cc/400?img=33',
    color: '#0e6fa8',
    colorLight: '#e0f2fe',
    badge: '👨‍⚕️',
    chips: [
      { icon: '🏥', text: '15+ Jahre Erfahrung' },
      { icon: '🔩', text: 'Implantologe' },
      { icon: '⭐', text: 'Praxisinhaber' },
    ],
    aboutTitle: 'Über Dr. Abokor Deek',
    about: `
      <p>Dr. Abokor Deek gründete die Zahnarztpraxis in Berlin-Mitte im Jahr 2012 mit einer klaren Vision: modernste Zahnmedizin auf höchstem Niveau – verbunden mit einem herzlichen, persönlichen Umgang mit jedem Patienten.</p>
      <p>Sein Schwerpunkt liegt in der <strong>Implantologie</strong> und der <strong>ästhetischen Zahnheilkunde</strong>. Er hat über 1.200 Implantate gesetzt und sich durch internationale Fortbildungen in der digitalen Implantatplanung sowie dem Knochenaufbau spezialisiert.</p>
      <p>Für Dr. Deek steht der Mensch im Mittelpunkt – nicht der Zahn. „Ich möchte, dass meine Patienten die Praxis mit einem Lächeln verlassen – nicht nur weil ihre Zähne gut aussehen, sondern weil sie sich gut aufgehoben gefühlt haben."</p>
    `,
    specialties: [
      { icon: '🔩', title: 'Implantologie', desc: 'Über 1.200 gesetzte Implantate. Digitale 3D-Planung, Sofortimplantation, Knochenaufbau.' },
      { icon: '✨', title: 'Ästhetische Zahnheilkunde', desc: 'Veneers, Bleaching, Smile Design – mit digitalem Vorher-Nachher-Vergleich.' },
      { icon: '🦷', title: 'Parodontologie', desc: 'Behandlung von Parodontitis, Zahnfleischerkrankungen und Mundschleimhaut.' },
      { icon: '🏗️', title: 'Oralchirurgie', desc: 'Weisheitszahnentfernung, Wurzelspitzenresektionen, chirurgische Eingriffe.' },
    ],
    education: [
      { year: '1998–2004', title: 'Studium der Zahnmedizin', place: 'Charité – Universitätsmedizin Berlin' },
      { year: '2004–2006', title: 'Assistenzzeit & Approbation', place: 'Universitätsklinikum Berlin' },
      { year: '2007', title: 'Tätigkeitsschwerpunkt Implantologie (DGI)', place: 'Deutsche Gesellschaft für Implantologie' },
      { year: '2009', title: 'Master of Science – Orale Implantologie', place: 'Universität Frankfurt a. M.' },
      { year: '2010', title: 'Zertifikat Digitale Implantationsplanung', place: 'Straumann Institut, Basel' },
      { year: '2012', title: 'Praxisgründung Berlin-Mitte', place: 'Torstraße 123, 10119 Berlin' },
      { year: 'Laufend', title: 'Regelmäßige Fortbildungen', place: 'EAO, DGI, DGÄZ – national & international' },
    ],
    languages: ['🇩🇪 Deutsch', '🇬🇧 Englisch', '🇸🇦 Arabisch'],
    memberships: ['DGI – Deutsche Gesellschaft für Implantologie', 'DGÄZ – Deutsche Gesellschaft für Ästhetische Zahnheilkunde', 'BZÄK – Bundeszahnärztekammer'],
    availability: 'Mo–Do 08:00–19:00 · Fr 08:00–17:00',
    faq: [
      { q: 'Kann ich direkt zu Dr. Deek kommen, ohne Überweisung?', a: 'Ja, absolutely. Sie benötigen keine Überweisung. Sie können online einen Termin direkt bei Dr. Deek buchen – für Implantologie-Beratung, ästhetische Behandlungen oder allgemeine Zahnheilkunde.' },
      { q: 'Spricht Dr. Deek auch Arabisch?', a: 'Ja. Dr. Deek spricht fließend Deutsch, Englisch und Arabisch. Patienten, die sich auf Arabisch besser verständigen möchten, sind herzlich willkommen.' },
      { q: 'Wie viel Erfahrung hat Dr. Deek mit Implantaten?', a: 'Dr. Deek hat seit 2007 über 1.200 Implantate gesetzt. Er nutzt modernste 3D-Planung (DVT) und bietet auch komplexe Behandlungen wie Knochenaufbau und Sofortimplantation an.' },
      { q: 'Kann ich eine zweite Meinung bei Dr. Deek einholen?', a: 'Selbstverständlich. Wir begrüßen Patienten, die eine Zweitmeinung zu Behandlungsplänen anderer Praxen einholen möchten – besonders bei aufwändigem Zahnersatz oder Implantatplanung.' },
    ],
  },

  hoffmann: {
    name: 'Dr. Lena Hoffmann',
    role: 'Fachzahnärztin für Kieferorthopädie',
    tagline: 'Spezialistin für unsichtbare Zahnkorrektur und Alignertherapie',
    avatar: 'https://i.pravatar.cc/400?img=47',
    color: '#7c3aed',
    colorLight: '#f5f3ff',
    badge: '👩‍⚕️',
    chips: [
      { icon: '😁', text: 'Kieferorthopädie' },
      { icon: '🦷', text: 'Aligner & Zahnspangen' },
      { icon: '👶', text: 'Kinder & Erwachsene' },
    ],
    aboutTitle: 'Über Dr. Lena Hoffmann',
    about: `
      <p>Dr. Lena Hoffmann ist Fachzahnärztin für Kieferorthopädie und hat sich auf die <strong>moderne Alignertherapie</strong> sowie die klassische Behandlung mit Zahnspangen spezialisiert. Sie behandelt sowohl Kinder und Jugendliche als auch Erwachsene.</p>
      <p>Ihr besonderes Anliegen ist es, Patienten eine Behandlung anzubieten, die nicht nur effektiv, sondern auch so <strong>komfortabel und diskret</strong> wie möglich ist. Unsichtbare Schienen sind heute für die meisten Fehlstellungen einsetzbar – und Dr. Hoffmann nutzt konsequent die neueste Technologie.</p>
      <p>Sie ist bekannt für ihre ruhige, geduldige Art – besonders bei Kindern und Jugendlichen, bei denen Vertrauen und Wohlbefinden der Schlüssel zum Behandlungserfolg sind.</p>
    `,
    specialties: [
      { icon: '🦷', title: 'Alignertherapie (Invisalign & Co.)', desc: 'Unsichtbare, herausnehmbare Schienen für Kinder, Jugendliche und Erwachsene.' },
      { icon: '📐', title: 'Festsitzende Apparaturen', desc: 'Moderne Brackets (Keramik oder Metall), linguale Zahnspangen (hinter den Zähnen).' },
      { icon: '🧒', title: 'Kinderkieferorthopädie', desc: 'Frühbehandlung ab 6 Jahren, Plattengeräte, Trainer-Systeme, Prophylaxe.' },
      { icon: '📸', title: 'Digitale Behandlungsplanung', desc: '3D-Scan, digitaler Behandlungsplan und Vorher-Nachher-Simulation vorab.' },
    ],
    education: [
      { year: '2002–2008', title: 'Studium der Zahnmedizin', place: 'Freie Universität Berlin' },
      { year: '2008–2011', title: 'Fachzahnarzt-Weiterbildung Kieferorthopädie', place: 'Charité Berlin, Abteilung KFO' },
      { year: '2011', title: 'Fachzahnarzt-Anerkennung KFO', place: 'Zahnärztekammer Berlin' },
      { year: '2013', title: 'Invisalign-Zertifizierung (Preferred Provider)', place: 'Align Technology, Frankfurt' },
      { year: '2016', title: 'Zertifikat Linguale Orthodontie', place: 'Universität Düsseldorf' },
      { year: '2019', title: 'Master of Science – Kieferorthopädie', place: 'Donau-Universität Krems, Österreich' },
      { year: 'Laufend', title: 'Fortbildungen & Kongresse', place: 'DGKFO, EOS, AAO – europaweit' },
    ],
    languages: ['🇩🇪 Deutsch', '🇬🇧 Englisch', '🇫🇷 Französisch'],
    memberships: ['DGKFO – Deutsche Gesellschaft für Kieferorthopädie', 'EOS – European Orthodontic Society', 'Invisalign Preferred Provider'],
    availability: 'Mo, Mi, Fr 08:00–17:00 · Di, Do 10:00–19:00',
    faq: [
      { q: 'Ab welchem Alter macht Kieferorthopädie Sinn?', a: 'Eine kieferorthopädische Frühuntersuchung empfehlen wir ab 6–7 Jahren. Frühe Behandlung kann schwerwiegende Fehlstellungen verhindern. Bei Erwachsenen ist KFO in jedem Alter möglich.' },
      { q: 'Sind Aligner-Schienen für mich geeignet?', a: 'Für die meisten leichten bis mittelschweren Fehlstellungen sind Aligner ideal. Bei komplexen Fällen sind klassische Brackets effektiver. Wir erstellen eine kostenlose 3D-Analyse, um die beste Option für Sie zu ermitteln.' },
      { q: 'Übernimmt die Krankenkasse die Kosten?', a: 'GKV übernimmt bei Kindern und Jugendlichen bis 18 Jahre (KIG 3–5) die Kosten vollständig. Bei Erwachsenen werden KFO-Leistungen in der Regel nicht erstattet, PKV je nach Tarif.' },
      { q: 'Wie lange dauert eine Aligner-Behandlung?', a: 'Je nach Ausgangsbefund zwischen 6 und 24 Monaten. Bei leichten Korrekturen oft schon nach 6 Monaten abgeschlossen. Dr. Hoffmann zeigt Ihnen im ersten Termin den geplanten Verlauf auf einem 3D-Modell.' },
    ],
  },

  schreiber: {
    name: 'Anna Schreiber',
    role: 'Dentalhygienikerin (DH)',
    tagline: 'Expertin für Prophylaxe, Parodontitis und gesundes Zahnfleisch',
    avatar: 'https://i.pravatar.cc/400?img=45',
    color: '#059669',
    colorLight: '#d1fae5',
    badge: '🦷',
    chips: [
      { icon: '🧹', text: 'Professionelle Zahnreinigung' },
      { icon: '🔄', text: 'Recall-Spezialistin' },
      { icon: '❤️', text: 'Parodontologie' },
    ],
    aboutTitle: 'Über Anna Schreiber',
    about: `
      <p>Anna Schreiber ist staatlich geprüfte Dentalhygienikerin und das Herz unserer Prophylaxe-Abteilung. Sie begleitet Patienten langfristig auf dem Weg zu dauerhaft gesunden Zähnen und gesundem Zahnfleisch.</p>
      <p>Ihr Ansatz ist ganzheitlich: Sie sieht Prophylaxe nicht als einmalige Reinigung, sondern als <strong>kontinuierlichen Prozess</strong>. Dazu gehört die individuelle Aufklärung über Putztechnik, Ernährung und Risikofaktoren – angepasst an jeden Patienten persönlich.</p>
      <p>Besonders am Herzen liegen ihr Patienten mit Parodontitis, die oft jahrelang unter dieser chronischen Erkrankung leiden. Mit ihrem strukturierten Recall-System erreicht sie eine Rückfallquote, die weit unter dem Bundesdurchschnitt liegt.</p>
    `,
    specialties: [
      { icon: '✨', title: 'Professionelle Zahnreinigung (PZR)', desc: 'Airflow, Ultraschall, Handinstrumentierung – individuell auf Ihren Befund abgestimmt.' },
      { icon: '🔬', title: 'Parodontitis-Behandlung (PA)', desc: 'Systematische Parodontaltherapie, subgingivales Debridement, Nachsorge.' },
      { icon: '🔄', title: 'Recall-Management', desc: 'Strukturierte Nachsorge in 3-, 6- oder 12-Monats-Intervallen mit automatischer Erinnerung.' },
      { icon: '🧒', title: 'Kinderprophylaxe', desc: 'Altersgerechte Aufklärung, Fissurenversiegelung, Fluoridierung für Kinder ab 3 Jahren.' },
    ],
    education: [
      { year: '2008–2011', title: 'Ausbildung zur Zahnmedizinischen Fachangestellten (ZFA)', place: 'Zahnärztliche Gemeinschaftspraxis, Berlin' },
      { year: '2011–2013', title: 'Weiterbildung zur Dentalhygienikerin (DH)', place: 'Deutsche Gesellschaft für Dentalhygiene (DGDH), Berlin' },
      { year: '2014', title: 'Zertifikat Parodontologische Assistenz', place: 'DG PARO, Frankfurt' },
      { year: '2016', title: 'Airflow-Prophylaxe-Spezialistin', place: 'EMS Dental, Nyon' },
      { year: '2018', title: 'Aufstiegsfortbildung: Zertifizierte Prophylaxe-Fachkraft', place: 'Akademie für Zahnärztliche Fortbildung Karlsruhe' },
      { year: 'Laufend', title: 'Jahrestagungen & Kurse', place: 'DGDH, EuroPerio – international' },
    ],
    languages: ['🇩🇪 Deutsch', '🇬🇧 Englisch'],
    memberships: ['DGDH – Deutsche Gesellschaft für Dentalhygiene', 'DG PARO – Deutsche Gesellschaft für Parodontologie'],
    availability: 'Mo–Fr 08:00–17:00 · Sa 09:00–13:00',
    faq: [
      { q: 'Was ist der Unterschied zwischen ZMF und Dentalhygienikerin?', a: 'Die Dentalhygienikerin (DH) hat eine umfangreichere Zusatzausbildung und darf eigenständig Prophylaxe- und Parodontitisbehandlungen durchführen. Die ZMF ist stärker auf Assistenz ausgerichtet.' },
      { q: 'Wie schmerzhaft ist eine Parodontitis-Behandlung?', a: 'Wir arbeiten mit lokaler Betäubung – Sie spüren den Eingriff nicht. Nach der Behandlung kann das Zahnfleisch 1–2 Tage etwas empfindlich sein. Anna erklärt alles im Vorfeld und nimmt sich Zeit für Ihre Fragen.' },
      { q: 'Kann ich direkt bei Anna einen Termin buchen?', a: 'Ja. Für Prophylaxe und PZR können Sie online direkt einen Termin buchen – ohne Überweisung oder vorherigen Arzttermin.' },
      { q: 'Wann sollte mein Kind zur ersten Prophylaxe?', a: 'Sobald die ersten Zähne da sind! Wir empfehlen den ersten Besuch spätestens mit 2–3 Jahren. Anna ist speziell auf Kinder eingestellt und macht den Termin zu einem positiven Erlebnis.' },
    ],
  },

  berger: {
    name: 'Marcus Berger',
    role: 'Praxismanager & Patientenkoordinator',
    tagline: 'Ihr erster Ansprechpartner – für Organisation, Abrechnung und alle Fragen rund um die Praxis',
    avatar: 'https://i.pravatar.cc/400?img=52',
    color: '#d97706',
    colorLight: '#fef9c3',
    badge: '💼',
    chips: [
      { icon: '📋', text: 'Praxisorganisation' },
      { icon: '💶', text: 'Abrechnung & HKP' },
      { icon: '📱', text: 'Digitale Aufnahme' },
    ],
    aboutTitle: 'Über Marcus Berger',
    about: `
      <p>Marcus Berger ist das organisatorische Rückgrat der Praxis. Als Praxismanager sorgt er dafür, dass alles reibungslos funktioniert – von der Online-Terminbuchung bis zur Abrechnung, vom digitalen Patientenportal bis zur Kommunikation mit den Krankenkassen.</p>
      <p>Patienten schätzen ihn als <strong>verlässlichen, geduldigen Ansprechpartner</strong>: Er erklärt Heil- und Kostenpläne verständlich, hilft bei der Kommunikation mit der Versicherung und sorgt dafür, dass keine Fragen offen bleiben.</p>
      <p>Dank seiner Arbeit an der Digitalisierung der Praxis – vom papierlosen Patientenformular bis zum Praxis-Dashboard – ist die Praxis heute eine der modernsten in Berlin-Mitte.</p>
    `,
    specialties: [
      { icon: '📅', title: 'Terminmanagement & Koordination', desc: 'Optimale Planung des Tagesablaufs, Notfall-Slots, Online-Buchungssystem.' },
      { icon: '💶', title: 'Heil- und Kostenpläne (HKP)', desc: 'Erstellung, Erläuterung und Einreichung von HKPs bei gesetzlichen und privaten Kassen.' },
      { icon: '📱', title: 'Digitale Patientenaufnahme', desc: 'Neupatientenformular, Anamnese und Einwilligungen – digital, DSGVO-konform.' },
      { icon: '📊', title: 'Praxis-Dashboard & Controlling', desc: 'Auslastungsanalyse, Recall-Management, Qualitätssicherung.' },
    ],
    education: [
      { year: '2004–2007', title: 'Ausbildung zum Kaufmann im Gesundheitswesen', place: 'Vivantes Netzwerk für Gesundheit, Berlin' },
      { year: '2007–2010', title: 'Bachelor of Arts – Gesundheitsmanagement', place: 'Hochschule für Wirtschaft und Recht Berlin (HWR)' },
      { year: '2012', title: 'Zertifikat Praxismanagement', place: 'Kassenzahnärztliche Bundesvereinigung (KZBV)' },
      { year: '2015', title: 'Weiterbildung GOZ-Abrechnung & Privatliquidation', place: 'Akademie Praxismanagement, München' },
      { year: '2020', title: 'Zertifikat Datenschutzbeauftragter (DSGVO)', place: 'TÜV Rheinland Akademie' },
      { year: '2022', title: 'Digitalisierung im Gesundheitswesen', place: ' Bundesverband Managed Care e.V.' },
    ],
    languages: ['🇩🇪 Deutsch', '🇬🇧 Englisch'],
    memberships: ['VPPM – Verband der Praxismanager', 'Gesellschaft für Qualitätsmanagement in der Gesundheitsversorgung (GQMG)'],
    availability: 'Mo–Fr 08:00–18:00',
    faq: [
      { q: 'An wen wende ich mich bei Fragen zur Abrechnung?', a: 'Direkt an Marcus. Er erklärt Ihnen GKV-Festzuschüsse, Eigenanteile und HKPs verständlich und hilft bei der Einreichung bei Ihrer Krankenkasse.' },
      { q: 'Kann Marcus mir bei Problemen mit meiner Krankenkasse helfen?', a: 'Ja. Er kennt die Abläufe und Regelungen bei GKV und PKV und unterstützt Sie bei Rückfragen, Ablehnungen oder Widersprüchen – natürlich immer in Absprache mit dem behandelnden Arzt.' },
      { q: 'Wie funktioniert das digitale Neupatientenformular?', a: 'Sie erhalten nach der Terminbuchung einen Link per E-Mail. Das Formular füllen Sie bequem zuhause auf dem Handy oder PC aus – kein Papierkram mehr in der Praxis. Marcus hat dieses System für unsere Praxis entwickelt und betreut.' },
      { q: 'Was passiert mit meinen Daten?', a: 'Alle Patientendaten werden DSGVO-konform auf deutschen Servern gespeichert und Ende-zu-Ende verschlüsselt. Marcus ist zertifizierter Datenschutzbeauftragter und verantwortet die IT-Sicherheit der Praxis.' },
    ],
  },
};

const ALL_IDS = Object.keys(TEAM);

function init() {
  const id = new URLSearchParams(window.location.search).get('id') || 'abokor';
  const d  = TEAM[id] || TEAM.abokor;

  document.getElementById('pageTitle').textContent = d.name + ' – Dr. Abokor Praxis';
  document.documentElement.style.setProperty('--tm-color', d.color);

  // Hero
  document.getElementById('tmHero').style.setProperty('--tm-color', d.color);
  document.getElementById('tmAvatar').src    = d.avatar;
  document.getElementById('tmAvatar').alt    = d.name;
  document.getElementById('tmBadge').textContent = d.badge;
  document.getElementById('tmRole').textContent  = d.role;
  document.getElementById('tmName').textContent  = d.name;
  document.getElementById('tmTagline').textContent = d.tagline;
  document.getElementById('tmChips').innerHTML = d.chips.map(c =>
    `<div class="tm-chip"><span>${c.icon}</span>${c.text}</div>`
  ).join('');

  // About
  document.getElementById('tmAboutTitle').textContent = d.aboutTitle;
  document.getElementById('tmAbout').innerHTML = d.about;

  // Specialties
  document.getElementById('tmSpecialties').innerHTML = `
    <div class="tm-spec-grid">
      ${d.specialties.map(s => `
        <div class="tm-spec-card" style="border-top-color:${d.color};">
          <div class="tm-spec-icon" style="background:${d.colorLight};">${s.icon}</div>
          <div>
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Education timeline
  document.getElementById('tmEducation').innerHTML = `
    <div class="tm-edu-timeline">
      ${d.education.map(e => `
        <div class="tm-edu-item">
          <div class="tm-edu-year" style="color:${d.color};">${e.year}</div>
          <div class="tm-edu-dot" style="background:${d.color};"></div>
          <div class="tm-edu-body">
            <strong>${e.title}</strong>
            <span>${e.place}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="tm-memberships">
      <h4>Mitgliedschaften</h4>
      ${d.memberships.map(m => `<span class="tm-member-badge" style="background:${d.colorLight};color:${d.color};">🏅 ${m}</span>`).join('')}
    </div>
  `;

  // FAQ
  document.getElementById('tmFaqName').textContent = d.name.split(' ').slice(-1)[0];
  document.getElementById('tmFaq').innerHTML = d.faq.map((f, i) => `
    <div class="faq-item" id="faq${i}">
      <button class="faq-q" onclick="toggleFaq(${i})">
        <span>${f.q}</span>
        <span class="faq-arrow">▾</span>
      </button>
      <div class="faq-a" id="faqA${i}"><p>${f.a}</p></div>
    </div>
  `).join('');

  // Sidebar
  document.getElementById('tmAvatarSide').src  = d.avatar;
  document.getElementById('tmAvatarSide').alt  = d.name;
  document.getElementById('tmNameSide').textContent = d.name;
  document.getElementById('tmRoleSide').textContent = d.role;

  document.getElementById('tmLangs').innerHTML = `
    <div class="tm-langs-label">🌐 Sprachen</div>
    <div class="tm-lang-list">${d.languages.map(l => `<span class="tm-lang">${l}</span>`).join('')}</div>
  `;

  document.getElementById('tmBookBtn').href = `booking.html?doctor=${id}`;
  document.getElementById('tmBookBtn').textContent = `Termin bei ${d.name.split(' ')[0]} ${d.name.split(' ').slice(-1)[0]} buchen`;

  document.getElementById('tmAvailability').innerHTML = `
    <div class="tm-avail">
      <span>🕐</span>
      <div><strong>Sprechzeiten</strong><br><small>${d.availability}</small></div>
    </div>
  `;

  // Other team members
  document.getElementById('tmOtherTeam').innerHTML = ALL_IDS
    .filter(t => t !== id)
    .map(t => {
      const o = TEAM[t];
      return `
        <a href="team.html?id=${t}" class="lp-other-item">
          <img src="${o.avatar}" alt="${o.name}" class="tm-other-avatar">
          <div style="flex:1;min-width:0;">
            <div style="font-size:0.82rem;font-weight:600;color:var(--dark);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.name.replace('Dr. med. dent. ','Dr. ')}</div>
            <div style="font-size:0.72rem;color:var(--gray);">${o.role}</div>
          </div>
          <span class="lp-other-arrow">→</span>
        </a>
      `;
    }).join('');
}

function toggleFaq(i) {
  const answer = document.getElementById('faqA' + i);
  const item   = document.getElementById('faq' + i);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-a').style.maxHeight = '';
  });
  if (!isOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

init();
