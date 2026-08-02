import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, CheckCircle, ChevronRight, ChevronLeft, User, Mail, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { SERVICES, TIME_SLOTS, PRACTICE_INFO } from '../data/practiceData';
import { BookingFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

const BOOKABLE_SERVICES = SERVICES.filter((s) => s.id !== 'nodarbibas-un-lekcijas');

const getInitialWorkday = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().split('T')[0];
};

const isWeekendSelected = (dateStr: string) => {
  if (!dateStr) return false;
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const initialServiceId = (preselectedServiceId && preselectedServiceId !== 'nodarbibas-un-lekcijas')
    ? preselectedServiceId
    : BOOKABLE_SERVICES[0].id;

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: initialServiceId,
    format: 'tiessaiste',
    date: getInitialWorkday(),
    timeSlot: TIME_SLOTS[0],
    fullName: '',
    email: '',
    phone: '',
    message: '',
    agreedToTerms: true
  });

  useEffect(() => {
    if (isOpen) {
      const validId = (preselectedServiceId && preselectedServiceId !== 'nodarbibas-un-lekcijas')
        ? preselectedServiceId
        : BOOKABLE_SERVICES[0].id;
      setFormData((prev) => ({
        ...prev,
        serviceId: validId
      }));
    }
  }, [isOpen, preselectedServiceId]);

  if (!isOpen) return null;

  const selectedService = BOOKABLE_SERVICES.find((s) => s.id === formData.serviceId) || BOOKABLE_SERVICES[0];

  const handleNextStep = async (e: React.FormEvent) => {
  e.preventDefault();

  if (step === 3 && isWeekendSelected(formData.date)) {
    return;
  }

  if (step < 4) {
    setStep(step + 1);
    return;
  }

  // Nosūta pieteikumu uz Vercel API
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        serviceName: selectedService.title,
      }),
    });

    if (!response.ok) {
      throw new Error('Pieteikuma nosūtīšana neizdevās');
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

  } catch (error) {
    console.error('Booking error:', error);

    setIsSubmitting(false);

    alert(
      'Neizdevās nosūtīt pieteikumu. Lūdzu, mēģiniet vēlreiz vai sazinieties ar mani telefoniski (tel. nr. +371 27572910).'
    );
  }
};

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetForm}
          className="fixed inset-0 bg-[#3E4950]/50 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#E8E1D8] overflow-hidden z-10 my-8"
        >
          {/* Modal Header */}
          <div className="p-6 bg-[#FAF8F2] border-b border-[#E8E1D8] flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8BA983]">
                Pieteikšanās konsultācijai
              </span>
              <h3 className="font-serif text-xl font-medium text-[#3E4950]">
                {isSubmitted ? 'Pieteikums saņemts!' : `Solis ${step} no 4`}
              </h3>
            </div>
            <button
              id="booking-modal-close-btn"
              onClick={resetForm}
              className="p-2 rounded-full text-[#7E8C94] hover:text-[#3E4950] hover:bg-[#E8E1D8]/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Progress Bar */}
          {!isSubmitted && (
            <div className="w-full bg-[#E8E1D8]/40 h-1.5">
              <div
                className="bg-[#A8C3A1] h-1.5 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          )}

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {isSubmitted ? (
              /* Success View */
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#A8C3A1]/20 border border-[#A8C3A1] text-[#8BA983] flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <h3 className="font-serif text-2xl text-[#3E4950] font-normal">
                  Paldies, {formData.fullName}!
                </h3>

                <p className="text-sm text-[#5E6A71] max-w-md mx-auto leading-relaxed">
                  Jūsu pieteikums konsultācijai <strong className="text-[#3E4950]">{selectedService.title}</strong> ir veiksmīgi nosūtīts. Tuvākās 24h laikā nosūtīšu apstiprinājumu uz Jūsu e-pastu ({formData.email}).
                </p>

                {/* Booking Recap Card */}
                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E1D8] text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between py-1 border-b border-[#E8E1D8]/60">
                    <span className="text-[#7E8C94]">Pakalpojums:</span>
                    <span className="font-medium text-[#3E4950]">{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E1D8]/60">
                    <span className="text-[#7E8C94]">Formāts:</span>
                    <span className="font-medium text-[#3E4950]">
                      Tiešsaistē (Google Meet / MS Teams)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E1D8]/60">
                    <span className="text-[#7E8C94]">Datums un laiks:</span>
                    <span className="font-medium text-[#3E4950]">{formData.date} plkst. {formData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#7E8C94]">Tālrunis saziņai:</span>
                    <span className="font-medium text-[#3E4950]">{formData.phone}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    id="booking-modal-finish-btn"
                    onClick={resetForm}
                    className="w-full bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-3 rounded-xl font-medium text-sm transition-all"
                  >
                    Aizvērt un atgriezties mājaslapā
                  </button>
                </div>
              </div>
            ) : (
              /* Multi-step Form */
              <form onSubmit={handleNextStep} className="space-y-6">
                
                {/* STEP 1: Select Service */}
                {step === 1 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-[#3E4950]">
                      1. Izvēlieties pakalpojumu:
                    </label>
                    <div className="space-y-3">
                      {BOOKABLE_SERVICES.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => setFormData({ ...formData, serviceId: s.id })}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                            formData.serviceId === s.id
                              ? 'border-[#A8C3A1] bg-[#FAF8F2] ring-2 ring-[#A8C3A1]/30'
                              : 'border-[#E8E1D8] bg-[#FFFFFF] hover:bg-[#FAF8F2]/50'
                          }`}
                        >
                          <div>
                            <span className="block font-serif text-base font-medium text-[#3E4950]">
                              {s.title}
                            </span>
                            <span className="block text-xs text-[#7E8C94] mt-1">
                              {s.duration}{s.price ? ` • ${s.price}` : ''}
                            </span>
                          </div>
                          <input
                            type="radio"
                            name="service"
                            checked={formData.serviceId === s.id}
                            onChange={() => setFormData({ ...formData, serviceId: s.id })}
                            className="mt-1 accent-[#8BA983]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Choose Format */}
                {step === 2 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-[#3E4950]">
                      2. Konsultācijas formāts:
                    </label>

                    <div className="grid grid-cols-1 gap-4">
                      <div
                        onClick={() => setFormData({ ...formData, format: 'tiessaiste' })}
                        className="p-5 rounded-2xl border cursor-pointer transition-all text-center space-y-2 border-[#A8C3A1] bg-[#FAF8F2] ring-2 ring-[#A8C3A1]/30"
                      >
                        <Calendar className="w-8 h-8 text-[#8BA983] mx-auto" />
                        <span className="block font-serif text-base font-medium text-[#3E4950]">
                          Tiešsaistē (Online)
                        </span>
                        <span className="block text-xs text-[#7E8C94]">
                          Google Meet vai MS Teams video zvans
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Date & Time */}
                {step === 3 && (
                  <div className="space-y-5">
                    <label className="block text-sm font-semibold text-[#3E4950]">
                      3. Izvēlieties datumu un laiku:
                    </label>

                    <div>
                      <span className="block text-xs text-[#7E8C94] mb-2 font-medium">
                        Izvēlieties vēlamo datumu (Darba dienās P. – Pk.):
                      </span>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                          isWeekendSelected(formData.date)
                            ? 'border-amber-400 bg-amber-50/50 text-amber-900 focus:ring-amber-400'
                            : 'border-[#E8E1D8] bg-[#FAF8F2] text-[#3E4950] focus:ring-[#A8C3A1]'
                        }`}
                      />
                      {isWeekendSelected(formData.date) && (
                        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2.5 mt-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-semibold block text-amber-900 mb-0.5">
                              Sestdienās un svētdienās konsultācijas nenotiek.
                            </strong>
                            <span>Lūdzu, izvēlieties darba dienu (pirmdiena – piektdiena).</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="block text-xs text-[#7E8C94] mb-2 font-medium">
                        Pieejamie laika lauki:
                      </span>
                      <div className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-3">
                          {TIME_SLOTS.slice(0, 2).map((slot) => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setFormData({ ...formData, timeSlot: slot })}
                              className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all flex items-center justify-center space-x-2 ${
                                formData.timeSlot === slot
                                  ? 'bg-[#A8C3A1] text-white border-[#A8C3A1] shadow-xs'
                                  : 'bg-[#FAF8F2] text-[#5E6A71] border-[#E8E1D8] hover:border-[#A8C3A1]'
                              }`}
                            >
                              <Clock className="w-4 h-4" />
                              <span>{slot}</span>
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, timeSlot: TIME_SLOTS[2] })}
                          className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-medium border transition-all flex items-center justify-center space-x-2 ${
                            formData.timeSlot === TIME_SLOTS[2]
                              ? 'bg-[#A8C3A1] text-white border-[#A8C3A1] shadow-xs'
                              : 'bg-[#FAF8F2] text-[#5E6A71] border-[#E8E1D8] hover:border-[#A8C3A1]'
                          }`}
                        >
                          <MessageSquare className="w-4 h-4 shrink-0" />
                          <span>{TIME_SLOTS[2]}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Personal Details */}
                {step === 4 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-[#3E4950]">
                      4. Ievadiet savu kontaktinformāciju:
                    </label>

                    <div>
                      <label className="block text-xs text-[#5E6A71] font-medium mb-1">
                        Vārds, Uzvārds *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Piem. Anna Bērziņa"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-3 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C3A1]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#5E6A71] font-medium mb-1">
                          E-pasts *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="anna@piemers.lv"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-3 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C3A1]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#5E6A71] font-medium mb-1">
                          Tālruņa numurs *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+371 20000000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full p-3 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C3A1]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#5E6A71] font-medium mb-1">
                        Īss iemesls vai komentārs (neobligāti)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Piemēram, vēlos pieteikties EMDR terapijai saistībā ar trauksmi..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C3A1]"
                      />
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="terms-check"
                        required
                        checked={formData.agreedToTerms}
                        onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                        className="mt-1 accent-[#8BA983]"
                      />
                      <label htmlFor="terms-check" className="text-xs text-[#7E8C94] leading-tight">
                        Piekrītu manu datu apstrādei pieteikuma apstrādes un saziņas nodrošināšanai (saskaņā ar VDAR).
                      </label>
                    </div>
                  </div>
                )}

                {/* Form Controls */}
                <div className="pt-6 border-t border-[#E8E1D8] flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center space-x-1.5 text-sm text-[#5E6A71] hover:text-[#3E4950] px-4 py-2 rounded-xl hover:bg-[#FAF8F2]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Atpakaļ</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || (step === 3 && isWeekendSelected(formData.date))}
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-xs ${
                      step === 3 && isWeekendSelected(formData.date)
                        ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                        : 'bg-[#A8C3A1] hover:bg-[#8BA983] text-white'
                    }`}
                  >
                    <span>{step === 4 ? (isSubmitting ? 'Nosūta...' : 'Apstiprināt pieteikumu') : 'Turpināt'}</span>
                    {step < 4 && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
