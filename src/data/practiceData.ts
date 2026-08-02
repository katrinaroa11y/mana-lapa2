import { ServiceItem, ApproachMethod, FaqItem, WorkTopic } from '../types';

export const PRACTICE_INFO = {
  name: 'Katrīna Rozenbaha',
  title: 'Reģistrēta klīniskā psiholoģe',
  registrationNumber: 'Psihologu reģistra Nr. 7001430',
  experience: '1000+ konsultētu un izglītotu klientu',
  location: 'Krišjāņa Barona iela 32, Rīga & Tiešsaistē (Google Meet / MS Teams)',
  email: 'katrina.rozenbaha@gmail.com',
  phone: '+371 27572910',
  workingHours: 'Pirmdiena - Piektdiena: 09:00 - 19:00',
  social: {
    linkedin: 'https://linkedin.com/in/katrina-rozenbaha',
    instagram: 'https://instagram.com/katrina.rozenbaha.psihologs',
    facebook: 'https://facebook.com/katrina.rozenbaha.psihologs'
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'individuala-terapija',
    title: 'Individuālas konsultācijas',
    subtitle: 'Atbalsts emocionālajai labsajūtai, sevis izpratnei un personīgo mērķu sasniegšanai',
    tag: 'Tiešsaistē',
    duration: '55 minūtes',
    format: 'Tiešsaistē',
    description: 'Droša un strukturēta vide, kurā kopīgi pētām domāšanas un uzvedības modeļus, risinām ikdienas stresa, trauksmes vai izdegšanas cēloņus, un veidojam veselīgas attiecības ar sevi un citiem.',
    benefitsTitle: 'Ieguvumi:',
    benefits: [
      'Emociju regulācijas un stresa mazināšanas tehnika (meditācija, vizualizācija u.c. prakses)',
      'Pašvērtējuma un robežu stiprināšana',
      'Izdegšanas un trauksmes mazināšana',
      'Skaidrība personīgajos un profesionālajos mērķos'
    ],
    price: '50 € / sesija',
    recommendedFor: 'Pieaugušajiem, kuri saskaras ar trauksmi, stresa vadību, dzīves krīzēm vai vēlas padziļināti iepazīt sevi.'
  },
  {
    id: 'traumas-terapija-emdr',
    title: 'EMDR terapija',
    subtitle: 'Uz pierādījumiem balstīta metode grūtu un traumatisku pieredžu apstrādei',
    tag: 'Tiešsaistē',
    duration: '55 minūtes',
    format: 'Tiešsaistē',
    description: 'EMDR (Eye Movement Desensitization and Reprocessing) ir starptautiski atzīta un zinātniski pamatota terapijas metode, kas palīdz smadzenēm **pārstrādāt neatrisinātas traumatiskas pieredzes vai PTSS** (pēctraumatskā stresa sindroma) radītos simptomus.',
    benefitsTitle: 'Ieguvumi:',
    benefits: [
      'Atviegloti simptomi un emocionāls atvieglojums',
      'Trauksmes intensitātes samazināšanās',
      'Iekšējās drošības un resursu atjaunošana'
    ],
    price: '50 € / sesija',
    recommendedFor: 'Cilvēkiem, kuri piedzīvojuši traumatiska rakstura notikumus, emocionālas brūces vai hronisku trauksmi.'
  },
  {
    id: 'nodarbibas-un-lekcijas',
    title: 'Nodarbības un lekcijas',
    subtitle: 'Izglītojošas un interaktīvas lekcijas un nodarbības',
    tag: 'Tiešsaistē un klātienē',
    duration: 'Pēc vienošanās',
    format: 'Tiešsaistē un klātienē',
    description: 'Izglītojošas un interaktīvas lekcijas un nodarbības',
    benefitsTitle: 'Ieguvumi:',
    benefits: [
      'Iegūt praktiskas metodes stresa, trauksmes un emociju regulēšanai.',
      'Labāk izprast savas emocijas, uzvedību un domāšanas modeļus.',
      'Attīstīt efektīvas komunikācijas un attiecību veidošanas prasmes.',
      'Gūt jaunas zināšanas, dalīties pieredzē un saņemt atbalstu psihologa vadītā un drošā grupas vidē.'
    ],
    price: '',
    recommendedFor: 'Uzņēmumiem, organizācijām un cilvēku grupām, kas vēlas stiprināt mentālo veselību, komandas mijiedarbību un emocionālo noturību.'
  }
];

export const APPROACH_METHODS: ApproachMethod[] = [
  {
    id: 'emdr',
    title: 'EMDR Terapija',
    shortDesc: 'Acu kustību desensibilizācija un pārapstrāde traumu un emocionālu bloku risināšanai.',
    description: 'Zinātniski pierādīta metode, kas ar abpusēju stimulāciju palīdz smadzenēm dabiskā veidā pārstrādāt iestrēgušas atmiņas un samazināt to emocionālo trauksmi.',
    iconName: 'Brain',
    certificate: {
      title: 'EMDR bāzes 1. līmeņa apmācības',
      number: '',
      year: '2024'
    }
  },
  {
    id: 'schema',
    title: 'Shēmu Terapija',
    shortDesc: 'Padziļināta uzvedības un domāšanas modeļu atpazīšana un transformācija.',
    description: 'Palīdz izprast, kāpēc atkal un atkal nonākam līdzīgās konfliktējošās situācijās vai iekšējos pārdzīvojumos, un ļauj apgūt kā pašam apmierināt savas vajadzības un kā uzlabot attiecības ar sevi un apkārtējiem cilvēkiem.',
    iconName: 'Layers',
    certificates: [
      {
        title: 'Apmācības: Attiecību izaicinājumu pārvarēšana un Veselā pieaugušā stiprināšana shēmu terapijā',
        number: '',
        year: '2026'
      },
      {
        title: 'Apmācības: Darbs ar krēsliem shēmu terapijā',
        number: '',
        year: '2025'
      },
      {
        title: 'Shēmu terapijas bāzes līmeņa apmācības',
        number: '',
        year: '2024'
      }
    ]
  },
  {
    id: 'motivational',
    title: 'Motivējošā Intervēšana',
    shortDesc: 'Iekšējās motivācijas stiprināšana un apzinātu pārmaiņu veicināšana.',
    description: 'Motivējošā intervēšana palīdz pārvarēt iekšējās šaubas, vilcināšanos un pretrunas, lai tiektos uz veselīgākiem paradumiem un/ vai atkarības pārvarēšanu. Procesā palīdzu apzināties vērtības, iekšējo motivāciju un apkārtējos resursus rīcībai.\n\nŠī pieeja ir īpaši efektīva un plaši lietota uzvedības izmaiņām, kaitīgo ieradumu un atkarību pārvarēšanai (azartspēļu, alkohola, cigarešu, narkotisko vielu, t.sk. marihuānas, un citas). Psihologa atbalsts padara pārmaiņu procesu saprotamāku, ilgtspējīgāku un mazāk stresainu.',
    iconName: 'Compass',
    certificate: {
      title: 'Intervijas konsultēšanas praksē: Motivējošā intervēšana',
      number: '',
      year: '2025'
    }
  },
  {
    id: 'trauma-informed',
    title: '**Augstākā Izglītība Psiholoģijā**',
    shortDesc: 'Visaptveroša psiholoģijas izglītība, kas ļauj izprast cilvēka emocionālās veselības traucējumu cēloņus un sekas.',
    description: 'Nodrošina strukturētu, ētisku un pētījumos balstītu pieeju ikvienā konsultācijā, apvienojot klasiskās psiholoģijas teorijas ar mūsdienīgu, praktisku pieeju.',
    iconName: 'ShieldCheck',
    certificates: [
      {
        title: 'Maģistrs psiholoģijā, Bonnas Universitāte',
        number: '',
        year: '2020-2023'
      },
      {
        title: 'Bakalaurs psiholoģijā, Latvijas Universitāte',
        number: '',
        year: '2017-2020'
      }
    ]
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Kā sagatavoties pirmajai konsultācijai?',
    answer: 'Pirmajai konsultācijai nav īpaši jāgatavojas. Svarīgākais ir vēlme aprunāties. Pirmajā tikšanās reizē mēs pārrunāsim Tavas pašreizējās grūtības un izvirzīsim mērķus kopīgajam darbam.',
    category: 'Sagatavošanās'
  },
  {
    id: 'faq-2',
    question: 'Cik gara ir viena kosultācija un cik bieži konsultācijām ir jānotiek?',
    answer: 'Vienas konsultācijas ilgums ir 55 minūtes. Parasti konsultācijas sākumā notiek reizi nedēļā vai reizi divās nedēļās, lai procesam būtu secīgums un veidotos dziļāka sadarbība ar psihologu. Taču iespējams vienoties arī par citu biežumu, atkarībā no Tavām vēlmēm un iespējām.',
    category: 'Process'
  },
  {
    id: 'faq-3',
    question: 'Vai konsultācijas var notikt arī tiešsaistē (online)?',
    answer: 'Jā, visas konsultācijas notiek tiešsaistē, izmantojot drošu Google Meet vai MS Teams platformu. Tiešsaistes sesijas ir vienlīdz efektīvas kā tikšanās klātienē.',
    category: 'Formāts'
  },
  {
    id: 'faq-4',
    question: 'Kas ir EMDR terapija un kam tā vislabāk palīdz?',
    answer: 'EMDR (Acu kustību desensibilizācija un pārapstrāde) ir uz pētījumiem balstīta psihoterapijas metode. Tā ir sevišķi efektīva pēctraumas stresa sindroma (PTSS), smagu atmiņu, fobiju, atkarību un spēcīgas trauksmes gadījumos.',
    category: 'Metodes'
  },
  {
    id: 'faq-5',
    question: 'Kāda ir konfidencialitātes kārtība un datu aizsardzība?',
    answer: 'Visa informācija, ko pārrunājam konsultācijās, ir pilnībā konfidenciāla. Strādāju saskaņā ar Latvijas Psihologu likuma, psihologu ētikas kodeksa un VDAR (GDPR) prasībām.',
    category: 'Drošība'
  },
  {
    id: 'faq-6',
    question: 'Kādi ir atcelšanas vai pārcelšanas noteikumi?',
    answer: 'Konsultāciju var bez maksas atcelt vai pārcelt, paziņojot par to vismaz 24 stundas pirms norunātā laika. Vēlākas atcelšanas gadījumā tiek lūgts apmaksāt 50% no sesijas maksas.',
    category: 'Apmaksa'
  }
];

export const TIME_SLOTS = [
  '17:30',
  '18:30',
  'Cits – sazināšos ar Tevi personīgi'
];

export const WORK_TOPICS: WorkTopic[] = [
  {
    id: 'trauksme-panika',
    title: 'Trauksme un panikas lēkmes',
    description: 'bailes, nemiers un pārmērīga raizēšanās.',
    iconName: 'Wind'
  },
  {
    id: 'attiecibu-problemas',
    title: 'Attiecību problēmas',
    description: 'konflikti, komunikācijas grūtības, šķiršanās un vientulība.',
    iconName: 'Users'
  },
  {
    id: 'izdeggana-stress',
    title: 'Izdegšana un stress',
    description: 'spēku izsīkums, hronisks nogurums un grūtības nospraust robežas.',
    iconName: 'ZapOff'
  },
  {
    id: 'depresija-nomaktiba',
    title: 'Depresija un nomāktība',
    description: 'dzīvesprieka zudums, apātija un emocionāls nogurums.',
    iconName: 'Cloud'
  },
  {
    id: 'zems-pasnovertejums',
    title: 'Zems pašnovērtējums',
    description: 'sevis pieņemšana, pašpārliecība un spēcīga iekšējā kritika un/ vai perfekcionisms.',
    iconName: 'UserCheck'
  },
  {
    id: 'seras-zaudejumi',
    title: 'Sēras un zaudējumi',
    description: 'tuvinieka zaudējums, šķiršanās vai nozīmīgas dzīves pārmaiņas.',
    iconName: 'Feather'
  },
  {
    id: 'emociju-regulacija',
    title: 'Emociju regulācija un atkarības',
    description: 'nespēja tikt galā ar dusmām un sarežģītām emocijām. Grūtības, kuras radījušas azartspēles, alkohols un citas atkarību raisošas vielas.',
    iconName: 'Sliders'
  },
  {
    id: 'traumatiska-pieredze',
    title: 'Traumatiska pieredze',
    description: 'pagātnes ievainojumi, psiholoģiskās traumas un to ietekme.',
    iconName: 'LifeBuoy'
  },
  {
    id: 'personiga-izaugsme',
    title: 'Personīgā izaugsme',
    description: 'mērķu izvirzīšana, sevis iepazīšana un dzīves kvalitātes uzlabošana.',
    iconName: 'Compass'
  }
];
