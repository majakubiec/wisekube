export const SITE = {
  name: 'Wisekube',
  tagline: 'A kube: six walls and a space to challenge and create. Tech, code and everything in between.',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Lab', href: '/lab/' },
    { label: 'About', href: '/about/' },
  ],
};

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
