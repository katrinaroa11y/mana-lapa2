import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data/practiceData';
import { ChevronDown, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(
    FAQS.length > 0 ? FAQS[0].id : null
  );

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="buj" className="py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#8BA983] font-semibold mb-3">
            <span>Biežāk uzdotie jautājumi (BUJ)</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#3E4950] font-normal leading-tight mb-4">
            Informācija, kas var noderēt pirms pirmās tikšanās
          </h2>

          <p className="text-base text-[#3E4950]">
            Atbildes uz biežāk uzdotajiem jautājumiem par konsultāciju gaitu,
            formu, apmaksu un konfidencialitāti.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#FFFFFF] border border-[#E8E1D8] overflow-hidden transition-all duration-200"
              >
                <button
                  id={`faq-toggle-${faq.id}`}
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between space-x-4 focus:outline-none group"
                >
                  <span className="font-serif text-lg font-medium text-[#3E4950] group-hover:text-[#8BA983] transition-colors">
                    {faq.question}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full bg-[#FAF8F2] flex items-center justify-center shrink-0 text-[#8BA983] transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-[#A8C3A1] text-white'
                        : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-[#3E4950] leading-relaxed border-t border-[#FAF8F2] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Additional Help Callout */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D8] flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="text-left">
            <h4 className="font-serif text-base font-semibold text-[#3E4950]">
              Palika neatbildēts jautājums?
            </h4>

            <p className="text-xs sm:text-sm text-[#4A555C] font-medium">
              Raksti man uz e-pastu
            </p>
          </div>

          <a
            id="faq-ask-question-btn"
            href="#kontakti"
            className="inline-flex items-center space-x-2 bg-[#8BA983] hover:bg-[#A8C3A1] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Sazināties ar Katrīnu</span>
          </a>
        </div>

      </div>
    </section>
  );
};
