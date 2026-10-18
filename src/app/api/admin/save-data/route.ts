import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

function generateServicesFile(services: any[]): string {
  return `export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  iconName: string;
  heroColor: string;
  description: string;
  longDescription: string;
  benefits: string[];
  features?: { title: string; desc: string }[];
  techStack?: string[];
  stats?: { value: string; label: string }[];
  status?: 'ACTIVE' | 'DRAFT';
}

export const DEFAULT_SERVICES: ServiceItem[] = ${JSON.stringify(services, null, 2)};

const STORAGE_KEY = 'encelion_services_catalog_v1';
export const SERVICES_UPDATED_EVENT = 'encelion:services_updated';

export function getStoredServices(): ServiceItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_SERVICES;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SERVICES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Error reading services from localStorage:', err);
  }

  return DEFAULT_SERVICES;
}

export function saveStoredServices(services: ServiceItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    window.dispatchEvent(new CustomEvent(SERVICES_UPDATED_EVENT, { detail: services }));
  } catch (err) {
    console.error('Error saving services to localStorage:', err);
  }
}

export function resetStoredServices(): ServiceItem[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(SERVICES_UPDATED_EVENT, { detail: DEFAULT_SERVICES }));
    } catch (err) {
      console.error('Error resetting services:', err);
    }
  }
  return DEFAULT_SERVICES;
}
`;
}

function generateProductsFile(products: any[]): string {
  return `export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  desc: string;
  iconName: string;
  category: string;
  badge?: string;
  price?: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
  color?: string;
  status?: 'ACTIVE' | 'DRAFT';
}

export const DEFAULT_PRODUCTS: ProductItem[] = ${JSON.stringify(products, null, 2)};

const STORAGE_KEY = 'encelion_products_catalog_v1';
export const PRODUCTS_UPDATED_EVENT = 'encelion:products_updated';

export function getStoredProducts(): ProductItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_PRODUCTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PRODUCTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Error reading products from localStorage:', err);
  }

  return DEFAULT_PRODUCTS;
}

export function saveStoredProducts(products: ProductItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT, { detail: products }));
  } catch (err) {
    console.error('Error saving products to localStorage:', err);
  }
}

export function resetStoredProducts(): ProductItem[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT, { detail: DEFAULT_PRODUCTS }));
    } catch (err) {
      console.error('Error resetting products:', err);
    }
  }
  return DEFAULT_PRODUCTS;
}
`;
}

function generateFoundersFile(founders: any[]): string {
  return `export interface Founder {
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

export const DEFAULT_FOUNDERS: Founder[] = ${JSON.stringify(founders, null, 2)};

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
`;
}

function generateContactInfoFile(contactInfo: any): string {
  return `export interface ContactInfo {
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

export const DEFAULT_CONTACT_INFO: ContactInfo = ${JSON.stringify(contactInfo, null, 2)};

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
`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (!type || data === undefined) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let fileContent = '';
    let targetFileName = '';

    switch (type) {
      case 'services':
        fileContent = generateServicesFile(data);
        targetFileName = 'services.ts';
        break;
      case 'products':
        fileContent = generateProductsFile(data);
        targetFileName = 'products.ts';
        break;
      case 'founders':
        fileContent = generateFoundersFile(data);
        targetFileName = 'founders.ts';
        break;
      case 'contactInfo':
        fileContent = generateContactInfoFile(data);
        targetFileName = 'contactInfo.ts';
        break;
      default:
        return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    const targetFilePath = path.join(dataDir, targetFileName);
    fs.writeFileSync(targetFilePath, fileContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: `Successfully synchronized ${targetFileName} to project disk!`,
      file: targetFileName,
    });
  } catch (err: any) {
    console.error('Error auto-saving data to file:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to save data to file' },
      { status: 500 }
    );
  }
}
