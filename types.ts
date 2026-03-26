export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface Expertise {
  id: string;
  number: string;
  title: string;
  points: string[];
}

export interface NewsItem {
  id: number;
  date: string;
  title: string;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type SupportedLocale = 'en' | 'pt' | 'es';

export interface LocalizedValue<T> {
  en: T;
  pt: T;
  es: T;
}

export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
  hash?: string;
}

export interface HeroMediaConfig {
  type: 'video' | 'image';
  src: string;
  poster?: string;
}

export interface SectionEyebrowBlock {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface NarrativeStep {
  title: string;
  description: string;
  detail?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface MetricCard {
  label: string;
  value: string;
  note?: string;
}

export interface PageRailLink {
  label: string;
  href: string;
}

export interface ChatMessage {
  text: string;
  links?: PageRailLink[];
}

export interface NewsCard {
  category: string;
  date: string;
  title: string;
  summary: string;
  href: string;
}

export interface PortfolioEntry {
  slug: string;
  title: LocalizedValue<string>;
  summary: LocalizedValue<string>;
  sector: LocalizedValue<string>;
  country: string;
  website: string;
  image: string;
  featured?: boolean;
}
