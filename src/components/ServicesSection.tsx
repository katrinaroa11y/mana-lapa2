import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/practiceData';
import { Clock, MapPin, Check, Calendar } from 'lucide-react';
import { renderFormattedText } from '../utils/formatText';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="pakalpojumi" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F2] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#8BA983] font-semibold mb-3">
            <span>Pakalpojumi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3E4950] font-normal leading-tight">
            Profesionāls atbalsts izaugsmes un emocionālās veselības uzlabošanas ceļā
          </h2>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative rounded-3xl flex flex-col justify-between transition-all duration-300 bg-[#FFFFFF] border border-[#E8E1D8] shadow-sm hover:shadow-md p-6 sm:p-8"
              >
                {/* Top Badge */}
                <div className="mb-6 flex justify-between items-start">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-[#FAF8F2] text-[#8BA983] border border-[#E8E1D8]">
                    {service.tag}
                  </span>
                  {service.price && (
                    <span className="font-serif text-lg font-bold text-[#3E4950]">
                      {service.price}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  {/* Service Title & Subtitle */}
                  <h3 className="min-h-[64px] font-serif text-2xl font-normal text-[#3E4950] mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="min-h-[52px] text-sm text-[#7E8C94] mb-6 leading-relaxed">
                    {service.subtitle}
                  </p>

                  {/* Duration & Format */}
                  <div className="space-y-2 mb-6 text-xs text-[#5E6A71] bg-[#FAF8F2] p-3.5 rounded-xl border border-[#E8E1D8]/60">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#8BA983] shrink-0" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#8BA983] shrink-0" />
                      <span>{service.format}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#5E6A71] mb-6 leading-relaxed">
                    {renderFormattedText(service.description)}
                  </p>

                  {/* Benefits List */}
                  <div className="space-y-2.5 mb-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3E4950]">
                      {service.benefitsTitle || 'Ieguvumi:'}
                    </h4>
                    {service.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#5E6A71]">
                        <Check className="w-4 h-4 text-[#8BA983] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="pt-4 border-t border-[#E8E1D8]">
                  <button
                    id={`service-book-btn-${service.id}`}
                    onClick={() => {
                      if (service.id === 'nodarbibas-un-lekcijas') {
                        const elem = document.getElementById('nosutit-zinu') || document.getElementById('kontakti');
                        elem?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        onOpenBooking(service.id);
                      }
                    }}
                    className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all bg-[#FAF8F2] hover:bg-[#E8E1D8] text-[#3E4950] border border-[#E8E1D8]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{service.id === 'nodarbibas-un-lekcijas' ? 'Pieteikties' : 'Pieteikties uz sesiju'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
