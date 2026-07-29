import React from 'react';
import { PRACTICE_INFO } from '../data/practiceData';
import { ShieldCheck, Heart, ArrowUp, Linkedin, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3E4950] text-[#E8E1D8] pt-16 pb-12 border-t border-[#3E4950]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#5E6A71]/50">
          
          {/* Brand & Credentials Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#A8C3A1] text-white flex items-center justify-center font-serif text-lg font-semibold">
                KR
              </div>
              <div>
                <span className="block font-serif text-xl font-normal text-white">
                  Katrīna Rozenbaha
                </span>
                <span className="block text-xs text-[#A8C3A1] uppercase tracking-wider">
                  Klīniskā psiholoģe
                </span>
              </div>
            </div>

            <p className="text-sm text-[#E8E1D8]/80 leading-relaxed max-w-sm">
              Katrīnas Rozenbahas privātprakse. Individuālās psihologa konsultācijas Rīgā un tiešsaistē (online), EMDR un shēmu terapijas metodes.
            </p>

            <div className="text-xs text-[#E8E1D8]/60 space-y-1 pt-2">
              <p>{PRACTICE_INFO.registrationNumber}</p>
              <p>Reģistrēts Latvijas Psihologu reģistrā</p>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-medium text-white mb-2">
              Mājaslapas sadaļas
            </h4>
            <ul className="space-y-2 text-sm text-[#E8E1D8]/80">
              <li>
                <a href="#par-mani" className="hover:text-[#A8C3A1] transition-colors">
                  Par Katrīnu Rozenbahu
                </a>
              </li>
              <li>
                <a href="#pakalpojumi" className="hover:text-[#A8C3A1] transition-colors">
                  Pakalpojumi un Izmaksas
                </a>
              </li>
              <li>
                <a href="#pieeja" className="hover:text-[#A8C3A1] transition-colors">
                  Metodes un izglītība
                </a>
              </li>
              <li>
                <a href="#buj" className="hover:text-[#A8C3A1] transition-colors">
                  Biežāk uzdotie jautājumi (BUJ)
                </a>
              </li>
              <li>
                <a href="#kontakti" className="hover:text-[#A8C3A1] transition-colors">
                  Saziņa
                </a>
              </li>
            </ul>
          </div>

          {/* Fast Actions & Privacy Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-base font-medium text-white mb-2">
              Pieraksts & Juridiskā informācija
            </h4>

            <button
              id="footer-booking-btn"
              onClick={onOpenBooking}
              className="w-full bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-3 px-5 rounded-xl text-sm font-medium transition-all text-center shadow-xs"
            >
              Pieteikties konsultācijai tiešsaistē
            </button>

            <div className="pt-2">
              <button
                id="footer-privacy-btn"
                onClick={onOpenPrivacy}
                className="inline-flex items-center space-x-2 text-xs text-[#A8C3A1] hover:text-white transition-colors underline"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Privātuma politika & VDAR / GDPR paziņojums</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={PRACTICE_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#5E6A71] text-white flex items-center justify-center hover:bg-[#A8C3A1] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PRACTICE_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#5E6A71] text-white flex items-center justify-center hover:bg-[#A8C3A1] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={PRACTICE_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#5E6A71] text-white flex items-center justify-center hover:bg-[#A8C3A1] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8E1D8]/60 gap-4">
          <p>© {new Date().getFullYear()} Katrīna Rozenbaha. Visas tiesības aizsargātas.</p>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Privātuma politika
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-[#A8C3A1] hover:text-white transition-colors"
            >
              <span>Uz augšu</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
