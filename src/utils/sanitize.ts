/**
 * Strip HTML tags from a string to prevent XSS.
 */
export const sanitizeInput = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/<[^>]*>/g, '')   // Remove HTML tags
    .replace(/&lt;/g, '<')     // Decode common entities (then re-strip)
    .replace(/&gt;/g, '>')
    .replace(/<[^>]*>/g, '')   // Second pass after decode
    .trim();
};

/**
 * Recursively sanitize all string values in an object.
 */
export const sanitizeObject = <T extends Record<string, unknown>>(obj: T): T => {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    const value = sanitized[key];
    if (typeof value === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeInput(value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }
  return sanitized;
};
