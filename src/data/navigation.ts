import { NavItem } from '../../types';

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { id: 'home', labelKey: 'nav.home', href: '/' },
  { id: 'services', labelKey: 'nav.services', href: '/services' },
  { id: 'about', labelKey: 'nav.about', href: '/about' },
  { id: 'portfolio', labelKey: 'nav.portfolio', href: '/portfolio' },
  { id: 'contact', labelKey: 'nav.contact', href: '/contact' },
];

export const HOME_STORY_ANCHORS: NavItem[] = [
  { id: 'story-hero', labelKey: 'nav.story.intro', href: '/#home-hero', hash: 'home-hero' },
  { id: 'story-use-cases', labelKey: 'nav.story.projects', href: '/#home-use-cases', hash: 'home-use-cases' },
  { id: 'story-values', labelKey: 'nav.story.services', href: '/#home-values', hash: 'home-values' },
  { id: 'story-globe', labelKey: 'nav.story.globe', href: '/#home-contact', hash: 'home-contact' },
];
