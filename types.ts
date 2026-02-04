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