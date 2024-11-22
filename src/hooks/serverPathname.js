import { headers } from 'next/headers';

export default function useServerPathname() {
  // Get the headers to access the URL
  const headersList = headers();
  const referer = headersList.get('referer');
  
  // Parse the pathname from the referer URL
  if (referer) {
    const url = new URL(referer);
    return url.pathname;
  }
  
  // Fallback: return "/" if no referer is present
  return '/';
}