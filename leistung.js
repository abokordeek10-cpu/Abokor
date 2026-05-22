const LEISTUNGEN = {
  prophylaxe: {
    icon: '🦷',
    color: '#0e6fa8',
    colorLight: '#e0f2fe',
    title: 'Prophylaxe',
    subtitle: 'Professionelle Zahnreinigung – für gesunde Zähne ein Leben lang',
    meta: [
      { icon: '⏱', label: '45–60 Minuten' },
      { icon: '🔄', label: 'Alle 3–12 Monate' },
      { icon: '💶', label: 'Ab 80 € (GKV-Anteil möglich)' },
    ],
    descTitle: 'Was ist Prophylaxe?',
    desc: `
      <p>Die professionelle Zahnreinigung (PZR) ist die wirksamste Maßnahme zur Vorbeugung von Karies und Parodontitis. Dabei werden Beläge, Zahnstein und Verfärbungen entfernt, die mit der normalen Zahnbürste nicht erreichbar sind.</p>
      <p>Regelmäßige Prophylaxe schützt nicht nur Ihre Zähne – Studien zeigen auch Zusammenhänge zwischen Zahngesundheit und allgemeiner Gesundheit (Herzerkrankungen, Diabetes).</p>
    `,
    steps: [
      { num: '1', title: 'Befundung & Mundhygienecheck', desc: 'Wir beurteilen Ihren aktuellen Mundhygienestatus und ermitteln Risikobereiche.' },
      { num: '2', title: 'Entfernung von Zahnstein', desc: 'Mit Ultraschall und feinen Handinstrumenten wird Zahnstein schonend abgelöst.' },
      { num: '3', title: 'Entfernung weicher Beläge (Biofilm)', desc: 'Airflow-Technologie oder Gummipolitur entfernt verfärbungsbildende Plaque.' },
      { num: '4', title: 'Politur & Glättung', desc: 'Die Zahnoberflächen werden poliert, damit Beläge schwerer anhaften können.' },
      { num: '5', title: 'Fluoridierung', desc: 'Hochdosiertes Fluoridgel oder -lack schützt den Zahnschmelz und remineralisiert.' },
      { num: '6', title: 'Individualprophylaxe-Beratung', desc: 'Tipps zu Putztechnik, Zahnseide, Interdentalbürsten – auf Ihren Befund zugeschnitten.' },
    ],
    benefits: [
      '✓ Vorbeugung von Karies und Parodontitis',
      '✓ Frischer Atem und gesünderes Zahnfleisch',
      '✓ Natürlich hellere Zähne durch Entfernung von Verfärbungen',
      '✓ Früherkennung von Problemen vor dem Schmerz',
      '✓ Automatischer Recall: wir erinnern Sie rechtzeitig',
      '✓ Schutzwirkung über Monate durch Fluoridierung',
    ],
    faq: [
      { q: 'Wie oft sollte ich zur Prophylaxe?', a: 'Das hängt von Ihrem persönlichen Risiko ab. Gesunde Patienten kommen oft mit einmal jährlich aus. Bei erhöhtem Karies- oder Parodontitis-Risiko empfehlen wir alle 3–6 Monate.' },
      { q: 'Übernimmt die Krankenkasse die Kosten?', a: 'Gesetzliche Kassen übernehmen eine jährliche Kontrolluntersuchung, aber nicht immer die vollständige PZR. Private Krankenversicherungen erstatten die PZR in der Regel vollständig.' },
      { q: 'Tut die Reinigung weh?', a: 'Nein. Die PZR ist bei korrekter Mundhygiene schmerzfrei. Bei empfindlichem Zahnhals kann auf Wunsch eine lokale Betäubungscreme aufgetragen werden.' },
      { q: 'Was ist der Unterschied zur normalen Zahnreinigung zuhause?', a: 'Zuhause können Sie Plaque auf den sichtbaren Flächen entfernen. Zahnstein an der Zahnfleischschlinie, zwischen den Zähnen und unter dem Zahnfleischrand ist nur professionell zu beseitigen.' },
    ],
    cost: 'Ab 80 €',
    costNote: 'GKV: Teilweise erstattungsfähig<br>PKV: Meist vollständig übernommen<br>Selbstzahler: 80–140 € je nach Aufwand',
    duration: '45–60 Min.',
    insurance: 'Bonusheft lohnt sich: Führen Sie Ihr Zahnarzt-Bonusheft vollständig, steigt Ihr GKV-Festzuschuss bei späterem Zahnersatz.',
  },

  notfall: {
    icon: '🚨',
    color: '#dc2626',
    colorLight: '#fef2f2',
    title: 'Schmerzen & Notfall',
    subtitle: 'Akute Versorgung – wir helfen Ihnen so schnell wie möglich',
    meta: [
      { icon: '⚡', label: 'Heute noch möglich' },
      { icon: '📞', label: '24/7 Hotline: +49 30 000 001' },
      { icon: '⏱', label: '30 Min. Erstversorgung' },
    ],
    descTitle: 'Wann ist es ein Notfall?',
    desc: `
      <p>Zahnschmerzen können plötzlich und heftig auftreten – nachts, am Wochenende, mitten im Alltag. Wir halten täglich reservierte Notfall-Slots frei und sind über die Hotline rund um die Uhr erreichbar.</p>
      <p><strong>Bitte rufen Sie sofort an bei:</strong> starken Schwellungen im Gesicht oder Hals, Fieber in Verbindung mit Zahnschmerzen, Unfällen mit Zahnverlust oder Kieferverletzungen – das sind medizinische Notfälle.</p>
    `,
    steps: [
      { num: '1', title: 'Sofortkontakt', desc: 'Rufen Sie an oder buchen Sie online. Wir geben Ihnen innerhalb von Minuten einen Termin oder Rückruf.' },
      { num: '2', title: 'Schmerzlinderung', desc: 'Erste Maßnahme ist immer die Schmerzfreiheit – durch lokale Betäubung und ggf. Medikation.' },
      { num: '3', title: 'Schnelldiagnose', desc: 'Röntgenbild und Befundung zur Ursachenermittlung (Karies, Entzündung, Abszess, Zahnbruch …).' },
      { num: '4', title: 'Notfallbehandlung', desc: 'Je nach Befund: temporäre Füllung, Eröffnung, Abszessdrainage oder Schmerzmedikation.' },
      { num: '5', title: 'Folgebehandlung planen', desc: 'Wir vereinbaren den nächsten Termin für die definitive Versorgung.' },
    ],
    benefits: [
      '✓ Tägliche Notfall-Slots – auch kurzfristig',
      '✓ 24/7-Hotline außerhalb der Öffnungszeiten',
      '✓ Schnelle Schmerzlinderung als erste Priorität',
      '✓ Volle Versorgung vor Ort – kein Weiterschicken',
      '✓ Echte Notfälle werden sofort priorisiert',
      '✓ Auch für Neu-Patienten ohne Voranmeldung',
    ],
    faq: [
      { q: 'Was tun, wenn ein Zahn herausgefallen ist?', a: 'Zahn nicht anfassen! Zahn in Zahnrettungsbox (Apotheke), Milch oder Speichel aufbewahren und sofort anrufen. Innerhalb von 60 Minuten ist das Wiedereinsetzen oft möglich.' },
      { q: 'Kann ich nachts anrufen?', a: 'Ja. Unsere Notfall-Hotline ist 24/7 erreichbar: +49 30 000 001. Bei lebensbedrohlichen Situationen (Schock, Atemprobleme) immer zuerst 112 rufen.' },
      { q: 'Kostet der Notfalltermin mehr?', a: 'Notfalltermine werden nach GOZ abgerechnet. Gesetzlich Versicherte zahlen den üblichen Eigenanteil, ggf. gibt es einen Notfallzuschlag nach Tarif.' },
      { q: 'Was hilft gegen Zahnschmerzen bis zum Termin?', a: 'Ibuprofen (kein Aspirin wegen Blutungsrisiko) kann vorübergehend helfen. Auf die schmerzende Seite keine Nahrung nehmen, nicht wärmen (verschlimmert Entzündungen).' },
    ],
    cost: 'Nach GOZ',
    costNote: 'GKV: Notfallversorgung immer gedeckt<br>PKV: Vollständig übernommen<br>Ggf. Notfallzuschlag je nach Uhrzeit',
    duration: 'Ab 30 Min.',
    insurance: 'Bei Notfällen entstehen nie Probleme mit der Kostenübernahme – GKV und PKV tragen alle medizinisch notwendigen Maßnahmen.',
  },

  implantologie: {
    icon: '🔩',
    color: '#059669',
    colorLight: '#d1fae5',
    title: 'Implantologie',
    subtitle: 'Zahnimplantate – der dauerhafteste Ersatz für fehlende Zähne',
    meta: [
      { icon: '📅', label: '3–6 Monate Gesamtdauer' },
      { icon: '💬', label: 'Kostenlose Erstberatung' },
      { icon: '⭐', label: '15+ Jahre Implantologie-Erfahrung' },
    ],
    descTitle: 'Was sind Zahnimplantate?',
    desc: `
      <p>Ein Zahnimplantat ist eine Titan-Schraube, die chirurgisch in den Kieferknochen eingesetzt wird und als künstliche Zahnwurzel dient. Darauf wird eine Keramikkrone befestigt – optisch und funktionell kaum vom echten Zahn zu unterscheiden.</p>
      <p>Implantate sind die <strong>hochwertigste Form des Zahnersatzes</strong>: Sie belasten keine Nachbarzähne, erhalten den Knochen, und halten bei guter Pflege ein Leben lang.</p>
    `,
    steps: [
      { num: '1', title: 'Kostenlose Erstberatung', desc: 'Wir erklären Ihnen den Ablauf, beantworten alle Fragen und klären ob Implantate für Sie geeignet sind.' },
      { num: '2', title: '3D-Röntgen (DVT)', desc: 'Dreidimensionales Röntgen gibt uns genaue Auskunft über Knochenangebot und Anatomie.' },
      { num: '3', title: 'Behandlungsplanung', desc: 'Mit digitaler Implantationsplanung legen wir Position und Winkel präzise fest. Sie erhalten einen detaillierten Heil- und Kostenplan.' },
      { num: '4', title: 'Implantation', desc: 'Der ambulante Eingriff unter lokaler Betäubung dauert ca. 30–60 Min. pro Implantat. Auf Wunsch in Dämmerschlaf.' },
      { num: '5', title: 'Einheilphase', desc: '3–6 Monate Osseointegration – das Implantat verwächst mit dem Knochen. Sie erhalten ein temporäres Provisorium.' },
      { num: '6', title: 'Keramikkrone einsetzen', desc: 'Die endgültige Krone aus Vollkeramik oder Zirkon wird individuell gefertigt und eingesetzt.' },
    ],
    benefits: [
      '✓ Wirkt und fühlt sich an wie ein echter Zahn',
      '✓ Keine Beschädigung der Nachbarzähne (wie bei Brücken)',
      '✓ Erhält den Kieferknochen – verhindert Knochenschwund',
      '✓ Lebenslange Haltbarkeit bei guter Pflege',
      '✓ Optimale Kaufunktion und Ästhetik',
      '✓ Kostenlose Erstberatung und detaillierter Kostenplan vorab',
    ],
    faq: [
      { q: 'Tut die Implantation weh?', a: 'Der Eingriff erfolgt unter lokaler Betäubung – Sie spüren nichts. Danach kann es 2–3 Tage leicht drücken, was mit normalen Schmerzmitteln gut kontrollierbar ist.' },
      { q: 'Was kostet ein Implantat?', a: 'Ein Implantat kostet je nach Komplexität ca. 1.500–3.000 € inkl. Krone. GKV zahlt einen Festzuschuss. PKV übernimmt oft 80–100 %. Wir erstellen einen genauen HKP vorab.' },
      { q: 'Gibt es Altersbeschränkungen?', a: 'Implantate sind erst nach Abschluss des Knochenwachstums möglich (ca. 18 Jahre). Nach oben gibt es keine Grenze – auch 80-Jährige können implantiert werden, sofern der Allgemeinzustand es erlaubt.' },
      { q: 'Was wenn nicht genug Knochen vorhanden ist?', a: 'Knochenaufbau (Augmentation) ist heute Routine. Wir besprechen dies in der Beratung und zeigen Ihnen alle Optionen.' },
    ],
    cost: 'Ab 1.500 € / Implantat',
    costNote: 'GKV: Festzuschuss (ca. 200–400 €)<br>PKV: 80–100 % Erstattung<br>Ratenzahlung möglich',
    duration: 'Erstberatung: 30 Min.<br>Implantation: 60–90 Min.',
    insurance: 'Wir erstellen Ihnen vorab einen vollständigen Heil- und Kostenplan, den Sie bei Ihrer Kasse zur Genehmigung einreichen können.',
  },

  zahnersatz: {
    icon: '👑',
    color: '#d97706',
    colorLight: '#fef9c3',
    title: 'Zahnersatz',
    subtitle: 'Kronen, Brücken & Prothesen – individuell, ästhetisch, langlebig',
    meta: [
      { icon: '🦷', label: 'Kronen, Brücken, Prothesen' },
      { icon: '🎨', label: 'Vollkeramik & Zirkon' },
      { icon: '📋', label: 'Kostenplan vor Behandlung' },
    ],
    descTitle: 'Welche Arten von Zahnersatz gibt es?',
    desc: `
      <p>Zahnersatz umfasst alle Versorgungen, die fehlende oder stark beschädigte Zähne ersetzen. Wir bieten das komplette Spektrum – von der einfachen Krone bis zur aufwändigen Brückenversorgung.</p>
      <p>Moderne Materialien wie <strong>Vollkeramik und Zirkon</strong> machen Zahnersatz heute nahezu unsichtbar. Die Wahl des Materials hängt von der Lage des Zahns, funktionellen Anforderungen und Ihrem Budget ab.</p>
    `,
    steps: [
      { num: '1', title: 'Untersuchung & Beratung', desc: 'Befundung, Röntgen, Besprechung aller Optionen. Wir zeigen Ihnen Materialproben und erklären Vor- und Nachteile.' },
      { num: '2', title: 'Heil- und Kostenplan (HKP)', desc: 'Wir erstellen den gesetzlich vorgeschriebenen HKP mit GKV-Festzuschuss und Ihrem Eigenanteil – transparent vor Behandlungsbeginn.' },
      { num: '3', title: 'Präparation', desc: 'Der Zahn wird auf Kronenstärke beschliffen. Bei Brücken werden die Ankerzähne vorbereitet.' },
      { num: '4', title: 'Abformung / Digitaler Scan', desc: 'Präzisionsabdruck oder 3D-Intraoralscan für das zahntechnische Labor.' },
      { num: '5', title: 'Provisorium', desc: 'Sie erhalten eine temporäre Versorgung, die Sie während der Laborzeit tragen.' },
      { num: '6', title: 'Einprobe & endgültige Eingliederung', desc: 'Passung, Farbe und Funktion werden geprüft. Nach Freigabe wird der Zahnersatz fest eingegliedert.' },
    ],
    benefits: [
      '✓ Modernste Materialien: Vollkeramik, Zirkon, Gold',
      '✓ Natürliche Ästhetik – kaum vom echten Zahn unterscheidbar',
      '✓ Langer HKP-Prozess: keine Überraschungen bei Kosten',
      '✓ Eigenes Zahntechniklabor für schnelle Turnauskünfte',
      '✓ GKV-Bonusheft: höhere Festzuschüsse bei regelmäßigen Kontrollen',
      '✓ Auch für Patienten mit Knochenabbau: Teleskopprothesen',
    ],
    faq: [
      { q: 'Was zahlt die gesetzliche Kasse?', a: 'Die GKV zahlt einen Festzuschuss (50 % der Regelversorgung), der sich mit lückenlosem Bonusheft auf bis zu 75 % erhöhen lässt. Den Rest zahlen Sie selbst oder wählen eine günstigere Regelversorgung.' },
      { q: 'Wie lange hält eine Krone?', a: 'Keramik- und Zirkonkronen halten bei guter Pflege 15–20+ Jahre. Goldkronen gelten als besonders langlebig. Die Haltbarkeit hängt stark von Hygiene und Kausituation ab.' },
      { q: 'Was ist der Unterschied zwischen Krone und Brücke?', a: 'Eine Krone versorgt einen einzelnen beschädigten Zahn. Eine Brücke ersetzt einen fehlenden Zahn, indem sie auf den Nachbarzähnen verankert wird.' },
      { q: 'Muss ich eine Prothese herausnehmen?', a: 'Herausnehmbare Prothesen werden täglich gereinigt. Es gibt auch festsitzende Alternativen auf Implantaten. Wir beraten Sie zu allen Optionen.' },
    ],
    cost: 'Eigenanteil ab 0 €',
    costNote: 'GKV: Festzuschuss 50–75 %<br>PKV: Meist vollständig übernommen<br>Eigenanteil je nach Wunschmaterial',
    duration: 'Erstgespräch: 45 Min.<br>Gesamtdauer: 3–6 Wochen',
    insurance: 'Wichtig: Reichen Sie den HKP vor Behandlungsbeginn bei Ihrer Kasse ein. Nachträgliche Genehmigungen sind nicht möglich.',
  },

  bleaching: {
    icon: '✨',
    color: '#7c3aed',
    colorLight: '#f5f3ff',
    title: 'Bleaching & Veneers',
    subtitle: 'Strahlendes Lächeln – professionelle Zahnaufhellung und ästhetische Verblendungen',
    meta: [
      { icon: '⏱', label: 'Bleaching: 60–90 Min.' },
      { icon: '🎨', label: 'Bis zu 8 Helligkeitsstufen' },
      { icon: '💬', label: 'Kostenlose Farbberatung' },
    ],
    descTitle: 'Bleaching oder Veneers – was passt zu Ihnen?',
    desc: `
      <p><strong>Bleaching</strong> hellt die natürliche Zahnfarbe mit speziellen Wasserstoffperoxid-Gelen auf – schonend, effektiv und reversibel. Ideal für gesunde Zähne mit Verfärbungen durch Kaffee, Tee, Rotwein oder das Alter.</p>
      <p><strong>Veneers</strong> sind hauchdünne Keramikschalen, die dauerhaft auf die Zahnvorderseite aufgeklebt werden. Sie korrigieren nicht nur Farbe, sondern auch Form, Länge und kleine Fehlstellungen – die Methode der Wahl für ein dauerhaft perfektes Lächeln.</p>
    `,
    steps: [
      { num: '1', title: 'Beratungsgespräch & Farbanalyse', desc: 'Wir bestimmen Ihre aktuelle Zahnfarbe (VITA-Skala) und besprechen das gewünschte Ergebnis. Digital-Smile-Design zeigt Ihnen das Ergebnis vorab.' },
      { num: '2', title: 'Voruntersuchung', desc: 'Karies und Zahnfleischerkrankungen müssen vorher behandelt sein. Wir prüfen Eignung und klären über mögliche Sensibilität auf.' },
      { num: '3', title: 'Beim In-Office-Bleaching', desc: 'Schutz des Zahnfleisches → Auftragendes Bleaching-Gels → Aktivierung durch Licht → 3–4 Durchgänge à 15 Min.' },
      { num: '4', title: 'Beim Home-Bleaching', desc: 'Individuelle Schienenabformung → Anleitung → 2 Wochen täglich 1–2 Stunden Schiene tragen.' },
      { num: '5', title: 'Bei Veneers: Präparation', desc: 'Minimale Abtragung des Zahnschmelzes (~0,3 mm), Scan, Laborherstellung der Keramikschalen.' },
      { num: '6', title: 'Abschlusskontrolle', desc: 'Ergebniskontrolle, Pflegeberatung und Tipps zur Haltbarkeit des Bleaching-Ergebnisses.' },
    ],
    benefits: [
      '✓ Sofortbares Ergebnis beim In-Office-Bleaching',
      '✓ Bis zu 8 Helligkeitsstufen heller',
      '✓ Schonend: Zahnschmelz und Struktur bleiben intakt',
      '✓ Veneers korrigieren auch Form, Länge und Lücken',
      '✓ Langzeitstabiles Ergebnis bei richtiger Pflege',
      '✓ Vorher-Nachher-Fotos für Ihre Freigabe',
    ],
    faq: [
      { q: 'Ist Bleaching schädlich für den Zahnschmelz?', a: 'Professionelles Bleaching beim Zahnarzt ist bei gesunden Zähnen sicher. Wir verwenden zahnschmelzschonende Produkte und fluoridieren danach für optimalen Schutz.' },
      { q: 'Wie lange hält das Ergebnis?', a: 'Bei Vermeidung von stark färbenden Lebensmitteln (Kaffee, Rotwein, Curry) 1–3 Jahre. Auffrischungs-Bleaching ist jederzeit möglich.' },
      { q: 'Werden Kronen und Füllungen auch aufgehellt?', a: 'Nein. Kunstoff und Keramik reagieren nicht auf Bleichmittel. Falls Sie Restaurationen im Frontbereich haben, besprechen wir das vorab – ggf. müssen diese nach dem Bleaching erneuert werden.' },
      { q: 'Sind Veneers für mich geeignet?', a: 'Veneers sind ideal, wenn Sie dauerhaft Form und Farbe verändern möchten. Sie sind irreversibel (Zahnschmelz wird abgetragen). Wir prüfen die Eignung und zeigen Ihnen ein digitales Vorher-Nachher.' },
    ],
    cost: 'Bleaching ab 299 €',
    costNote: 'In-Office-Bleaching: 299–499 €<br>Home-Bleaching-Schienen: 199–299 €<br>Veneers: 600–1.500 € / Zahn',
    duration: 'Bleaching: 60–90 Min.<br>Veneers: 2–3 Termine',
    insurance: 'Ästhetische Leistungen werden von GKV nicht übernommen. PKV je nach Tarif teilweise. Wir bieten flexible Ratenzahlung an.',
  },

  checkup: {
    icon: '📋',
    color: '#0369a1',
    colorLight: '#f0f9ff',
    title: 'Vorsorge & Check-up',
    subtitle: 'Jährliche Untersuchung – Probleme erkennen bevor sie Schmerzen machen',
    meta: [
      { icon: '⏱', label: '30 Minuten' },
      { icon: '💶', label: 'GKV: kostenlos (1× jährlich)' },
      { icon: '🛡', label: 'Bonusheft für höhere Zuschüsse' },
    ],
    descTitle: 'Warum regelmäßige Kontrollen so wichtig sind',
    desc: `
      <p>Die jährliche Kontrolluntersuchung ist Ihre wichtigste Investition in die Zahngesundheit. Karies und Parodontitis entwickeln sich schleichend – oft über Jahre ohne Schmerzen. Beim Check-up erkennen wir sie, bevor teure oder aufwändige Behandlungen nötig werden.</p>
      <p>Gesetzliche Kassen übernehmen den Check-up <strong>einmal jährlich kostenlos</strong>. Tragen Sie die Untersuchung ins Bonusheft ein – das steigert bei späterem Zahnersatz Ihren Festzuschuss auf bis zu 75 %.</p>
    `,
    steps: [
      { num: '1', title: 'Sichtbefund & Tastbefund', desc: 'Alle Zähne, das Zahnfleisch, die Mundschleimhaut und der Kiefer werden sorgfältig untersucht.' },
      { num: '2', title: 'Röntgenuntersuchung', desc: 'Digitale Bissflügel-Aufnahmen zeigen Karies zwischen den Zähnen und unter Füllungen – was das Auge nicht sieht.' },
      { num: '3', title: 'Parodontitisscreening (PSI)', desc: 'Messung der Zahnfleischtaschen-Tiefe zur Früherkennung von Parodontitis.' },
      { num: '4', title: 'Krebsvorsorge (Mundhöhle)', desc: 'Schleimhaut und Zunge werden auf Auffälligkeiten untersucht.' },
      { num: '5', title: 'Befundbesprechung', desc: 'Sie erhalten eine klare Erklärung aller Befunde und Empfehlungen – verständlich, ohne Fachchinesisch.' },
      { num: '6', title: 'Bonusheft-Eintrag', desc: 'Wir tragen den Termin ins Bonusheft ein – wichtig für Ihren späteren GKV-Zuschuss bei Zahnersatz.' },
    ],
    benefits: [
      '✓ Einmal jährlich von GKV vollständig übernommen',
      '✓ Karies-Früherkennung spart spätere Behandlungskosten',
      '✓ Parodontitis-Screening schützt vor Zahnverlust',
      '✓ Bonusheft-Eintrag sichert höhere Zahnersatz-Zuschüsse',
      '✓ Krebsvorsorge der Mundschleimhaut inklusive',
      '✓ Klare Empfehlungen und Behandlungsplanung',
    ],
    faq: [
      { q: 'Wie oft sollte ich zum Check-up?', a: 'Mindestens einmal jährlich – das übernimmt die GKV. Bei erhöhtem Risiko (Diabetes, Rauchen, schwache Immunabwehr) empfehlen wir alle 6 Monate.' },
      { q: 'Was ist das Bonusheft?', a: 'Das Bonusheft dokumentiert Ihre regelmäßigen Zahnarztbesuche. Nach 5 Jahren lückenloser Einträge erhöht sich Ihr GKV-Festzuschuss bei Zahnersatz von 50 % auf 70 %, nach 10 Jahren auf 75 %.' },
      { q: 'Wird beim Check-up auch gereinigt?', a: 'Die reine Untersuchung beinhaltet keine Zahnreinigung. Auf Wunsch kombinieren wir Check-up mit Prophylaxe (PZR) – dann ein Termin für alles.' },
      { q: 'Muss immer geröntgt werden?', a: 'Nein, Röntgen ist keine Pflicht. Es wird nach Befund empfohlen. Digitales Röntgen hat eine sehr geringe Strahlendosis – deutlich unter der natürlichen Tagesbelastung.' },
    ],
    cost: 'Kostenlos (GKV)',
    costNote: 'GKV: 1× jährlich kostenfrei<br>PKV: Vollständig übernommen<br>Selbstzahler: ca. 40–60 €',
    duration: '30 Min.',
    insurance: 'Tipp: Kombinieren Sie den Check-up mit Prophylaxe. Ein Termin – alles erledigt. Einfach beim Buchen "Vorsorge + Zahnreinigung" wählen.',
  },
};

const ALL_TYPES = Object.keys(LEISTUNGEN);

function init() {
  const type = new URLSearchParams(window.location.search).get('type') || 'prophylaxe';
  const d = LEISTUNGEN[type] || LEISTUNGEN.prophylaxe;

  // Page title
  document.getElementById('pageTitle').textContent = d.title + ' – Dr. Abokor';

  // Hero
  const hero = document.getElementById('lpHero');
  hero.style.setProperty('--lp-color', d.color);
  hero.style.setProperty('--lp-color-light', d.colorLight);

  document.getElementById('lpIcon').textContent = d.icon;
  document.getElementById('lpTitle').textContent = d.title;
  document.getElementById('lpSubtitle').textContent = d.subtitle;

  document.getElementById('lpMeta').innerHTML = d.meta.map(m =>
    `<div class="lp-meta-item"><span>${m.icon}</span>${m.label}</div>`
  ).join('');

  // Description
  document.getElementById('lpDescTitle').textContent = d.descTitle;
  document.getElementById('lpDesc').innerHTML = d.desc;

  // Steps
  document.getElementById('lpSteps').innerHTML = d.steps.map(s => `
    <div class="lp-step">
      <div class="lp-step-num" style="background:${d.color};">${s.num}</div>
      <div class="lp-step-body">
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </div>
    </div>
  `).join('');

  // Benefits
  document.getElementById('lpBenefits').innerHTML = `
    <div class="lp-benefits-grid">
      ${d.benefits.map(b => `<div class="lp-benefit-item" style="border-color:${d.colorLight};color:${d.color};">${b}</div>`).join('')}
    </div>
  `;

  // FAQ
  document.getElementById('lpFaq').innerHTML = d.faq.map((f, i) => `
    <div class="faq-item" id="faq${i}">
      <button class="faq-q" onclick="toggleFaq(${i})">
        <span>${f.q}</span>
        <span class="faq-arrow">▾</span>
      </button>
      <div class="faq-a" id="faqA${i}"><p>${f.a}</p></div>
    </div>
  `).join('');

  // Sidebar card
  document.getElementById('lbcIcon').textContent = d.icon;
  document.getElementById('lbcTitle').textContent = d.title;
  document.getElementById('lpCost').innerHTML = `
    <div class="lp-cost-main">${d.cost}</div>
    <div class="lp-cost-note">${d.costNote}</div>
  `;
  document.getElementById('lpDuration').innerHTML = `⏱ ${d.duration}`;
  document.getElementById('lpInsurance').innerHTML = `<div class="lp-ins-note">ℹ️ ${d.insurance}</div>`;

  // Booking links
  const bookUrl = `booking.html?type=${type}`;
  document.getElementById('lpBookBtn').href = bookUrl;
  document.getElementById('lpCtaBtn').href = bookUrl;

  // Other services
  document.getElementById('lpOtherList').innerHTML = ALL_TYPES
    .filter(t => t !== type)
    .map(t => {
      const o = LEISTUNGEN[t];
      return `<a href="leistung.html?type=${t}" class="lp-other-item">
        <span class="lp-other-icon" style="background:${o.colorLight};">${o.icon}</span>
        <span>${o.title}</span>
        <span class="lp-other-arrow">→</span>
      </a>`;
    }).join('');

  // Set accent color for hero
  document.documentElement.style.setProperty('--lp-hero-color', d.color);
}

function toggleFaq(i) {
  const answer = document.getElementById('faqA' + i);
  const item = document.getElementById('faq' + i);
  const isOpen = item.classList.contains('open');
  // Close all
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
