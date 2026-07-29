import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { APPROACH_METHODS } from '../data/practiceData';
import { ApproachMethod, CertificateInfo } from '../types';
import { Brain, Layers, Compass, ShieldCheck, Lock, Heart, Award, Edit3, Plus, X, Check, Trash2, RotateCcw } from 'lucide-react';
import { renderFormattedText } from '../utils/formatText';

const METHODS_STORAGE_KEY = 'katrina_approach_methods_v5';
const QUOTE_STORAGE_KEY = 'katrina_approach_quote_v1';

const DEFAULT_QUOTE = `Pārmaiņu un izaugsmes ceļš bieži norit klusumā, citiem to nemanot. Lielākās dzīves pārmaiņas reti būs kā skaļa Jaungada uguņošana, tās drīzāk ir kā lēna, pakāpeniska svecīšu rindas iedegšana - iededzot katru nākamo sveces liesmu ar iepriekšējo. Jo izvēloties pārmaiņu ceļu, katrs mazais solis rada nākamo, soli pa solim atverot durvis pilnīgi jaunām iespējām.`;
const DEFAULT_QUOTE_AUTHOR = `Katrīna Rozenbaha, reģistrēta klīniskā psiholoģe`;

export const ApproachSection: React.FC = () => {
  const [methods, setMethods] = useState<ApproachMethod[]>(() => {
    try {
      const saved = localStorage.getItem(METHODS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Kļūda ielādējot metodes no localStorage:', e);
    }
    return APPROACH_METHODS;
  });

  const [quoteText, setQuoteText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(QUOTE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.text) return parsed.text;
      }
    } catch (e) {
      console.error('Kļūda ielādējot citātu:', e);
    }
    return DEFAULT_QUOTE;
  });

  const [quoteAuthor, setQuoteAuthor] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(QUOTE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.author) return parsed.author;
      }
    } catch (e) {
      console.error('Kļūda ielādējot citāta autoru:', e);
    }
    return DEFAULT_QUOTE_AUTHOR;
  });

  const [isEditingQuote, setIsEditingQuote] = useState<boolean>(false);
  const [tempQuoteText, setTempQuoteText] = useState<string>('');
  const [tempQuoteAuthor, setTempQuoteAuthor] = useState<string>('');

  const [editingMethod, setEditingMethod] = useState<ApproachMethod | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editShortDesc, setEditShortDesc] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editTag, setEditTag] = useState<string>('');
  const [certList, setCertList] = useState<CertificateInfo[]>([]);

  const openQuoteEditModal = () => {
    setTempQuoteText(quoteText);
    setTempQuoteAuthor(quoteAuthor);
    setIsEditingQuote(true);
  };

  const closeQuoteEditModal = () => {
    setIsEditingQuote(false);
    setTempQuoteText('');
    setTempQuoteAuthor('');
  };

  const handleSaveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteText(tempQuoteText);
    setQuoteAuthor(tempQuoteAuthor);
    try {
      localStorage.setItem(
        QUOTE_STORAGE_KEY,
        JSON.stringify({ text: tempQuoteText, author: tempQuoteAuthor })
      );
    } catch (err) {
      console.error('Kļūda saglabājot citātu:', err);
    }
    closeQuoteEditModal();
  };

  const handleResetQuote = () => {
    setQuoteText(DEFAULT_QUOTE);
    setQuoteAuthor(DEFAULT_QUOTE_AUTHOR);
    try {
      localStorage.removeItem(QUOTE_STORAGE_KEY);
    } catch (err) {
      console.error('Kļūda dzēšot citātu:', err);
    }
    closeQuoteEditModal();
  };

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
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#8BA983]" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-[#8BA983]" />;
      default:
        return <Heart className="w-6 h-6 text-[#8BA983]" />;
    }
  };

  const openEditModal = (method: ApproachMethod) => {
    setEditingMethod(method);
    setEditTitle(method.title || '');
    setEditShortDesc(method.shortDesc || '');
    setEditDescription(method.description || '');
    setEditTag(method.tag || '');
    const existing = getCerts(method);
    if (existing.length > 0) {
      setCertList(existing.map((c) => ({ ...c })));
    } else {
      setCertList([{ title: '', number: '', year: '' }]);
    }
  };

  const closeEditModal = () => {
    setEditingMethod(null);
    setEditTitle('');
    setEditShortDesc('');
    setEditDescription('');
    setEditTag('');
    setCertList([]);
  };

  const handleCertChange = (index: number, field: keyof CertificateInfo, value: string) => {
    setCertList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddCertField = () => {
    setCertList((prev) => [...prev, { title: '', number: '', year: '' }]);
  };

  const handleRemoveCertField = (index: number) => {
    setCertList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMethod) return;

    const filteredCerts = certList
      .filter((c) => c.title?.trim() || c.number?.trim() || c.year?.trim())
      .map((c) => ({
        title: c.title?.trim() || '',
        number: c.number?.trim() || '',
        year: c.year?.trim() || ''
      }));

    const updatedMethods = methods.map((m) =>
      m.id === editingMethod.id
        ? {
            ...m,
            title: editTitle.trim() || m.title,
            shortDesc: editShortDesc.trim() || m.shortDesc,
            description: editDescription.trim() || m.description,
            tag: editTag.trim() || m.tag,
            certificates: filteredCerts.length > 0 ? filteredCerts : undefined,
            certificate: filteredCerts.length > 0 ? filteredCerts[0] : undefined
          }
        : m
    );

    setMethods(updatedMethods);

    try {
      localStorage.setItem(METHODS_STORAGE_KEY, JSON.stringify(updatedMethods));
    } catch (err) {
      console.error('Kļūda saglabājot metodes:', err);
    }

    closeEditModal();
  };

  const handleResetCurrentMethod = () => {
    if (!editingMethod) return;

    const original = APPROACH_METHODS.find((m) => m.id === editingMethod.id);
    if (!original) return;

    const updatedMethods = methods.map((m) =>
      m.id === editingMethod.id ? { ...original } : m
    );

    setMethods(updatedMethods);

    try {
      localStorage.setItem(METHODS_STORAGE_KEY, JSON.stringify(updatedMethods));
    } catch (err) {
      console.error('Kļūda atjaunojot metodi:', err);
    }

    closeEditModal();
  };

  return (
    <section id="pieeja" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center text-xs uppercase tracking-widest text-[#8BA983] font-semibold mb-3">
            <span>Metodes un izglītība</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3E4950] font-normal leading-tight mb-4">
            Darba metodes un izglītība
          </h2>
          <p className="text-base sm:text-lg text-[#5E6A71]">
            Konsultēšanas procesā katram individuāli tiek piemērotas atbilstošākās metodes, to saskaņojot ar klienta vēlmēm un vajadzībām.
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((method, index) => {
            const certs = getCerts(method);
            const isCenteredOnDesktop = method.id === 'trauma-informed' || index === 3;

            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-[#FAF8F2] border border-[#E8E1D8] hover:border-[#A8C3A1] transition-all duration-300 hover:shadow-xs group flex flex-col justify-between space-y-4 ${
                  isCenteredOnDesktop ? 'lg:col-start-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E8E1D8] flex items-center justify-center group-hover:bg-[#A8C3A1]/20 transition-colors">
                      {getIcon(method.iconName)}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(method)}
                        title="Labot metodes tekstu un izglītības datus"
                        className="p-1.5 rounded-lg border border-[#E8E1D8] bg-[#FFFFFF] text-[#7E8C94] hover:text-[#8BA983] hover:border-[#A8C3A1] transition-all flex items-center gap-1 text-xs cursor-pointer shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Labot</span>
                      </button>

                      <span className="text-xs font-medium text-[#8BA983] bg-[#FFFFFF] px-2.5 py-1 rounded-full border border-[#E8E1D8]">
                        {method.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#3E4950] mb-2">
                    {method.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#8BA983] mb-3">
                    {method.shortDesc}
                  </p>

                  <div className="text-sm text-[#5E6A71] leading-relaxed whitespace-pre-line space-y-2">
                    {renderFormattedText(method.description)}
                  </div>
                </div>

                {/* Certificate / Education Details Fields */}
                <div className="pt-3 border-t border-[#E8E1D8]/80 space-y-2">
                  {certs.length > 0 ? (
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
                              <div className="flex flex-wrap items-center gap-x-2 text-[#7E8C94]">
                                {cert.number && (
                                  <span className="font-mono text-[11px]">{cert.number}</span>
                                )}
                                {cert.number && cert.year && <span>•</span>}
                                {cert.year && <span>{cert.year}. gads</span>}
                              </div>
                            </div>
                          </div>
                          {cIdx === 0 && (
                            <button
                              onClick={() => openEditModal(method)}
                              title="Labot izglītības / sertifikāta datus"
                              className="p-1 rounded-md text-[#7E8C94] hover:text-[#8BA983] hover:bg-[#FAF8F2] transition-colors shrink-0"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => openEditModal(method)}
                      className="w-full py-2 px-3 rounded-xl border border-dashed border-[#E8E1D8] text-xs text-[#7E8C94] hover:text-[#8BA983] hover:border-[#A8C3A1] hover:bg-[#FFFFFF] transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Pievienot izglītības datus</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Approach Quote Box */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#FAF8F2] via-[#F4F0EA] to-[#FAF8F2] border border-[#E8E1D8] text-center max-w-4xl mx-auto relative group">
          <div className="flex justify-end mb-2 sm:mb-0 sm:absolute sm:top-4 sm:right-4">
            <button
              onClick={openQuoteEditModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#8BA983] hover:text-[#3E4950] bg-[#FFFFFF] hover:bg-[#FAF8F2] border border-[#E8E1D8] rounded-xl transition-all shadow-2xs cursor-pointer"
              title="Labot citāta tekstu"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Labot citātu</span>
            </button>
          </div>
          <p className="font-serif text-lg sm:text-xl text-[#3E4950] italic leading-relaxed mb-4">
            “{quoteText}”
          </p>
          <span className="text-xs uppercase tracking-widest text-[#8BA983] font-semibold">
            {quoteAuthor}
          </span>
        </div>

      </div>

      {/* Edit Method & Certificates Modal */}
      <AnimatePresence>
        {editingMethod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E4950]/40 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#E8E1D8] rounded-2xl p-6 max-w-xl w-full shadow-xl relative my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D8]">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#8BA983]" />
                  <h3 className="font-serif text-lg text-[#3E4950] font-medium">
                    Labot lauciņu: {editingMethod.title}
                  </h3>
                </div>
                <button
                  onClick={closeEditModal}
                  className="p-1 rounded-lg text-[#7E8C94] hover:text-[#3E4950] hover:bg-[#FAF8F2] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMethod} className="mt-4 space-y-5">
                <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                  
                  {/* Title & Tag */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-[#5E6A71] mb-1">
                        Nosaukums
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] focus:outline-hidden focus:border-[#8BA983]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5E6A71] mb-1">
                        Iezīme (tag)
                      </label>
                      <input
                        type="text"
                        value={editTag}
                        onChange={(e) => setEditTag(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] focus:outline-hidden focus:border-[#8BA983]"
                      />
                    </div>
                  </div>

                  {/* Short Desc */}
                  <div>
                    <label className="block text-xs font-medium text-[#5E6A71] mb-1">
                      Īsais apraksts / Apakšvirsraksts
                    </label>
                    <input
                      type="text"
                      value={editShortDesc}
                      onChange={(e) => setEditShortDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] focus:outline-hidden focus:border-[#8BA983]"
                    />
                  </div>

                  {/* Main Description */}
                  <div>
                    <label className="block text-xs font-medium text-[#5E6A71] mb-1">
                      Pilnais apraksts (var izmantot jaunās rindas un **treknraksts**)
                    </label>
                    <textarea
                      rows={6}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] leading-relaxed focus:outline-hidden focus:border-[#8BA983]"
                    />
                  </div>

                  {/* Certificates Header */}
                  <div className="pt-2 border-t border-[#E8E1D8]">
                    <span className="block text-xs font-semibold text-[#8BA983] uppercase tracking-wider mb-2">
                      Izglītības un sertifikātu ieraksti
                    </span>

                    <div className="space-y-3">
                      {certList.map((cert, index) => (
                        <div
                          key={index}
                          className="p-3.5 rounded-xl border border-[#E8E1D8] bg-[#FAF8F2] space-y-2.5 relative"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[#5E6A71]">
                              Sertifikāts / Izglītība #{index + 1}
                            </span>
                            {certList.length > 0 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveCertField(index)}
                                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Dzēst</span>
                              </button>
                            )}
                          </div>

                          <div>
                            <input
                              type="text"
                              value={cert.title || ''}
                              onChange={(e) => handleCertChange(index, 'title', e.target.value)}
                              placeholder="Nosaukums (piem., Shēmu terapijas sertifikāts)"
                              className="w-full px-3 py-1.5 rounded-lg border border-[#E8E1D8] bg-[#FFFFFF] text-xs text-[#3E4950] focus:outline-hidden focus:border-[#8BA983]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={cert.number || ''}
                              onChange={(e) => handleCertChange(index, 'number', e.target.value)}
                              placeholder="Numurs (neobligāts)"
                              className="w-full px-3 py-1.5 rounded-lg border border-[#E8E1D8] bg-[#FFFFFF] text-xs text-[#3E4950] focus:outline-hidden focus:border-[#8BA983]"
                            />
                            <input
                              type="text"
                              value={cert.year || ''}
                              onChange={(e) => handleCertChange(index, 'year', e.target.value)}
                              placeholder="Gads (piem., 2024)"
                              className="w-full px-3 py-1.5 rounded-lg border border-[#E8E1D8] bg-[#FFFFFF] text-xs text-[#3E4950] focus:outline-hidden focus:border-[#8BA983]"
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={handleAddCertField}
                        className="w-full py-2 px-3 rounded-xl border border-dashed border-[#A8C3A1] text-xs font-medium text-[#8BA983] hover:bg-[#FAF8F2] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Pievienot izglītības/sertifikāta ierakstu</span>
                      </button>
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-[#E8E1D8] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleResetCurrentMethod}
                    className="px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Atjaunot sākotnējo šīs metodes saturu"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Atjaunot sākotnējo</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="px-4 py-2 rounded-xl border border-[#E8E1D8] text-xs font-medium text-[#5E6A71] hover:bg-[#FAF8F2] cursor-pointer"
                    >
                      Atcelt
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#8BA983] text-white text-xs font-semibold hover:bg-[#789670] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Saglabāt</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        {/* Edit Quote Modal */}
        {isEditingQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E4950]/40 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#E8E1D8] rounded-2xl p-6 max-w-lg w-full shadow-xl relative my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D8]">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#8BA983]" />
                  <h3 className="font-serif text-lg text-[#3E4950] font-medium">
                    Labot citāta tekstu
                  </h3>
                </div>
                <button
                  onClick={closeQuoteEditModal}
                  className="p-1 rounded-lg text-[#7E8C94] hover:text-[#3E4950] hover:bg-[#FAF8F2] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveQuote} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5E6A71] mb-1">
                    Citāta teksts
                  </label>
                  <textarea
                    rows={6}
                    value={tempQuoteText}
                    onChange={(e) => setTempQuoteText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] leading-relaxed focus:outline-hidden focus:border-[#8BA983]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5E6A71] mb-1">
                    Autors / Paraksts
                  </label>
                  <input
                    type="text"
                    value={tempQuoteAuthor}
                    onChange={(e) => setTempQuoteAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E1D8] bg-[#FAF8F2] text-sm text-[#3E4950] focus:outline-hidden focus:border-[#8BA983]"
                  />
                </div>

                <div className="pt-3 border-t border-[#E8E1D8] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleResetQuote}
                    className="px-3.5 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Atjaunot sākotnējo citātu"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Atjaunot sākotnējo</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={closeQuoteEditModal}
                      className="px-4 py-2 rounded-xl border border-[#E8E1D8] text-xs font-medium text-[#5E6A71] hover:bg-[#FAF8F2] cursor-pointer"
                    >
                      Atcelt
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#8BA983] text-white text-xs font-semibold hover:bg-[#789670] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Saglabāt</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
