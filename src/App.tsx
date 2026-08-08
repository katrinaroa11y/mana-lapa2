import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TopicsSection } from './components/TopicsSection';
import { ApproachSection } from './components/ApproachSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PrivacyModal } from './components/PrivacyModal';
import { BlogList } from './components/BlogList';
import { BlogPostSingle } from './components/BlogPostSingle';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (sectionId?: string) => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', sectionId ? `/#${sectionId}` : '/');
      setCurrentPath('/');
    }
    
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  // Determine which page view to render based on URL path
  const isBlogsPage = currentPath === '/blogs' || currentPath === '/blogs/';
  const isSinglePostPage = currentPath.startsWith('/blogs/') && currentPath.length > 7;
  const singlePostSlug = isSinglePostPage ? currentPath.replace('/blogs/', '') : '';

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#5E6A71] font-sans antialiased selection:bg-[#A8C3A1] selection:text-white flex flex-col">
      {/* Navigation Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        onNavigateHome={handleNavigateHome}
        onNavigateBlogs={() => navigate('/blogs')}
        currentPath={currentPath}
        language="lv"
      />

      <main className="flex-grow">
        {isSinglePostPage ? (
          /* Single Blog Post Template (/blogs/:slug) */
          <BlogPostSingle
            slug={singlePostSlug}
            onBackToBlogs={() => navigate('/blogs')}
            onSelectPost={(slug) => navigate(`/blogs/${slug}`)}
            onOpenBooking={() => handleOpenBooking()}
          />
        ) : isBlogsPage ? (
          /* Blog List Page (/blogs) */
          <BlogList
            onSelectPost={(slug) => navigate(`/blogs/${slug}`)}
            onOpenBooking={() => handleOpenBooking()}
            isPage={true}
          />
        ) : (
          /* Main Homepage View */
          <>
            <HeroSection onOpenBooking={() => handleOpenBooking()} />
            <AboutSection />
            <ServicesSection onOpenBooking={handleOpenBooking} />
            <TopicsSection />
            <ApproachSection />
            <FaqSection onOpenBooking={() => handleOpenBooking()} />

            {/* Integrated Blog Section on Homepage */}
            <section id="blogs" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-t border-[#E8E1D8]">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#8BA983] font-semibold mb-2">
                      <span>Jaunākie Raksti</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#3E4950] font-normal">
                      Psiholoģijas un labsajūtas blogs
                    </h2>
                  </div>
                  <button
                    onClick={() => navigate('/blogs')}
                    className="inline-flex items-center space-x-2 text-sm font-semibold text-[#8BA983] hover:text-[#3E4950] transition-colors cursor-pointer"
                  >
                    <span>Apskatīt visus rakstus &rarr;</span>
                  </button>
                </div>

                {/* 3 Articles in 1 Row */}
                <BlogList
                  onSelectPost={(slug) => navigate(`/blogs/${slug}`)}
                  isPage={false}
                />
              </div>
            </section>

            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={selectedServiceId}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
