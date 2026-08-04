import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';
import { PRACTICE_INFO } from '../data/practiceData';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#3E4950]/50 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#E8E1D8] overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-6 bg-[#FAF8F2] border-b border-[#E8E1D8] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#A8C3A1]/20 border border-[#A8C3A1] text-[#8BA983] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#3E4950]">
                  Privātuma politika un VDAR / GDPR paziņojums
                </h3>
                <p className="text-xs text-[#7E8C94]">
                  Datu apstrāde Katrīnas Rozenbahas psiholoģijas privātpraksē
                </p>
              </div>
            </div>

            <button
              id="privacy-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full text-[#7E8C94] hover:text-[#3E4950] hover:bg-[#E8E1D8]/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Policy Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto text-sm text-[#5E6A71] space-y-4 leading-relaxed">
            
            <section className="space-y-2">
              <h4 className="font-serif text-base font-semibold text-[#3E4950] flex items-center space-x-2">
                <Lock className="w-4 h-4 text-[#8BA983]" />
                <span>1. Vispārīgie noteikumi un Pārzinis</span>
              </h4>
              <p>
                Šī privātuma politika izskaidro, kā klīniskā psiholoģe Katrīna Rozenbaha ({PRACTICE_INFO.registrationNumber}) vāc, apstrādā un aizsargā Jūsu personas datus saskaņā ar Eiropas Savienības Vispārīgo datu aizsardzības regulu (VDAR / GDPR) un Latvijas Republikas Psihologu likumu.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-serif text-base font-semibold text-[#3E4950] flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#8BA983]" />
                <span>2. Kādi datie tiek apstrādāti?</span>
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>Vārds, uzvārds un kontaktinformācija (e-pasts, tālruņa numurs) pieteikuma un saziņas nodrošināšanai.</li>
                <li>Iemesls vai komentārs, ko brīvprātīgi norādāt pieteikšanās formā.</li>
                <li>Konsultāciju norises laikā iegūtā profesionālā dokumentācija, kas tiek glabāta atbilstoši psihologa profesionālās ētikas normām un tiesību aktiem.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h4 className="font-serif text-base font-semibold text-[#3E4950]">
                3. Datu apstrādes mērķi un tiesiskais pamats
              </h4>
              <p>
                Dati tiek apstrādāti tikai ar mērķi sniegt psiholoģiskās konsultācijas, nodrošināt pierakstu un saziņu, kā arī izpildīt tiesību aktos noteiktos juridiskos pienākumus. Dati netiek nodoti trešajām personām mārketinga vai komerciālos nolūkos.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-serif text-base font-semibold text-[#3E4950]">
                4. Konfidencialitāte un konfidencialitātes izņēmumi
              </h4>
              <p>
                Visas pieteikumu formas un konsultācijās pārrunātās tēmas ir pilnībā konfidenciālas. Izņēmumi ir pieļaujami TIKAI gadījumos, ko tieši paredz Latvijas Psihologu likums (piemēram, tiešs un nepārprotams apdraudējums personas vai citu dzīvībai vai veselībai).
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-serif text-base font-semibold text-[#3E4950]">
                5. Jūsu tiesības (VDAR / GDPR)
              </h4>
              <p>
                Jums ir tiesības jebkurā brīdī pieprasīt piekļuvi saviem personas datiem, labot tos, pieprasīt datu dzēšanu ("tiesības tikt aizmirstam") vai ierobežot apstrādi, rakstot uz e-pastu: <strong className="text-[#3E4950]">{PRACTICE_INFO.email}</strong>.
              </p>
            </section>

          </div>

          {/* Footer Control */}
          <div className="p-4 bg-[#FAF8F2] border-t border-[#E8E1D8] text-right">
            <button
              id="privacy-modal-accept-btn"
              onClick={onClose}
              className="bg-[#A8C3A1] hover:bg-[#8BA983] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all"
            >
              Esmu iepazinies / Aizvērt
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
