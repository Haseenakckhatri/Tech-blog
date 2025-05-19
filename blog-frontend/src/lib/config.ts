export const STRAPI_API_URL = process.env.STRAPI_API_URL!;
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
export const NEXT_PUBLIC_STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!;

export function getStrapiURL(path: string): string {
  // Make sure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${STRAPI_API_URL}${normalizedPath}`;
}

export function getStrapiMedia(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  return `${NEXT_PUBLIC_STRAPI_API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// Add other utility functions as needed
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}