export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  dateISO: string;
  readTime: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
    }[];
    keyTakeaways?: string[];
    quote?: string;
    conclusion: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'emdr-terapija-ka-ta-palidz-traumu-gadijumos',
    title: 'EMDR terapija: Kā tā palīdz apstrādāt traumas un samazināt trauksmi?',
    author: 'Katrīna Rozenbaha',
    date: '2026. gads',
    dateISO: '2026-05-15',
    readTime: '5 min lasījums',
    category: 'EMDR & Traumu terapija',
    excerpt: 'EMDR jeb desensibilizācija un pārstrāde ar acu kustībām ir viena no zinātniski visvairāk pētītajām un efektivākajām metodēm traumu un trauksmes mazināšanā.',
    featuredImage: '/blog_emdr_therapy.jpg',
    content: {
      intro: 'Daudzi cilvēki gadiem ilgi nes smagu pagātnes notikumu vai hroniskas trauksmes nastu, nemaz neapzinoties, ka smadzenes ir "iestrēgušas" traumas brīdī. EMDR (Eye Movement Desensitization and Reprocessing) terapija nodrošina strukturētu pieeju, kas palīdz smadzenēm dabiski pārstrādāt neatrisinātās atmiņas.',
      sections: [
        {
          heading: 'Kā darbojas EMDR metode?',
          body: 'Spēcīga vai traumatiska pārdzīvojuma laikā mūsu smadzenes var tikt pārslogotas, un dabiskais informācijas apstrādes process apstājas. EMDR metodes pamatā ir abpusēja jeb bilaterālā stimulācija: visbiežāk tās ir ritmiskas acu kustības, skaņas signāli vai viegli pieskārieni, kas pārmaiņus aktivizē labo un kreiso smadzeņu puslodi. Šis process atgādina to, kas dabiski notiek smadzenēs miega ātrajā (REM) fāzē, un palīdz smadzenēm drošā veidā "pārstrādāt" iestrēgušās atmiņas un emocijas.'
        },
        {
          heading: 'Kādos gadījumos EMDR ir piemērota metode?',
          body: `EMDR terapija ir piemērota cilvēkiem, kuri ir piedzīvojuši dažāda veida traumatisku pieredzi - gan vienu īpaši smagu notikumu, gan ilgstoši uzkrājušās negatīvas pieredzes. Traumatiskas pieredzes ir piemēram, fiziska vai emocionāla vardarbības, bullings un mobings, nelaimes gadījumi, pieredzēti militāri konflikti, dabas katastrofas un tuva cilvēka pēkšņs zaudējums. EMDR terapija var būt arī noderīga cilvēkiem, kuri ilgstoši piedzīvojuši emocionālu nolaidību no vecāku puses bērnībā (vecāki nebija klāt, atstāja ilgstoši vienu tam nepiemērotā vecumā, nereaģēja uz bērna vajadzībām). Un tomēr, EMDR der ne tikai traumu sekām. Šīs metodes efektivitāte ir pētīta plašam spektram grūtību, un var būt palīdzoša arī fobijām, izdegšanai, zemam pašvērtējumam un citiem psiholoģiskās veselības apgrūtinājumiem.

Un tomēr, ne katram cilvēkam pēc traumatiskas pieredzes attīstās trauksme, izteiktas bailes vai PTSS un ne katram EMDR ir vispiemērotākā metode. Konsultācijas laikā psihologs un klients kopīgi izvērtē, vai EMDR ir piemērota metode konkrētajā situācijā, ņemot vērā cilvēka pieredzi, vajadzības, vērtības un individuālās īpašības.`
        },
        {
          heading: 'Ko gaidīt no pirmās EMDR sesijas?',
body: 'Sākotnējās sesijās psihologs uzmanīgi izvērtē klienta grūtības un simptomus, veido drošības sajūtu un apzina pieejamos resursus. Tikai tad, kad klients jūtas pilnībā droši un sagatavots, tiek uzsākts pārstrādes darbs. Reizēm cilvēki baidās no traumas pārstrādes, domājot, ka būs nepieciešams detalizēti izstāstīt katru traumatiskā notikuma detaļu. Tomēr EMDR terapijā nav atkārtoti jāizdzīvo vai jāapraksta visa traumatiskā pieredze, jo terapijas pamatā ir smadzeņu dabiskā informācijas pārstrādes sistēma un abpusēja stimulācija, kas palīdz sāpīgām atmiņām pakāpeniski zaudēt savu emocionālo intensitāti un kļūt par pagātnes daļu. Rezultātā tiek mazināta vai pavisam novērsta traumas ietekme un dzīves kvalitāte uzlabojās.'        }
      ],
      keyTakeaways: [
        'EMDR ir zinātniski pierādīta un Starptautiskās Veselības Organizācijas (PVO) atzīta metode.',
        'Pārstrādes procesā izmaiņas notiek gan emocionālā, gan fizioloģiskā līmenī.',
        'Klienti bieži izjūt atvieglojumu jau pēc pirmajām mērķtiecīgajām sesijām.'
      ],
      quote: 'Smadzenēm piemīt dabisks tieksme uz dziedināšanos – EMDR terapija vienkārši atver durvis šim procesam.',
      conclusion: 'Ja jūtat, ka pagātnes pieredzes turpina ietekmēt Jūsu pašreizējo ikdienu, attiecības vai pašsajūtu, EMDR var būt drošs un efektīvs ceļš uz atbrīvošanos un atkalredzēšanos ar savu iekšējo mieru.'
    }
  },
  {
    id: '2',
    slug: 'izdegsana-un-stresa-vadiba-ikdiena',
    title: 'Kā atpazīt izdegšanas pirmās pazīmes un laicīgi atgūt līdzsvaru',
    author: 'Katrīna Rozenbaha',
    date: '2026. gads',
    dateISO: '2026-04-02',
    readTime: '6 min lasījums',
    category: 'Stresa vadība & Izdegšana',
    excerpt: 'Izdegšana nenotiek vienā dienā. Tā ir pakāpeniska emocionāla un fiziska spēku izsīkšana. Uzziniet galvenos signālus un praksē pārbaudītus soļus, lai atlabtu.',
    featuredImage: '/blog_burnout_prevention.jpg',
    content: {
      intro: 'Mūsdienu steidzīgajā ritmā <b>liels darba apjoms un nemitīgas prasības</b> bieži tiek uztvertas kā norma. Tomēr, kad hronisks stress paliek nepamanīts, organisms sāk sūtīt nopietnus trauksmes signālus un sāk parādītes trauksme, nomāktība un fizisks bezspēks. Izdegšanas pazīmju laicīga pamanīšana un profilakse ir atslēga uz ilgtspējīgu veselību un darba sparu.',
      sections: [
        {
          heading: 'Biežākie izdegšanas simptomi',
          body: `<b>Izdegšana nenotiek vienā dienā</b>. Tā ir lēna, gandrīz nepamanāma virzība no ikdienišķa noguruma līdz pilnīgam spēku izsīkumam. Visbiežāk mēs ignorējam pirmos brīdinājuma signālus, norakstot tos uz "smagu darba nedēļu" vai negulētu nakti, taču jāpatur prātā, ka tieši sākuma stadijā izdegšanu atpazīstot, to ir visvieglāk apturēt. Šeit ir apkopotas galvenās <b>agrīnās pazīmes</b>, kurām vērts pievērst uzmanību, iekams organisms nav pieprasījis piespiedu pārtraukumu:
            1. Grūtības koncentrēties
            2. Nespēja pabeigt iesākto
            3. Grūtības pieņemt lēmumus
            4. Neveselīgu ieradumu pieaugums (palielinās, piemēram, neveselīgu ēdienu, alkohola, tabakas izstrādājumu vai ekrānu patēriņš)
            5. Nevēlēšanās iet uz darbu
            6. Biežāka slimošana
            7. Vēlme izolēties
            8. Paātrināta sirdsdarbība
            9. Miega traucējumi (piemēram, grūtības iemigt, bieža mošanās nakts laikā vai sajūta, ka neesi izgulējies no rīta pat pēc 8-9 stundu miega).
            10. Emociju izmaiņas - cilvēks sāk just vairāk cinisma, biežāku nomāktību, lielāku aizkaitināmību vai izteiktāku motivācijas trūkumu.
            `
        },
        {
          heading: 'Kāpēc maza atpūta vai atvaļinājums izdegšanai nepalīdz?',
          body: `Ja izdegšanu izraisa dziļāki domāšanas modeļi (piemēram, perfekcionisms, nespēja atteikt citiem cilvēkiem vai bailes no kļūdām), ar divām brīvdienām nebūs līdzēts. Ir svarīgi pārskatīt personības iezīmes un personīgās robežas. Iespējams, ka zema pašvērtējuma dēļ, netiek sev ļauts atteikt uzdevumiem, pienākumiem ģimenē un darbā, kā arī netiek lūgta palīdzība. Tā pienākumu nasta nemitīgi krājas. Tādēļ neliela atpūta vai divas brīvas nedēļas nepalīdzēs, jo tās nemainīs pierastos domāšanas modeļus un pārliecības par sevi un pasauli. Atgriežoties no atpūtas, turpinot darīt visu kā parasti - pāri saviem spēkiem, domājot tikai par citu vajadzībām -, ātri vien notiek atgriešanās pie iepriekšējā izsīkuma stāvokļa. Tādēļ līdztekus atvaļinājumam vai brīvdienām jādod vieta dziļākam darbam ar jautājumiem ''Kas man liek izdegt?'' un ''Kā es varu sev palīdzēt nospraust robežas ar darbu vai apkārtējiem cilvēkiem?''. `
        },
        {
          heading: '3 praktiski soļi stresa līmeņa mazināšanai šodien',
          body: '1. Ievies mazas pauzes darba dienā (jau 5 minūšu pastaiga un 2 minūtes apzinātas elpošanas ik pēc stundas var radīt pārmaiņas).\n2. Definē skaidru robežu starp darba laiku un privāto dzīvi. Pat ja tavs amats prasa būt sasniedzamam arī ārpus parastā darba laika, ir svarīgi nospraust robežas, kas pasargā tavu mieru un veselību. Piemēram, nodalīt darba tālruni no personīgā vai noteikt konkrētus laika logus, kuros vakaros un brīvdienās neesi pieejams telefoniski (tajā laikā klients un kolēģis var rakstīt e-pastus). \n3. Praktizē līdzjūtību pret sevi un atzīsti sev, ka cilvēkiem nav iespējams būt ideāliem un nevajag izdarīt visu perfekti. Reizēm arī pietiekami labi ir labākais iespējamais rezultāts. '
        }
      ],
      keyTakeaways: [
        'Izdegšana ir oficiāli atzīta medicīniska diagnoze (SSK-11), nevis slinkums.',
        'Savlaicīga vēršanās pie speciālista novērš ilgstošu darbaspēju un dzīvesprieka zudumu.',
        'Darbs ar savām robežām un prioritātēm ir labākais ieguldījums ilgtermiņa veselībā.'
      ],
      quote: 'Jūs nevarat ieliet no tukšas krūzes – parūpēšanās par sevi nav greznība, bet gan nepieciešamība.',
      conclusion: 'Ja jūtat, ka paša spēkiem kļūst grūti tikt galā ar ikdienas slodzi, psihologa konsultācija var sniegt drošu telpu stresa cēloņu izpratnei un praktisku stratēģiju izstrādei.'
    }
  },
  {
    id: '3',
    slug: 'shemu-terapija-izprast-savus-uzvedibas-paternus',
    title: 'Shēmu terapija: Kāpēc mēs atkal un atkal pieļaujam tās pašas kļūdas?',
    author: 'Katrīna Rozenbaha',
    date: '2026. gads',
    dateISO: '2026-02-18',
    readTime: '7 min lasījums',
    category: 'Shēmu terapija',
    excerpt: 'Vai kādreiz esi pamanījis, ka atkal un atkal nonāc līdzīgās konfliktsituācijās vai izvēlies līdzīgus partnerus? Shēmu terapija palīdz izprast šos neapzinātos uzvedības modeļus.',
    featuredImage: '/blog_schema_therapy_and_relationship_advice.jpg',
    content: {
      intro: 'Shēmu terapija ir psihoterapijas pieeja. Tā ir īpaši izstrādāta, lai strādātu ar dziļi iesakņotiem un traucējošiem uzvedības modeļiem.',
      sections: [
        {
          heading: 'Agrīnās shēmas',
          body: 'Shēmas veidojas bērnībā, kad kāda no mūsu pamatvajadzībām (drošība, mīlestība, pieņemšana, autonomija) nav tikusi pietiekami apmierināta. Pieaugušā vecumā šīs shēmas var aktivizēties līdzīgās situācijās, liekot mums reaģēt neproporcionāli vai kaitējot pašam. Tas notiek neapzināti, tāpēc ir grūti mainīt šos modeļus bez darba ar speciālistu, kurš palīdz paskatīties no malas.' 
        },
        {
          heading: 'Biežāk sastopamās shēmas',
          body: 'Pie biežākajām shēmām pieder Pamestība / Nestabilitāte (bailes, ka mīļotais cilvēks pametīs), Emocionālā deprivācija (sajūta, ka neviens Tevi pa īstam nesaprot) un Perfekcionisms (nepārtraukta spriedze un tiekšanās būt ideālam).'
        },
        {
          heading: 'Kā shēmu terapija palīdz ieviest pārmaiņas?',
          body: 'Terapijas laikā klients mācās atpazīt savus shēmu režīmus, dziedināt ievainoto iekšējo bērnu un attīstīt spēcīgāku Veselīgā pieaugušā daļu. Rezultātā cilvēks var parūpēties par savām vajadzībām veselīgā veidā un pārraut neveselīgos modeļus.'
        }
      ],
      keyTakeaways: [
        'Shēmas nav Jūsu vaina – tās bija adaptīvs veids, kā bērnībā tikt galā ar grūtībām.',
        'Atpazīšana ir pirmais solis uz apzinātu izvēļu izdarīšanu pieaugušo dzīvē.',
        'Shēmu terapija sniedz dziļas, paliekošas izmaiņas personības un attiecību līmenī.'
      ],
      quote: 'Apzinoties savas shēmas, mēs pārejam no automātiskas reakcijas uz apzinātu brīvību izvēlēties.',
      conclusion: 'Shēmu terapija piedāvā struktūru un atbalstu, lai atbrīvotos no veciem domāšanas slazdiem un veidotu pilnvērtīgas, piepildītas attiecības ar sevi un citiem.'
    }
  }
];
