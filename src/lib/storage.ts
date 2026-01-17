// Simple hardcoded distraction sites
const DEFAULT_DISTRACTION_SITES = [
  'twitter.com',
  'x.com',
  'instagram.com',
  'facebook.com',
  'reddit.com',
  'youtube.com',
  'tiktok.com',
];

export async function getDistractionSites(): Promise<string[]> {
  return DEFAULT_DISTRACTION_SITES;
}
