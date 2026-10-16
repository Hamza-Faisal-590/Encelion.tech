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
    name: 'Hamza Iqbal',
    role: 'CEO & Co-Founder',
    tag: 'Chief Executive Officer',
    bio: 'Visionary entrepreneur and AI strategist with 8+ years of experience building enterprise software. Hamza founded Encelion.tech with the mission to make advanced AI accessible to every business. He leads the overall company direction, client strategy, and innovation roadmap.',
    image: '/founder_ceo.png',
    expertise: ['AI Strategy', 'Business Development', 'Product Vision', 'Enterprise Partnerships'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    email: 'hamza@encelion.tech',
    initials: 'HI',
    color: '#00B894',
    order: 1,
  },
  {
    id: 'founder-2',
    name: 'Usman Tariq',
    role: 'CTO & Co-Founder',
    tag: 'Chief Technology Officer',
    bio: 'Full-stack AI engineer and systems architect with deep expertise in machine learning, NLP, and autonomous agents. Usman leads the engineering and research teams at Encelion.tech, ensuring cutting-edge technology is delivered with precision and scalability.',
    image: null,
    expertise: ['Machine Learning', 'NLP & LLMs', 'System Architecture', 'AI Agents'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    email: 'usman@encelion.tech',
    initials: 'UT',
    color: '#0A1628',
    order: 2,
  },
];

const STORAGE_KEY = 'encelion_founders_data_v1';
export const FOUNDERS_UPDATED_EVENT = 'encelion:founders_updated';

/**
 * Get stored founders from localStorage, falling back to DEFAULT_FOUNDERS
 */
export function getStoredFounders(): Founder[] {
  if (typeof window === 'undefined') {
    return DEFAULT_FOUNDERS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FOUNDERS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
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
      window.dispatchEvent(new CustomEvent(FOUNDERS_UPDATED_EVENT, { detail: DEFAULT_FOUNDERS }));
    } catch (err) {
      console.error('Error resetting founders:', err);
    }
  }
  return DEFAULT_FOUNDERS;
}
