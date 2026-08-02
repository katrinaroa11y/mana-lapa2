import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { PRACTICE_INFO } from '../data/practiceData';
import { renderFormattedText } from '../utils/formatText';

const DEFAULT_PORTRAIT = '/katrina.png';
const STORAGE_KEY = 'katrina_custom_about_portrait';
const TEXT_STORAGE_KEY = 'katrina_about_text_v3';

const DEFAULT_ABOUT_TEXT = `**Mani sauc Katrīna Rozenbaha**, un es esmu **reģistrēta klīniskā psiholoģe**. Savā praksē esmu sniegusi atbalstu **vairāk nekā 1000 cilvēkiem**, konsultējot individuāli un vadot izglītojošas lekcijas par mentālo veselību un personīgo izaugsmi.

Mani veidojusi ir gan starptautiskā izglītība un pieredze Vācijā, gan miers un vienkāršība, kurā esmu uzaugusi lauku viensētā Kurzemē. Šis savienojums man ļauj saglabāt augstus profesionālos standartus, vienlaikus paliekot patiesi klātesošai, empātiskai un "ar kājām uz zemes".

Es ticu, ka ikvienā cilvēkā ir spēks un resurss pārvarēt grūtības, taču dažkārt to ir grūti saskatīt vienatnē. Mans mērķis ir radīt **drošu un atbalstošu vidi**, kurā kopā varam izprast notiekošo, atklāt stiprās puses un rast ceļu uz pārmaiņām.

**Mans mērķis ir palīdzēt Tev labāk izprast sevi, stiprināt psiholoģisko noturību un veidot dzīvi, kurā jūties līdzsvarotāk, pašpārliecinātāk un tuvāk sev.**`;

export const AboutSection: React.FC = () => {
  const [portraitSrc, setPortraitSrc] = useState<string>(DEFAULT_PORTRAIT);

  const [aboutText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(TEXT_STORAGE_KEY);
      if (saved) return saved;
    } catch (e) {
      console.error('Kļūda ielādējot Par mani tekstu:', e);
    }
    return DEFAULT_ABOUT_TEXT;
  });

  useEffect(() => {
    const updateFromStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPortraitSrc(saved);
      } else {
        setPortraitSrc(DEFAULT_PORTRAIT);
      }
    };

    updateFromStorage();
    window.addEventListener('about-portrait-updated', updateFromStorage);
    window.addEventListener('storage', updateFromStorage);

    return () => {
      window.removeEventListener('about-portrait-updated', updateFromStorage);
      window.removeEventListener('storage', updateFromStorage);
    };
  }, []);

  const paragraphs = aboutText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="par-mani" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] relative overflow-hidden">
      {/* Soft background shape */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAF8F2] rounded-full filter blur-3xl pointer-events-none -mr-20 -mt-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#8BA983] font-semibold mb-3">
            <span>Par mani</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3E4950] font-normal leading-tight">
            Empātisks un profesionāls psihologa atbalsts.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Credentials Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame border */}
              <div className="absolute -inset-4 rounded-3xl bg-[#E8E1D8]/60 transform -rotate-2" />
              <div className="absolute -inset-2 rounded-3xl bg-[#A8C3A1]/30 transform rotate-1" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E8E1D8] bg-[#FAF8F2] group">
                <img
                  src={portraitSrc}
                  alt="Katrīna Rozenbaha, klīniskā psiholoģe"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[520px] aspect-[3/4] transition-transform duration-500 group-hover:scale-[1.01]"
                />

                {/* Floating Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel shadow-sm border border-[#E8E1D8]/80">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#A8C3A1] text-white flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#3E4950]">
                        Katrīna Rozenbaha
                      </h4>
                      <p className="text-xs text-[#5E6A71]">
                        {PRACTICE_INFO.registrationNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Introduction Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-[#5E6A71] relative"
          >
            {/* Formatted Text Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5E6A71]">
              {paragraphs.map((para, idx) => (
  <p key={idx}>
    {idx === 4 ? (
      <>
        Konsultācijās izmantoju{" "}
        <strong>zinātniski pamatotas metodes</strong>, par to vairāk lasi{" "}
        <a
          href="#pieeja"
          className="text-[#8BA983] underline hover:text-[#6F8F67]"
        >
          šeit
        </a>
        . Es ticu, ka vislabākā konsultēšana būs tā, kura ir pielāgota katra cilvēka unikālajai pieredzei un vajadzībām.
      </>
    ) : (
      renderFormattedText(para)
    )}
  </p>
))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
