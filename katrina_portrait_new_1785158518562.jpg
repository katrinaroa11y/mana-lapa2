import React, { useState } from 'react';
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

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#5E6A71] font-sans antialiased selection:bg-[#A8C3A1] selection:text-white flex flex-col">
      {/* Fixed Top Right Navigation Header */}
      <Header onOpenBooking={handleOpenBooking} />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* About Katrīna Rozenbaha */}
        <AboutSection />

        {/* 3 Main Services Cards */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* Topics I work with */}
        <TopicsSection />

        {/* Approach and Methods */}
        <ApproachSection />

        {/* Frequently Asked Questions */}
        <FaqSection onOpenBooking={() => handleOpenBooking()} />

        {/* Contacts & Location */}
        <ContactSection />
      </main>

      {/* Footer with VDAR / GDPR Notice */}
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

      {/* Privacy Policy / VDAR Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
