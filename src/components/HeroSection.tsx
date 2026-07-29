import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowDown, ShieldCheck, HeartHandshake, Award, Camera, RotateCcw, Move, Check, X } from 'lucide-react';

const DEFAULT_PORTRAIT = '/src/assets/images/katrina_portrait_new_1785158518562.jpg';
const STORAGE_KEY = 'katrina_custom_hero_portrait';
const POSITION_STORAGE_KEY = 'katrina_hero_portrait_position_v1';

interface PhotoPosition {
  x: number;
  y: number;
  zoom: number;
}

const DEFAULT_POSITION: PhotoPosition = { x: 50, y: 50, zoom: 100 };

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [portraitSrc, setPortraitSrc] = useState<string>(DEFAULT_PORTRAIT);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const [photoPos, setPhotoPos] = useState<PhotoPosition>(() => {
    try {
      const saved = localStorage.getItem(POSITION_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Kļūda ielādējot foto pozīciju:', e);
    }
    return DEFAULT_POSITION;
  });

  const [isEditingPos, setIsEditingPos] = useState<boolean>(false);
  const [tempPos, setTempPos] = useState<PhotoPosition>(DEFAULT_POSITION);

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

      const savedPos = localStorage.getItem(POSITION_STORAGE_KEY);
      if (savedPos) {
        try {
          setPhotoPos(JSON.parse(savedPos));
        } catch (e) {
          console.error(e);
        }
      }
    };

    updateFromStorage();
    window.addEventListener('hero-portrait-updated', updateFromStorage);
    window.addEventListener('storage', updateFromStorage);

    return () => {
      window.removeEventListener('hero-portrait-updated', updateFromStorage);
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
        window.dispatchEvent(new Event('hero-portrait-updated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPortraitSrc(DEFAULT_PORTRAIT);
    setIsCustom(false);
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('hero-portrait-updated'));
  };

  const openPositionModal = () => {
    setTempPos({ ...photoPos });
    setIsEditingPos(true);
  };

  const closePositionModal = () => {
    setIsEditingPos(false);
  };

  const handleSavePosition = (e: React.FormEvent) => {
    e.preventDefault();
    setPhotoPos(tempPos);
    try {
      localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(tempPos));
    } catch (err) {
      console.error('Kļūda saglabājot foto pozīciju:', err);
    }
    closePositionModal();
  };

  const handleResetPosition = () => {
    const resetVal = { x: 50, y: 50, zoom: 100 };
    setPhotoPos(resetVal);
    setTempPos(resetVal);
    try {
      localStorage.removeItem(POSITION_STORAGE_KEY);
    } catch (err) {
      console.error('Kļūda dzēšot foto pozīciju:', err);
    }
    closePositionModal();
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F2]">
      {/* Background Image Container with Soft Ambient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/images/calming_hero_bg_1785157949576.jpg"
          alt="Mierīgs un atbalstošs fons"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 scale-105 transform transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2]/80 via-[#FAF8F2]/60 to-[#FAF8F2]" />
      </div>

      {/* Subtle Leaf Decorative Background Accents */}
      <div className="absolute top-1/4 left-5 w-72 h-72 bg-[#A8C3A1]/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E8E1D8]/40 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Therapist Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#E8E1D8] px-4 py-2 rounded-full shadow-2xs mb-5 text-xs sm:text-sm text-[#5E6A71]"
        >
          <span className="font-medium">Katrīnas Rozenbahas psiholoģijas privātprakse</span>
          <span className="text-[#E8E1D8]">•</span>
          <span className="text-[#7E8C94] font-normal">Tiešsaistē</span>
        </motion.div>

        {/* Small Circular Profile Avatar with Photo Upload & Position Adjustment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="flex flex-col items-center justify-center mb-5"
        >
          <div className="relative group">
            <div className="relative rounded-full p-1 bg-gradient-to-tr from-[#A8C3A1] via-[#E8E1D8] to-[#8BA983] shadow-md hover:shadow-lg transition-all transform hover:scale-[1.03]">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#FFFFFF] bg-[#FAF8F2] relative">
                <img
                  src={portraitSrc}
                  alt="Katrīna Rozenbaha"
                  referrerPolicy="no-referrer"
                  style={{
                    objectFit: 'cover',
                    objectPosition: `${photoPos.x}% ${photoPos.y}%`,
                    transform: `scale(${photoPos.zoom / 100})`,
                    transformOrigin: `${photoPos.x}% ${photoPos.y}%`,
                  }}
                  className="w-full h-full transition-all duration-150"
                />
              </div>

              {/* Upload Badge Icon (Bottom Right) */}
              <label 
                htmlFor="hero-avatar-upload"
                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#8BA983] text-white shadow-sm hover:bg-[#3E4950] transition-colors border border-white cursor-pointer"
                title="Augšupielādēt savu foto"
              >
                <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </label>

              {/* Position Edit Badge Icon (Bottom Left) */}
              <button
                type="button"
                onClick={openPositionModal}
                className="absolute bottom-0 left-0 p-2 rounded-full bg-[#FFFFFF] text-[#5E6A71] shadow-sm hover:text-[#8BA983] hover:bg-[#FAF8F2] transition-colors border border-[#E8E1D8] cursor-pointer"
                title="Pielāgot foto pozīciju rāmī"
              >
                <Move className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            <input
              id="hero-avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-2.5">
            <button 
              type="button"
              onClick={() => document.getElementById('hero-avatar-upload')?.click()}
              className="text-xs text-[#8BA983] font-medium cursor-pointer hover:underline flex items-center gap-1"
            >
              <Camera className="w-3 h-3" />
              <span>Augšupielādēt foto</span>
            </button>
            <span className="text-xs text-[#E8E1D8]">•</span>
            <button 
              type="button"
              onClick={openPositionModal}
              className="text-xs text-[#5E6A71] hover:text-[#8BA983] font-medium cursor-pointer hover:underline flex items-center gap-1"
            >
              <Move className="w-3 h-3 text-[#8BA983]" />
              <span>Pielāgot pozīciju</span>
            </button>
            {(isCustom || photoPos.x !== 50 || photoPos.y !== 50 || photoPos.zoom !== 100) && (
              <>
                <span className="text-xs text-[#E8E1D8]">•</span>
                <button
                  type="button"
                  onClick={(e) => {
                    handleResetImage(e);
                    handleResetPosition();
                  }}
                  className="text-xs text-[#8C4A4A] hover:underline flex items-center gap-1 cursor-pointer"
                  title="Atjaunot sākotnējo foto un pozīciju"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Atjaunot</span>
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#3E4950] tracking-tight leading-[1.15] mb-6"
        >
          Palīdzu radīt <br className="hidden sm:inline" />
          <span className="relative inline-block italic text-[#8BA983] font-normal">
            paliekošas pārmaiņas.
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#A8C3A1]/40"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0,7 C30,12 70,2 100,7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle / Intro Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-[#5E6A71] font-normal max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Vide, kurā apvienojas iejūtīgs atbalsts, konfidencialitāte un zinātnē balstītas pieejas.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            id="hero-booking-cta"
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-3.5 px-7 rounded-full font-medium text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-5 h-5" />
            <span>Pieteikties konsultācijai</span>
          </button>

          <a
            href="#par-mani"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('par-mani');
              if (el) {
                const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#E8E1D8] text-[#5E6A71] hover:text-[#3E4950] py-3.5 px-7 rounded-full font-medium text-base transition-all shadow-2xs hover:shadow-xs"
          >
            <span>Vairāk par mani</span>
            <ArrowDown className="w-4 h-4 text-[#8BA983]" />
          </a>
        </motion.div>

        {/* Key Trust Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-[#E8E1D8]/70"
        >
          <div className="flex items-center justify-center space-x-3 p-3 rounded-2xl bg-[#FFFFFF]/60 backdrop-blur-xs border border-[#E8E1D8]/50">
            <ShieldCheck className="w-5 h-5 text-[#8BA983] shrink-0" />
            <span className="text-xs sm:text-sm text-[#5E6A71] font-medium text-left">
              Konfidencialitāte
            </span>
          </div>

          <div className="flex items-center justify-center space-x-3 p-3 rounded-2xl bg-[#FFFFFF]/60 backdrop-blur-xs border border-[#E8E1D8]/50">
            <Award className="w-5 h-5 text-[#8BA983] shrink-0" />
            <span className="text-xs sm:text-sm text-[#5E6A71] font-medium text-left">
              Reģistrēta klīniskā psiholoģe
            </span>
          </div>

          <div className="flex items-center justify-center space-x-3 p-3 rounded-2xl bg-[#FFFFFF]/60 backdrop-blur-xs border border-[#E8E1D8]/50">
            <HeartHandshake className="w-5 h-5 text-[#8BA983] shrink-0" />
            <span className="text-xs sm:text-sm text-[#5E6A71] font-medium text-left">
              1000+ konsultētu cilvēku
            </span>
          </div>
        </motion.div>
      </div>

      {/* Position Adjustment Modal */}
      <AnimatePresence>
        {isEditingPos && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E4950]/40 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#E8E1D8] rounded-2xl p-6 max-w-md w-full shadow-xl relative my-8 text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D8]">
                <div className="flex items-center gap-2">
                  <Move className="w-5 h-5 text-[#8BA983]" />
                  <h3 className="font-serif text-lg text-[#3E4950] font-medium">
                    Pielāgot foto pozīciju rāmī
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closePositionModal}
                  className="p-1 rounded-lg text-[#7E8C94] hover:text-[#3E4950] hover:bg-[#FAF8F2] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Live Preview Circle */}
              <div className="my-5 flex flex-col items-center justify-center">
                <span className="text-xs text-[#7E8C94] mb-3 font-medium">Reāllaika priekšskatījums:</span>
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#8BA983] shadow-lg bg-[#FAF8F2] relative">
                  <img
                    src={portraitSrc}
                    alt="Priekšskatījums"
                    style={{
                      objectFit: 'cover',
                      objectPosition: `${tempPos.x}% ${tempPos.y}%`,
                      transform: `scale(${tempPos.zoom / 100})`,
                      transformOrigin: `${tempPos.x}% ${tempPos.y}%`,
                    }}
                    className="w-full h-full transition-all duration-75"
                  />
                </div>
              </div>

              <form onSubmit={handleSavePosition} className="space-y-4">
                {/* Preset Position Buttons */}
                <div>
                  <label className="block text-xs font-medium text-[#5E6A71] mb-1.5">
                    Ātrās pozīcijas pogas:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setTempPos({ ...tempPos, x: 50, y: 15 })}
                      className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#E8E1D8] bg-[#FAF8F2] hover:bg-[#E8E1D8]/60 text-[#3E4950] transition-colors cursor-pointer"
                    >
                      Augšā (Seja)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTempPos({ ...tempPos, x: 50, y: 50 })}
                      className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#E8E1D8] bg-[#FAF8F2] hover:bg-[#E8E1D8]/60 text-[#3E4950] transition-colors cursor-pointer"
                    >
                      Centrā
                    </button>
                    <button
                      type="button"
                      onClick={() => setTempPos({ ...tempPos, x: 50, y: 85 })}
                      className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#E8E1D8] bg-[#FAF8F2] hover:bg-[#E8E1D8]/60 text-[#3E4950] transition-colors cursor-pointer"
                    >
                      Apakšā
                    </button>
                  </div>
                </div>

                {/* Vertical Y Slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#5E6A71] mb-1">
                    <span>Vertikālā pozīcija (Y):</span>
                    <span className="text-[#8BA983] font-semibold">{tempPos.y}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tempPos.y}
                    onChange={(e) => setTempPos({ ...tempPos, y: Number(e.target.value) })}
                    className="w-full accent-[#8BA983] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#7E8C94]">
                    <span>Uz augšu</span>
                    <span>Uz leju</span>
                  </div>
                </div>

                {/* Horizontal X Slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#5E6A71] mb-1">
                    <span>Horizontālā pozīcija (X):</span>
                    <span className="text-[#8BA983] font-semibold">{tempPos.x}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tempPos.x}
                    onChange={(e) => setTempPos({ ...tempPos, x: Number(e.target.value) })}
                    className="w-full accent-[#8BA983] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#7E8C94]">
                    <span>Pa kreisi</span>
                    <span>Pa labi</span>
                  </div>
                </div>

                {/* Zoom Scale Slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#5E6A71] mb-1">
                    <span>Tuvinājums (Zoom):</span>
                    <span className="text-[#8BA983] font-semibold">{tempPos.zoom}%</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="250"
                    step="5"
                    value={tempPos.zoom}
                    onChange={(e) => setTempPos({ ...tempPos, zoom: Number(e.target.value) })}
                    className="w-full accent-[#8BA983] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#7E8C94]">
                    <span>100% (Sākotnējs)</span>
                    <span>250% (Tuvināts)</span>
                  </div>
                </div>

                {/* Controls Footer */}
                <div className="pt-4 border-t border-[#E8E1D8] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleResetPosition}
                    className="px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Atiestatīt</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={closePositionModal}
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
