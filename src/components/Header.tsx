import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import { PRACTICE_INFO } from '../data/practiceData';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigateHome?: (sectionId?: string) => void;
  onNavigateBlogs?: () => void;
  currentPath?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onNavigateHome,
  onNavigateBlogs,
  currentPath = '/'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Par mani', href: '#par-mani' },
    { name: 'Pakalpojumi', href: '#pakalpojumi' },
    { name: 'Tēmas', href: '#temas' },
    { name: 'Pieeja', href: '#pieeja' },
    { name: 'BUJ', href: '#buj' },
    { name: 'Kontakti', href: '#kontakti' },
    { name: 'Blogs', href: '/blogs' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '/blogs') {
      if (onNavigateBlogs) {
        onNavigateBlogs();
      } else {
        window.history.pushState({}, '', '/blogs');
        window.dispatchEvent(new Event('popstate'));
      }
      return;
    }

    const targetId = href.replace('#', '');
    if (onNavigateHome) {
      onNavigateHome(targetId);
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/' + href);
        window.dispatchEvent(new Event('popstate'));
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F2]/90 backdrop-blur-md shadow-xs border-b border-[#E8E1D8]/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand Name */}
     {/* Logo / Brand */}
<a
  href="/"
  onClick={handleLogoClick}
  className="group flex items-center space-x-3 text-left"
>
  <div className="w-10 h-10 rounded-full bg-[#A8C3A1]/20 border border-[#A8C3A1]/40 flex items-center justify-center text-[#5E6A71] group-hover:bg-[#A8C3A1] group-hover:text-white transition-all duration-300">
    <span className="font-serif text-lg font-semibold tracking-wider">
      KR
    </span>
  </div>

  <div>
    <span className="block font-serif text-xl sm:text-2xl font-normal text-[#3E4950] tracking-tight group-hover:text-[#8BA983] transition-colors">
      {PRACTICE_INFO.name}
    </span>

    <span className="block text-[10px] sm:text-xs text-[#7E8C94] uppercase tracking-wider">
      Klīniskā psiholoģe
    </span>
  </div>
</a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
className="text-[16px] text-[#5E6A71] hover:text-[#3E4950] font-medium transition-colors"
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center space-x-2 bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-2.5 px-5 rounded-full text-sm font-medium transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Pieteikties</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#3E4950] hover:bg-[#E8E1D8]/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F2] border-b border-[#E8E1D8] px-4 pt-4 pb-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base text-[#3E4950] font-medium py-1 hover:text-[#8BA983] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-3 rounded-xl text-sm font-medium transition-all shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Pieteikties konsultācijai</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
