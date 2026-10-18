export interface ContactInfo {
  email: string;
  salesEmail?: string;
  supportEmail?: string;
  phone: string;
  whatsapp?: string;
  address: string;
  city: string;
  country: string;
  workingHours: string;
  responseTime: string;
  tagline: string;
  contactSubtitle: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
    youtube: string;
    discord?: string;
  };
}

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  "email": "contect@encelion.tech",
  "salesEmail": "sales@encelion.tech",
  "supportEmail": "support@encelion.tech",
  "phone": "+92 314 1621510",
  "whatsapp": "+92 314 1621510",
  "address": "Lahore, Pakistan",
  "city": "Lahore",
  "country": "Pakistan",
  "workingHours": "Mon - Fri: 9:00 AM - 6:00 PM (PKT)",
  "responseTime": "Average response time < 2 hours",
  "tagline": "AI Solutions for a Smarter Tomorrow",
  "contactSubtitle": "Have a project in mind, a question, or just want to say hello? We'd love to hear from you.",
  "socialLinks": {
    "twitter": "https://twitter.com",
    "linkedin": "https://www.linkedin.com/company/encelion-tech/",
    "github": "https://github.com",
    "youtube": "https://youtube.com",
    "discord": ""
  }
};

const STORAGE_KEY = 'encelion_contact_info_v1';
export const CONTACT_UPDATED_EVENT = 'encelion:contact_updated';

export function getStoredContactInfo(): ContactInfo {
  if (typeof window === 'undefined') {
    return DEFAULT_CONTACT_INFO;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTACT_INFO;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        ...DEFAULT_CONTACT_INFO,
        ...parsed,
        socialLinks: {
          ...DEFAULT_CONTACT_INFO.socialLinks,
          ...(parsed.socialLinks || {}),
        },
      };
    }
  } catch (err) {
    console.error('Error reading contact info from localStorage:', err);
  }

  return DEFAULT_CONTACT_INFO;
}

export function saveStoredContactInfo(info: ContactInfo): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    window.dispatchEvent(new CustomEvent(CONTACT_UPDATED_EVENT, { detail: info }));
  } catch (err) {
    console.error('Error saving contact info to localStorage:', err);
  }
}

export function resetStoredContactInfo(): ContactInfo {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(CONTACT_UPDATED_EVENT, { detail: DEFAULT_CONTACT_INFO }));
    } catch (err) {
      console.error('Error resetting contact info:', err);
    }
  }
  return DEFAULT_CONTACT_INFO;
}
