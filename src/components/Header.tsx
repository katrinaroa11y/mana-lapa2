import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Par mani', href: '#par-mani' },
    { name: 'Pakalpojumi', href: '#pakalpojumi' },
    { name: 'Tēmas', href: '#temas' },
    { name: 'Metodes un izglītība', href: '#pieeja' },
    { name: 'BUJ', href: '#buj' },
    { name: 'Kontakti', href: '#kontakti' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header py-3 shadow-xs'
            : 'bg-[#FAF8F2]/90 backdrop-blur-md py-5 border-b border-[#E8E1D8]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#"
            className="group flex items-center space-x-3 text-left focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-full bg-[#A8C3A1]/20 border border-[#A8C3A1]/40 flex items-center justify-center text-[#5E6A71] group-hover:bg-[#A8C3A1] group-hover:text-white transition-all duration-300">
              <span className="font-serif text-lg font-semibold tracking-wider">KR</span>
            </div>
            <div>
              <span className="block font-serif text-lg font-medium text-[#3E4950] tracking-tight group-hover:text-[#A8C3A1] transition-colors">
                Katrīna Rozenbaha
              </span>
              <span className="block text-xs text-[#7E8C94] uppercase tracking-wider font-sans font-normal">
                Klīniskā psiholoģe
              </span>
            </div>
          </a>

          {/* Desktop Right Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
            <nav className="flex items-center space-x-1 lg:space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-[#5E6A71] hover:text-[#3E4950] relative group transition-colors rounded-lg hover:bg-[#E8E1D8]/30"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#A8C3A1] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
                </a>
              ))}
            </nav>

            <button
              id="header-booking-btn-desktop"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center space-x-2 bg-[#A8C3A1] hover:bg-[#8BA983] text-white px-4 py-2.5 rounded-full text-sm font-medium transition-all shadow-xs hover:shadow-md active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Pieteikties</span>
            </button>
          </div>

          {/* Mobile Hamburger / "Izvēlne" Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full border border-[#E8E1D8] bg-[#FFFFFF] text-[#5E6A71] hover:bg-[#FAF8F2] hover:text-[#3E4950] transition-colors shadow-2xs focus:outline-none"
              aria-label="Atvērt izvēlni"
            >
              <Menu className="w-5 h-5 text-[#8BA983]" />
              <span className="text-sm font-medium tracking-wide">Izvēlne</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#3E4950]/40 backdrop-blur-xs z-50 md:hidden"
            />

            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAF8F2] border-l border-[#E8E1D8] z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#E8E1D8]">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#A8C3A1]/20 border border-[#A8C3A1]/40 flex items-center justify-center text-[#5E6A71]">
                      <span className="font-serif text-base font-semibold">KR</span>
                    </div>
                    <div>
                      <span className="block font-serif text-base font-medium text-[#3E4950]">
                        Katrīna Rozenbaha
                      </span>
                      <span className="block text-[11px] text-[#7E8C94] uppercase tracking-wider">
                        Klīniskā psiholoģe
                      </span>
                    </div>
                  </div>
                  <button
                    id="mobile-menu-close-btn"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full text-[#7E8C94] hover:text-[#3E4950] hover:bg-[#E8E1D8]/40 transition-colors"
                    aria-label="Aizvērt izvēlni"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="py-6 space-y-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block px-4 py-3 rounded-xl text-base font-medium text-[#5E6A71] hover:text-[#3E4950] hover:bg-[#E8E1D8]/40 transition-all border border-transparent hover:border-[#E8E1D8]/60"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                {/* Direct CTA */}
                <div className="pt-2">
                  <button
                    id="mobile-drawer-booking-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-3.5 px-4 rounded-xl font-medium text-sm transition-all shadow-xs active:scale-98"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Pieteikties konsultācijai</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer / Quick Info */}
              <div className="pt-6 border-t border-[#E8E1D8] mt-8 text-xs text-[#7E8C94] space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8BA983] shrink-0" />
                  <span>Krišjāņa Barona iela 32, Rīga & Tiešsaistē</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#8BA983] shrink-0" />
                  <span>katrina.rozenbaha@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#8BA983] shrink-0" />
                  <span>Psihologu reģistra Nr. 7001430</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
