import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Camera, Upload, RotateCcw, Edit3, X, Check, Trash2 } from 'lucide-react';
import { PRACTICE_INFO } from '../data/practiceData';
import { renderFormattedText } from '../utils/formatText';

const DEFAULT_PORTRAIT = '/src/assets/images/katrina_portrait_new_1785158518562.jpg';
const STORAGE_KEY = 'katrina_custom_about_portrait';
const TEXT_STORAGE_KEY = 'katrina_about_text_v2';

const DEFAULT_ABOUT_TEXT = `**Mani sauc Katrīna Rozenbaha**, un es esmu **reģistrēta klīniskā psiholoģe**. Savā praksē esmu palīdzējusi jau **vairāk nekā 1000 cilvēkiem**, konsultējot individuāli un vadot izglītojošas lekcijas par mentālo veselību un personīgo izaugsmi.

Es ticu, ka ikvienā cilvēkā ir spēks un resurss pārvarēt grūtības, taču dažkārt to ir grūti saskatīt vienatnē. Mans mērķis ir radīt **drošu un atbalstošu vidi**, kurā kopā varam izprast notiekošo, atklāt stiprās puses un rast ceļu uz pārmaiņām.

Savā darbā ievēroju **traumas informētu pieeju**, kas nozīmē, ka izprotu psiholoģiskās traumas ietekmi uz cilvēka emocijām, domāšanu un uzvedību, kā arī pielāgoju konsultāciju procesu, lai tas būtu drošs un neradītu atkārtotu traumatizāciju.

Konsultācijās izmantoju **zinātniski pamatotas metodes**, tostarp **EMDR**, **shēmu terapiju**, **motivējošo intervēšanu**, **NET** un citas. Es ticu, ka vislabākā konsultēšana būs tā, kura ir pielāgota katra cilvēka unikālajai pieredzei un vajadzībām.

**Mans mērķis ir palīdzēt Tev labāk izprast sevi, stiprināt psiholoģisko noturību un veidot dzīvi, kurā jūties līdzsvarotāk, pašpārliecinātāk un tuvāk sev.**`;

export const AboutSection: React.FC = () => {
  const [portraitSrc, setPortraitSrc] = useState<string>(DEFAULT_PORTRAIT);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const [aboutText, setAboutText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(TEXT_STORAGE_KEY);
      if (saved) return saved;
    } catch (e) {
      console.error('Kļūda ielādējot Par mani tekstu:', e);
    }
    return DEFAULT_ABOUT_TEXT;
  });

  const [isEditingText, setIsEditingText] = useState<boolean>(false);
  const [tempText, setTempText] = useState<string>('');

  useEffect(() => {
    const updateFromStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPortraitSrc(saved);
        setIsCustom(true);
      } else {
        setPortraitSrc(DEFAULT_PORTRAIT);
        setIsCustom(false);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPortraitSrc(result);
        setIsCustom(true);
        localStorage.setItem(STORAGE_KEY, result);
        window.dispatchEvent(new Event('about-portrait-updated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPortraitSrc(DEFAULT_PORTRAIT);
    setIsCustom(false);
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('about-portrait-updated'));
  };

  const openTextEditModal = () => {
    setTempText(aboutText);
    setIsEditingText(true);
  };

  const closeTextEditModal = () => {
    setIsEditingText(false);
    setTempText('');
  };

  const handleSaveText = (e: React.FormEvent) => {
    e.preventDefault();
    setAboutText(tempText);
    try {
      localStorage.setItem(TEXT_STORAGE_KEY, tempText);
    } catch (err) {
      console.error('Kļūda saglabājot tekstu:', err);
    }
    closeTextEditModal();
  };

  const handleResetText = () => {
    setAboutText(DEFAULT_ABOUT_TEXT);
    try {
      localStorage.removeItem(TEXT_STORAGE_KEY);
    } catch (err) {
      console.error('Kļūda dzēšot tekstu:', err);
    }
    closeTextEditModal();
  };

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

              {/* Main Image Container with Upload Overlay */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E8E1D8] bg-[#FAF8F2] group">
                <img
                  src={portraitSrc}
                  alt="Katrīna Rozenbaha, klīniskā psiholoģe"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[520px] aspect-[3/4] transition-transform duration-500 group-hover:scale-[1.01]"
                />

                {/* Upload Button Overlay */}
                <label 
                  htmlFor="photo-upload-input" 
                  className="absolute top-4 right-4 bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#3E4950] px-3 py-2 rounded-full text-xs font-medium border border-[#E8E1D8] shadow-sm flex items-center space-x-1.5 cursor-pointer backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                  title="Augšupielādēt savu īsto fotogrāfiju"
                >
                  <Camera className="w-3.5 h-3.5 text-[#8BA983]" />
                  <span>{isCustom ? 'Mainīt foto' : 'Augšupielādēt savu foto'}</span>
                </label>

                {isCustom && (
                  <button
                    onClick={handleResetImage}
                    className="absolute top-4 left-4 bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#8C4A4A] px-2.5 py-1.5 rounded-full text-xs font-medium border border-[#E8E1D8] shadow-sm flex items-center space-x-1 cursor-pointer backdrop-blur-md transition-all hover:scale-105"
                    title="Atjaunot sākotnējo"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="hidden sm:inline">Atjaunot</span>
                  </button>
                )}

                <input
                  id="photo-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Floating Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel shadow-sm border border-[#E8E1D8]/80">
                  <div className="flex items-center justify-between">
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

                    <label 
                      htmlFor="photo-upload-input"
                      className="cursor-pointer text-[#8BA983] hover:text-[#3E4950] transition-colors p-1"
                      title="Nomainīt foto"
                    >
                      <Upload className="w-4 h-4" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Quick Helper Note for Uploading */}
              <div className="mt-2 text-center">
                <label 
                  htmlFor="photo-upload-input"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#8BA983] hover:text-[#3E4950] font-medium cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Klikšķiniet šeit, lai ielādētu savu fotogrāfiju</span>
                </label>
              </div>


            </div>
          </motion.div>

          {/* Right Column: Editable Introduction Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-[#5E6A71] relative"
          >
            {/* Edit Button Header */}
            <div className="flex items-center justify-end pb-2 border-b border-[#E8E1D8]/60">
              <button
                onClick={openTextEditModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#8BA983] hover:text-[#3E4950] bg-[#FAF8F2] hover:bg-[#E8E1D8]/60 border border-[#E8E1D8] rounded-xl transition-all shadow-2xs cursor-pointer"
                title="Labot 'Par mani' apraksta tekstu"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Labot tekstu</span>
              </button>
            </div>

            {/* Formatted Text Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5E6A71]">
              {paragraphs.map((para, idx) => (
                <p key={idx}>
                  {renderFormattedText(para)}
                </p>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Edit "Par mani" Text Modal */}
      <AnimatePresence>
        {isEditingText && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E4950]/40 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#E8E1D8] rounded-2xl p-6 max-w-2xl w-full shadow-xl relative my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D8]">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#8BA983]" />
                  <h3 className="font-serif text-lg text-[#3E4950] font-medium">
                    Labot "Par mani" apraksta tekstu
                  </h3>
                </div>
                <button
                  onClick={closeTextEditModal}
                  className="p-1 rounded-lg text-[#7E8C94] hover:text-[#3E4950] hover:bg-[#FAF8F2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveText} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5E6A71] mb-1">
                    Apraksta teksts (izmanto divas jaunas rindas starp rindkopām, un **treknraksts** izcelšanai)
                  </label>
                  <textarea
                    rows={12}
                    value={tempText}
                    onChange={(e) => setTempText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] leading-relaxed focus:outline-hidden focus:border-[#8BA983] font-sans"
                  />
                </div>

                <div className="pt-3 border-t border-[#E8E1D8] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleResetText}
                    className="px-3.5 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Atjaunot sākotnējo</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={closeTextEditModal}
                      className="px-4 py-2 rounded-xl border border-[#E8E1D8] text-xs font-medium text-[#5E6A71] hover:bg-[#FAF8F2] cursor-pointer"
                    >
                      Atcelt
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#8BA983] text-white text-xs font-semibold hover:bg-[#789670] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Saglabāt</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
