import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import { PRACTICE_INFO } from '../data/practiceData';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigateHome?: (sectionId?: string) => void;
  onNavigateBlogs?: () => void;
  currentPath?: string;
  language: 'lv' | 'en';
  onLanguageChange: (language: 'lv' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onNavigateHome,
  onNavigateBlogs,
  currentPath = '/'
  currentPath = '/',
  language,
  onLanguageChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
@@ -30,15 +32,36 @@
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
const navLinks = [
  {
    name: language === 'lv' ? 'Par mani' : 'About me',
    href: '#par-mani'
  },
  {
    name: language === 'lv' ? 'Pakalpojumi' : 'Services',
    href: '#pakalpojumi'
  },
  {
    name: language === 'lv' ? 'Tēmas' : 'Topics',
    href: '#temas'
  },
  {
    name: language === 'lv' ? 'Pieeja' : 'Approach',
    href: '#pieeja'
  },
  {
    name: language === 'lv' ? 'BUJ' : 'FAQ',
    href: '#buj'
  },
  {
    name: language === 'lv' ? 'Kontakti' : 'Contact',
    href: '#kontakti'
  },
  {
    name: language === 'lv' ? 'Blogs' : 'Blog',
    href: '/blogs'
  },
];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
@@ -131,54 +154,80 @@

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
<div className="hidden md:flex items-center text-sm font-medium">
  <button
    onClick={() => onLanguageChange('lv')}
    className={`transition-colors ${
      language === 'lv'
        ? 'text-[#3E4950] font-semibold'
        : 'text-[#9AA3A8] hover:text-[#3E4950]'
    }`}
  >
    LV
  </button>

  <span className="mx-1 text-[#C8C2B9]">|</span>

  <button
    onClick={() => onLanguageChange('en')}
    className={`transition-colors ${
      language === 'en'
        ? 'text-[#3E4950] font-semibold'
        : 'text-[#9AA3A8] hover:text-[#3E4950]'
    }`}
  >
    EN
  </button>
</div>
          <button
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center space-x-2 bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-2.5 px-5 rounded-full text-sm font-medium transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Pieteikties</span>
            <span>{language === 'lv' ? 'Pieteikties' : 'Book a consultation'}</span>
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
