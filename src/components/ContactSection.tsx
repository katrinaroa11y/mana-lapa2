import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRACTICE_INFO } from '../data/practiceData';
import { Mail, Phone, Send, CheckCircle2, Instagram, Linkedin, Facebook, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
const response = await fetch('/api/booking', {
  method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        serviceName: 'Ziņa no kontaktformas',
        format: 'Kontaktforma',
        date: '',
        timeSlot: '',
      }),
    });

    if (response.ok) {
  setSubmitted(true);

  setForm({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
} else {
  const result = await response.json();
  console.error(result);

  alert('Ziņas nosūtīšana neizdevās. Lūdzu, mēģiniet vēlreiz.');
}

  } catch (error) {
    console.error('Email error:', error);
    alert('Radās kļūda nosūtot ziņu.');
  }
};

  return (
    <section id="kontakti" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#8BA983] font-semibold mb-3">
            <span>Saziņa & Lokācija</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3E4950] font-normal leading-tight mb-4">
            Esmu šeit, lai atbildētu uz Taviem jautājumiem
          </h2>
          <p className="text-base sm:text-lg text-[#5E6A71]">
            Droši sazinieties, lai noskaidrotu sev interesējošās nianses vai vienotos par tikšanās laiku.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#FAF8F2] border border-[#E8E1D8] space-y-6">
              <h3 className="font-serif text-2xl font-normal text-[#3E4950] pb-4 border-b border-[#E8E1D8]">
                Prakses informācija
              </h3>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E8E1D8] text-[#8BA983] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#7E8C94]">
                    E-pasts
                  </span>
                  <a
                    href={`mailto:${PRACTICE_INFO.email}`}
                    className="block text-base font-medium text-[#3E4950] hover:text-[#8BA983] transition-colors mt-0.5"
                  >
                    {PRACTICE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E8E1D8] text-[#8BA983] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#7E8C94]">
                    Tālrunis
                  </span>
                  <a
                    href={`tel:${PRACTICE_INFO.phone}`}
                    className="block text-base font-medium text-[#3E4950] hover:text-[#8BA983] transition-colors mt-0.5"
                  >
                    {PRACTICE_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-6 border-t border-[#E8E1D8]">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#7E8C94] mb-3">
                  Sociālie tīkli un profili
                </span>
                <div className="flex items-center space-x-3">
                  <a
                    href={PRACTICE_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E8E1D8] flex items-center justify-center text-[#5E6A71] hover:text-[#8BA983] hover:border-[#A8C3A1] transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={PRACTICE_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E8E1D8] flex items-center justify-center text-[#5E6A71] hover:text-[#8BA983] hover:border-[#A8C3A1] transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={PRACTICE_INFO.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E8E1D8] flex items-center justify-center text-[#5E6A71] hover:text-[#8BA983] hover:border-[#A8C3A1] transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Registration note */}
            <div className="p-4 rounded-2xl bg-[#FAF8F2]/60 border border-[#E8E1D8] flex items-center space-x-3 text-xs text-[#7E8C94]">
              <Shield className="w-5 h-5 text-[#8BA983] shrink-0" />
              <span>
                {PRACTICE_INFO.registrationNumber}. Reģistrēts Latvijas Psihologu reģistrā.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7" id="nosutit-zinu">
            <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D8] shadow-sm">
              <h3 className="font-serif text-2xl font-normal text-[#3E4950] mb-2">
                Nosūtīt ziņu Katrīnai
              </h3>
              <p className="text-sm text-[#7E8C94] mb-6">
                Aizpildiet šo formu, un es atbildēšu pēc iespējas ātrāk (parasti vienas darba dienas laikā).
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#FAF8F2] border border-[#A8C3A1] text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#8BA983] mx-auto" />
                  <h4 className="font-serif text-xl font-medium text-[#3E4950]">
                    Paldies, ziņa ir nosūtīta!
                  </h4>
                  <p className="text-sm text-[#5E6A71]">
                    Paldies par saziņu. Katrīna tuvākajā laikā ar Jums sazināsies.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#8BA983] font-semibold underline hover:text-[#3E4950]"
                  >
                    Nosūtīt vēl vienu ziņu
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6A71] mb-1">
                      Jūsu vārds, uzvārds *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Anna Bērziņa"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] focus:outline-none focus:ring-2 focus:ring-[#A8C3A1]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6A71] mb-1">
                        E-pasts *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="anna@piemers.lv"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] focus:outline-none focus:ring-2 focus:ring-[#A8C3A1]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6A71] mb-1">
                        Tālruņa numurs
                      </label>
                      <input
                        type="tel"
                        placeholder="+371 20000000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] focus:outline-none focus:ring-2 focus:ring-[#A8C3A1]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6A71] mb-1">
                      Jūsu jautājums vai ziņa *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Labdien, vēlētos noskaidrot..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] focus:outline-none focus:ring-2 focus:ring-[#A8C3A1]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-3.5 px-6 rounded-xl font-medium text-sm transition-all shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Nosūtīt ziņu</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
