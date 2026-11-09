// Gewerke für die Live-Demo (/demo). Alle Betriebe sind erfunden und als Demo gekennzeichnet.
// Die Schlüssel müssen mit dem n8n-Workflow „Abora Demo KI“ übereinstimmen.

export interface DemoGewerk {
  key: string;
  name: string;
  betrieb: string;
  /** Startnachrichten, die der Kunde per Klick senden kann */
  beispiele: string[];
  /** Was das Beispielfoto zeigt */
  foto: string;
  /** Beispiel-Sprachnotiz nach der Besichtigung */
  notiz: string;
}

export const DEMO_GEWERKE: DemoGewerk[] = [
  {
    key: 'sanitaer',
    name: 'Sanitär und Heizung',
    betrieb: 'Musterbetrieb Sanitär & Heizung (Demo)',
    beispiele: [
      'Hallo, mein Wasserhahn in der Küche tropft seit gestern. Können Sie vorbeikommen?',
      'Unsere Heizung ist komplett ausgefallen, es ist eiskalt im Haus!',
      'Wir möchten unser Bad komplett sanieren, ca. 8 qm. Machen Sie sowas?',
    ],
    foto: 'tropfender Küchenwasserhahn, Einhebelmischer, Kalkspuren',
    notiz:
      'Küche Familie Schneider, Viernheim. Einhebelmischer tauschen, alter ist verkalkt und undicht. Kunde will einen mit Brause. Eckventile beide fest, auch tauschen. Ca. 1,5 Stunden mit zwei Leuten nein, einer reicht. Alte Armatur entsorgen.',
  },
  {
    key: 'elektro',
    name: 'Elektro',
    betrieb: 'Musterbetrieb Elektrotechnik (Demo)',
    beispiele: [
      'Guten Tag, wir hätten gerne eine Wallbox für unser E-Auto in der Garage.',
      'Bei uns fliegt ständig die Sicherung raus, sobald die Waschmaschine läuft.',
      'Wir haben einen Altbau gekauft und wollen die Elektrik erneuern lassen.',
    ],
    foto: 'Zählerschrank älterer Bauart mit Schraubsicherungen',
    notiz:
      'Garage Herr Yilmaz, Weinheim. Wallbox 11 kW, Kunde hat Wallbox noch nicht, wir sollen eine mitbringen. Leitung vom Zählerschrank ca. 18 Meter, Aufputz im Kabelkanal. Neuer FI Typ A plus Leitungsschutzschalter im Verteiler, Platz ist da. Anmeldung beim Netzbetreiber machen wir.',
  },
  {
    key: 'dach',
    name: 'Dachdecker',
    betrieb: 'Musterbetrieb Bedachungen (Demo)',
    beispiele: [
      'Nach dem Sturm gestern fehlen bei uns ein paar Ziegel und es tropft in den Dachboden!',
      'Unsere Dachrinne ist undicht und läuft bei Regen über.',
      'Wir wollen das Dach dämmen lassen und überlegen auch neue Ziegel.',
    ],
    foto: 'Dachfläche mit drei verrutschten Ziegeln, sichtbare Lattung',
    notiz:
      'EFH Familie Becker, Lampertheim. Nach Sturm ca. 12 Ziegel ersetzen, Frankfurter Pfanne, Kunde hat noch 5 Stück im Keller. First auf 3 Meter neu einmörteln bzw. trocken verlegen. Rinne vorne reinigen. Gerüst nicht nötig, geht mit Leiter und Dachhaken.',
  },
  {
    key: 'maler',
    name: 'Maler und Lackierer',
    betrieb: 'Musterbetrieb Malerfachbetrieb (Demo)',
    beispiele: [
      'Hallo, wir ziehen um und brauchen die Wohnung gestrichen, 3 Zimmer, ca. 75 qm.',
      'Können Sie auch Fassaden streichen? Unser Haus braucht dringend Farbe.',
      'Im Bad haben wir Schimmel an der Decke, was kann man da machen?',
    ],
    foto: 'Wohnzimmer mit Raufaser, Dübellöcher, leichte Gilbung an der Decke',
    notiz:
      'Wohnung Frau Wagner, Mannheim Neckarstadt. 3 Zimmer, Küche, Flur. Wände und Decken weiß, Raufaser bleibt. Ca. 210 qm Wandfläche, 75 qm Decke. Dübellöcher spachteln. Heizkörper nicht lackieren. Abdecken, Möbel sind raus. Termin Mitte nächsten Monats.',
  },
  {
    key: 'tischler',
    name: 'Tischler und Schreiner',
    betrieb: 'Musterbetrieb Schreinerei (Demo)',
    beispiele: [
      'Wir hätten gerne einen Einbauschrank unter der Dachschräge. Machen Sie sowas?',
      'Unsere Haustür klemmt und schließt nicht mehr richtig.',
      'Was würde eine Küche nach Maß ungefähr kosten?',
    ],
    foto: 'Dachschräge im Schlafzimmer, Kniestock ca. 1 Meter',
    notiz:
      'Schlafzimmer Familie Hoffmann, Heidelberg. Einbauschrank unter Schräge, Breite 3,20 m, Kniestock 1,00 m, Höhe vorne 2,30. Korpus weiß melaminbeschichtet, Fronten weiß matt lackiert, grifflos mit Push-to-open. Innen 2 Kleiderstangen, Rest Fachböden. Montage vor Ort ein Tag.',
  },
  {
    key: 'galabau',
    name: 'Garten- und Landschaftsbau',
    betrieb: 'Musterbetrieb Garten- und Landschaftsbau (Demo)',
    beispiele: [
      'Wir möchten unsere Terrasse neu machen lassen, ca. 25 qm.',
      'Können Sie unsere Hecke schneiden? Ist ca. 30 Meter lang.',
      'Wir brauchen einen neuen Zaun zum Nachbarn.',
    ],
    foto: 'alte Terrasse mit gebrochenen Waschbetonplatten',
    notiz:
      'Garten Familie Weber, Viernheim. Alte Waschbetonplatten 25 qm raus und entsorgen. Neuer Unterbau Schotter und Splitt. Feinsteinzeug 60x60 grau, Kunde hat Muster gesehen. Randsteine an zwei Seiten, ca. 10 Meter. Leichtes Gefälle vom Haus weg.',
  },
  {
    key: 'fliesen',
    name: 'Fliesenleger',
    betrieb: 'Musterbetrieb Fliesen (Demo)',
    beispiele: [
      'Wir wollen im Bad neue Fliesen, Boden und Wände, ca. 7 qm Boden.',
      'Bei uns ist in der Küche eine Fliese gesprungen, können Sie die tauschen?',
      'Machen Sie auch bodengleiche Duschen?',
    ],
    foto: 'Badezimmer mit 90er-Jahre-Fliesen, Fugen dunkel verfärbt',
    notiz:
      'Bad Herr Klein, Mannheim Lindenhof. Altfliesen Boden 7 qm und Wand 24 qm raus. Untergrund prüfen, Abdichtung im Duschbereich neu. Boden Feinsteinzeug 60x60, Wand 30x60 weiß. Wanne bleibt, wird von anderem Betrieb geliefert. Silikonfugen neu.',
  },
  {
    key: 'allgemein',
    name: 'Handwerk allgemein',
    betrieb: 'Musterbetrieb Handwerk (Demo)',
    beispiele: [
      'Hallo, wir bräuchten mal einen Handwerker für ein paar Reparaturen im Haus.',
      'Können Sie sich nächste Woche etwas bei uns anschauen?',
      'Was kostet bei Ihnen eine Stunde?',
    ],
    foto: 'Schadstelle im Flur, Putz an der Wand abgeplatzt',
    notiz:
      'Haus Familie Schulz, Viernheim. Flur: Putzschaden ca. 1 qm ausbessern und streichen. Gäste-WC: Spülkasten läuft nach, Innenleben tauschen. Garage: Tor klemmt, Laufschienen reinigen und einstellen. Insgesamt ca. ein halber Tag.',
  },
];
