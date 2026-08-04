import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowDown, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

const DEFAULT_PORTRAIT = '/katrina_portrait_new_1785158518562.jpg';
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

  const [photoPos, setPhotoPos] = useState<PhotoPosition>(() => {
    try {
      const saved = localStorage.getItem(POSITION_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Kļūda ielādējot foto pozīciju:', e);
    }
    return DEFAULT_POSITION;
  });

  useEffect(() => {
    const updateFromStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPortraitSrc(saved);
      } else {
        setPortraitSrc(DEFAULT_PORTRAIT);
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

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F2]">
      {/* Background Image Container with Soft Ambient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
         src="/calming_hero_bg_1785157949576.jpg"
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
        </motion.div>

        {/* Small Circular Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="flex flex-col items-center justify-center mb-5"
        >
          <div className="relative rounded-full p-1 bg-gradient-to-tr from-[#A8C3A1] via-[#E8E1D8] to-[#8BA983] shadow-md">
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
                className="w-full h-full"
              />
            </div>
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
         Klīniskās psiholoģes konsultācijas. Palīdzu pārvarēt trauksmi, stresu, izdegšanu un psiholoģiskās traumas sekas, lai veidotu mieŗīgāku un līdzsvarotāku dzīvi. Konsultācijas attālināti, kā arī psihologa vadīti semināri uzņēmumiem Rīgā un visā Latvijā.
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
              Individuāla pieeja
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
