export interface Founder {
  id: string;
  name: string;
  role: string;
  tag: string;
  bio: string;
  image: string | null;
  expertise: string[];
  linkedin: string;
  twitter: string;
  github?: string;
  email?: string;
  initials: string;
  color: string;
  order?: number;
}

export const DEFAULT_FOUNDERS: Founder[] = [
  {
    id: 'founder-1',
    name: 'Ahmad Zain',
    role: 'CEO & Co-Founder',
    tag: 'Chief Executive Officer',
    bio: 'Visionary entrepreneur and AI strategist with extensive experience building enterprise software and AI products. Ahmad founded Encelion.tech with the mission to make advanced AI accessible and profitable for modern businesses. He leads overall company vision, client partnerships, and strategic growth.',
    image: '/uploads/founder_1792168388529_ahmad_png.png',
    expertise: ['AI Strategy', 'Business Development', 'Product Vision', 'Enterprise Partnerships'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    email: 'ahmad@encelion.tech',
    initials: 'AZ',
    color: '#00B894',
    order: 1,
  },
  {
    id: 'founder-2',
    name: 'Hamza Faisal',
    role: 'CTO & Co-Founder',
    tag: 'Chief Technology Officer',
    bio: 'Full-stack AI engineer and systems architect with deep expertise in machine learning, NLP, autonomous agents, and scalable cloud infrastructure. Hamza leads the engineering and research teams at Encelion.tech, ensuring cutting-edge technology is delivered with precision and enterprise scalability.',
    image: '/uploads/founder_1792168399823_hamza_png.png',
    expertise: ['Machine Learning', 'NLP & LLMs', 'System Architecture', 'AI Agents'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    email: 'hamza@encelion.tech',
    initials: 'HF',
    color: '#0A1628',
    order: 2,
  },
];

export const STORAGE_KEY = 'encelion_founders_data_v2';
export const FOUNDERS_UPDATED_EVENT = 'encelion:founders_updated';

/**
 * Get stored founders from localStorage, falling back to DEFAULT_FOUNDERS
 */
export function getStoredFounders(): Founder[] {
  if (typeof window === 'undefined') {
    return DEFAULT_FOUNDERS;
  }

  try {
    // Clean up older placeholder keys
    localStorage.removeItem('encelion_founders_data_v1');

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FOUNDERS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Check if old placeholder names are in cache and migrate to Ahmad Zain & Hamza Faisal
      const hasOldPlaceholders = parsed.some(f => f.name === 'Hamza Iqbal' || f.name === 'Usman Tariq');
      if (hasOldPlaceholders) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FOUNDERS));
        return DEFAULT_FOUNDERS;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error reading founders from localStorage:', err);
  }

  return DEFAULT_FOUNDERS;
}

/**
 * Save founders to localStorage and notify all listeners
 */
export function saveStoredFounders(founders: Founder[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(founders));
    // Dispatch custom event for real-time reactivity in current tab
    window.dispatchEvent(new CustomEvent(FOUNDERS_UPDATED_EVENT, { detail: founders }));
  } catch (err) {
    console.error('Error saving founders to localStorage:', err);
  }
}

/**
 * Reset founders back to default initial list
 */
export function resetStoredFounders(): Founder[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('encelion_founders_data_v1');
      window.dispatchEvent(new CustomEvent(FOUNDERS_UPDATED_EVENT, { detail: DEFAULT_FOUNDERS }));
    } catch (err) {
      console.error('Error resetting founders:', err);
    }
  }
  return DEFAULT_FOUNDERS;
}
