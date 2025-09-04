export type Locale = 'ar' | 'en' | 'es';
export type Direction = 'ltr' | 'rtl';

export interface Language {
  code: Locale;
  name: string;
  dir: Direction;
}

export interface CategorySet {
  name: string;
  options: string[];
}

export interface Idea {
  id?: string;
  timestamp?: number;
  title: string;
  description: string;
  features: string[];
  targetAudience: string;
}
