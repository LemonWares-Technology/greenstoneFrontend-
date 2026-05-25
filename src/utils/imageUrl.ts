/**
 * Converts a relative or absolute image URL to a full URL
 * @param url - The image URL from the API (can be relative or absolute)
 * @returns Full URL to the image
 */
export const getImageUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  
  // If already a full URL (starts with http:// or https://), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Vite-served local assets already resolve to root-relative paths.
  if (url.startsWith('/assets/') || url.startsWith('/src/assets/') || url.startsWith('/images/')) {
    return url;
  }
  
  // If it's a relative path, prepend the API base URL
  const baseUrl = 'https://api-ldsv1.greenstoneng.com';
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  
  return `${baseUrl}${cleanPath}`;
};
