export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  duration: string;
  format: string;
  description: string;
  benefitsTitle?: string;
  benefits: string[];
  price: string;
  recommendedFor: string;
}

export interface CertificateInfo {
  title?: string;
  number?: string;
  year?: string;
}

export interface ApproachMethod {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  iconName: string;
  tag: string;
  certificate?: CertificateInfo;
  certificates?: CertificateInfo[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface WorkTopic {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface BookingFormData {
  serviceId: string;
  format: 'klatiene' | 'tiessaiste';
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  agreedToTerms: boolean;
}
