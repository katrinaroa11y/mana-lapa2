import React from 'react';
import { motion } from 'motion/react';
import { WORK_TOPICS } from '../data/practiceData';
import { renderFormattedText } from '../utils/formatText';
import { 
  Wind, 
  Users, 
  ZapOff, 
  Cloud, 
  UserCheck, 
  Feather, 
  Sliders, 
  LifeBuoy, 
  Compass, 
  HelpCircle 
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Wind,
  Users,
  ZapOff,
  Cloud,
  UserCheck,
  Feather,
  Sliders,
  LifeBuoy,
  Compass
};

export const TopicsSection: React.FC = () => {
  return (
    <section id="temas" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] relative border-t border-b border-[#E8E1D8]/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#8BA983] font-semibold mb-3">
            <span>Kādos jautājumos varu palīdzēt</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#3E4950] font-normal leading-tight mb-4">
            Tēmas, ar kurām strādāju
          </h2>
          <p className="text-base text-[#5E6A71]">
            Katrs cilvēks un viņa pieredze ir unikāla. Šeit ir apkopotas visbiežākās tēmas un izaicinājumi, kuros sniedzu atbalstu:
          </p>
        </div>

        {/* Subtle blocks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {WORK_TOPICS.map((topic, index) => {
            const IconComponent = topic.iconName && iconMap[topic.iconName] ? iconMap[topic.iconName] : HelpCircle;
            
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F2] border border-[#E8E1D8]/80 hover:border-[#A8C3A1] hover:shadow-xs transition-all duration-200 flex items-start space-x-4 group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FFFFFF] border border-[#E8E1D8] flex items-center justify-center shrink-0 text-[#8BA983] group-hover:bg-[#A8C3A1] group-hover:text-white transition-colors">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-semibold text-[#3E4950]">
                    {topic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E6A71] leading-relaxed">
                    {renderFormattedText(topic.description)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
