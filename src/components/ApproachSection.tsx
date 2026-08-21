import React from 'react';
import { motion } from 'motion/react';
import { APPROACH_METHODS, EDUCATION } from '../data/practiceData';
import { ApproachMethod, CertificateInfo } from '../types';
import { Brain, Layers, Compass, Award } from 'lucide-react';
import { renderFormattedText } from '../utils/formatText';

export const ApproachSection: React.FC = () => {
  const methods = APPROACH_METHODS;
  const education = EDUCATION;

  const getCerts = (method: ApproachMethod): CertificateInfo[] => {
    if (method.certificates && method.certificates.length > 0) {
      return method.certificates;
    }
    if (method.certificate && (method.certificate.title || method.certificate.number || method.certificate.year)) {
      return [method.certificate];
    }
    return [];
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#8BA983]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#8BA983]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#8BA983]" />;
      default:
        return <Brain className="w-6 h-6 text-[#8BA983]" />;
    }
  };

  return (
    <>
      {/* Section 1: Darba metodes */}
      <section id="pieeja" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#8BA983] font-semibold mb-3">
              <span>Darba metodes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3E4950] font-normal leading-tight mb-4">
              Darba metodes
            </h2>
            <p className="text-base sm:text-lg text-[#2D373C] font-normal">
              Konsultēšanas procesā katram individuāli tiek piemērotas atbilstošākās metodes, tās saskaņojot ar klienta vēlmēm un vajadzībām.
            </p>
          </div>

          {/* Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methods.map((method, index) => {
              const certs = getCerts(method);

              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#E8E1D8] hover:border-[#A8C3A1] transition-all duration-300 hover:shadow-xs group flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E8E1D8] flex items-center justify-center group-hover:bg-[#A8C3A1]/20 transition-colors">
                        {getIcon(method.iconName)}
                      </div>

                      {method.tag && (
                        <span className="text-xs font-medium text-[#8BA983] bg-[#FFFFFF] px-2.5 py-1 rounded-full border border-[#E8E1D8]">
                          {method.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#3E4950] mb-2">
                      {method.title}
                    </h3>

                    {method.shortDesc && (
                      <p className="text-xs font-semibold text-[#8BA983] mb-3">
                        {method.shortDesc}
                      </p>
                    )}

                    <div className="text-sm text-[#2D373C] leading-relaxed whitespace-pre-line space-y-2 font-normal">
                      {renderFormattedText(method.description)}
                    </div>
                  </div>

                  {/* Certificate / Training Details */}
                  {certs.length > 0 && (
                    <div className="pt-3 border-t border-[#E8E1D8]/80 space-y-2">
                      <div className="space-y-2">
                        {certs.map((cert, cIdx) => (
                          <div
                            key={cIdx}
                            className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E8E1D8] flex items-start justify-between gap-2 shadow-2xs"
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <Award className="w-4 h-4 text-[#8BA983] shrink-0 mt-0.5" />
                              <div className="text-xs text-[#3E4950] space-y-0.5">
                                {cert.title && (
                                  <p className="font-medium text-[#3E4950] leading-snug">{cert.title}</p>
                                )}
                                <div className="flex flex-wrap items-center gap-x-2 text-[#2D373C]">
                                  {cert.number && (
                                    <span className="font-mono text-[11px]">{cert.number}</span>
                                  )}
                                  {cert.number && cert.year && <span>•</span>}
                                  {cert.year && <span>{cert.year}. gads</span>}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Izglītība */}
      <section id="izglitiba" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F2] border-t border-[#E8E1D8] relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#8BA983] font-semibold mb-3">
            <span>Izglītība</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3E4950] font-normal leading-tight mb-6">
            Izglītība
          </h2>

          {/* Simple paragraphs for education items */}
          <div className="space-y-2 sm:space-y-3">
            {education.map((item, idx) => {
              const title = item.title || item.degree;
              const inst = item.institution ? `, ${item.institution}` : '';
              const time = item.period || item.year ? ` (${item.period || item.year})` : '';
              return (
                <p
                  key={item.id || idx}
                  className="text-base sm:text-lg text-[#2D373C] leading-relaxed font-normal"
                >
                  {title}{inst}{time}
                </p>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
