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
    instagram: 'https://instagram.com/psihologs.katrina.rozenbaha',
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
    benefits: [
      'Emociju regulācijas un stresa mazināšanas tehnikas (meditācija, vizualizācija, vadīta elpošana u.c. prakses)',
      'Pašvērtējuma un robežu stiprināšana',
      'Izdegšanas un trauksmes mazināšana',
      'Mērķu izvirzīšana un apzināšanās, kādi soļi jāveic ceļā uz tiem',
      'Emocionālais un informatīvais atbalsts grūtībās'

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
    benefits: [
      'Novērsti vai mazināti traumatiskās pieredzes simptomi',
      'Trauksmes un nomāktības intensitātes samazināšanās un vairāk miera ikdienā',
      'Iekšējās drošības sajūtas veidošana un resursu atjaunošana'
    ],
    price: '50 € / sesija',
    recommendedFor: 'Cilvēkiem, kuri piedzīvojuši traumatiska rakstura notikumus, emocionālas brūces vai hronisku trauksmi.'
  },
  {
    id: 'nodarbibas-un-lekcijas',
    title: 'Organizācijām',
    subtitle: 'Darbsemināri, lekcijas un komandas saliedēšanas pasākumi',
    tag: 'Tiešsaistē un klātienē',
    duration: 'Pēc vienošanās',
    format: 'Tiešsaistē un klātienē',
    benefits: [
      'Veselīgas savstarpējās komunikācijas un saliedētības veicināšana.',
 'Emocionālās drošības sajūtas stiprināšana komandā.',
      'Praktiski rīki stresa un izdegšanas profilaksei.',
      'Labāka darba efektivitāte gan individuāli, gan komandā.',
    ],
    price: '',
    recommendedFor: 'Uzņēmumiem, organizācijām un cilvēku grupām, kas vēlas stiprināt mentālo veselību, komandas mijiedarbību un emocionālo noturību.'
  }
];

export const APPROACH_METHODS: ApproachMethod[] = [
  {
    id: 'emdr',
    title: 'EMDR Terapija',
    description: 'Zinātniski pierādīta metode, kas ar abpusēju stimulāciju palīdz smadzenēm dabiskā veidā pārstrādāt iestrēgušas atmiņas un samazināt to ietekmi.',
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
    description: 'Shēmu terapija palīdz izprast dziļākus domāšanas, emociju un uzvedības modeļus, kas bieži veidojušies agrīnā bērnībā un var atkārtoties attiecībās, dzīves izvēlēs vai emocionālajās reakcijās.',
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
    description: 'Motivējošā intervēšana palīdz pārvarēt iekšējās šaubas, vilcināšanos un pretrunas, lai tiektos uz veselīgākiem paradumiem un/ vai atkarības (azartspēļu, alkohola, cigarešu, narkotisko vielu, t.sk. marihuānas) pārvarēšanu.',
    iconName: 'Compass',
    certificate: {
      title: 'Intervijas konsultēšanas praksē: Motivējošā intervēšana',
      number: '',
      year: '2025'
    }
  },
  {
    id: 'trauma-informed',
    title: 'Augstākā Izglītība Psiholoģijā',
    description: 'Visaptveroša psiholoģijas izglītība, kas ļauj izprast cilvēka emocionālās veselības traucējumu cēloņus un sekas. Nodrošina strukturētu, ētisku un pētījumos balstītu pieeju ikvienā konsultācijā, apvienojot klasiskās psiholoģijas teorijas ar mūsdienīgu, praktisku pieeju.',
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
    question: 'Cik gara ir kosultācija un cik bieži konsultācijām pie psihologa ir jānotiek?',
    answer: 'Vienas konsultācijas ilgums manā praksē ir 55 minūtes. Parasti konsultācijas sākumā notiek reizi nedēļā vai reizi divās nedēļās, lai procesam būtu secīgums un veidotos dziļāka sadarbība ar psihologu. Taču iespējams vienoties arī par citu biežumu, atkarībā no Tavām vēlmēm un iespējām.',
    category: 'Process'
  },
  {
    id: 'faq-3',
    question: 'Vai konsultācijas var notikt arī tiešsaistē (online)?',
    answer: 'Jā, visas konsultācijas notiek tiešsaistē, izmantojot drošu Google Meet vai MS Teams platformu. Tiešsaistes sesijas ir tikpat efektīvas kā tikšanās klātienē un arī ļauj izmantot plašu klāstu ar metodēm (EMDR, shēmu terapijas metodes u.c.).',
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
  'Cits laiks vai pieteikšanās sestdienā – raksti to man ziņā un sazināšos ar Tevi personīgi'
];

export const WORK_TOPICS: WorkTopic[] = [
  {
    id: 'trauksme-panika',
    title: 'Trauksme un panikas lēkmes',
    iconName: 'Wind'
  },
  {
    id: 'attiecibu-problemas',
    title: 'Attiecību problēmas',
    iconName: 'Users'
  },
  {
    id: 'izdeggana-stress',
    title: 'Izdegšana un stress',
    iconName: 'ZapOff'
  },
  {
    id: 'depresija-nomaktiba',
    title: 'Depresija un nomāktība',
    iconName: 'Cloud'
  },
  {
    id: 'zems-pasnovertejums',
    title: 'Zems pašnovērtējums',
    iconName: 'UserCheck'
  },
  {
    id: 'seras-zaudejumi',
    title: 'Sēras un zaudējumi',
    iconName: 'Feather'
  },
  {
    id: 'emociju-regulacija',
    title: 'Emociju regulācija un atkarības',
    iconName: 'Sliders'
  },
  {
    id: 'traumatiska-pieredze',
    title: 'Traumatiska pieredze',
    iconName: 'LifeBuoy'
  },
  {
    id: 'personiga-izaugsme',
    title: 'Personīgā izaugsme un ceļš uz mērķiem',
    iconName: 'Compass'
  }
];
