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

const allowedRichTextTags = new Set([
  'p',
  'strong',
  'b',
  'em',
  'i',
  's',
  'strike',
  'h1',
  'h2',
  'h3',
  'ul',
  'ol',
  'li',
  'blockquote',
  'br',
  'hr',
  'a',
]);

const isSafeHref = (href: string) => /^(https?:|mailto:|tel:|\/|#)/i.test(href);

/**
 * Preserve the limited HTML produced by the admin rich text editor while
 * removing scripts, inline handlers, styles, and unknown elements.
 */
export const sanitizeRichHtml = (html: string): string => {
  if (!html) return '';
  if (typeof document === 'undefined') return sanitizeInput(html);

  const source = document.createElement('template');
  source.innerHTML = html;

  const cleanNode = (node: Node): Node | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent || '');
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const element = node as HTMLElement;
    const tag = element.tagName.toLowerCase();

    if (!allowedRichTextTags.has(tag)) {
      const fragment = document.createDocumentFragment();
      element.childNodes.forEach((child) => {
        const cleanChild = cleanNode(child);
        if (cleanChild) fragment.appendChild(cleanChild);
      });
      return fragment;
    }

    const cleanElement = document.createElement(tag);

    if (tag === 'a') {
      const href = element.getAttribute('href') || '';
      if (href && isSafeHref(href)) {
        cleanElement.setAttribute('href', href);
        cleanElement.setAttribute('rel', 'noopener noreferrer');
        if (/^https?:/i.test(href)) cleanElement.setAttribute('target', '_blank');
      }
    }

    element.childNodes.forEach((child) => {
      const cleanChild = cleanNode(child);
      if (cleanChild) cleanElement.appendChild(cleanChild);
    });

    return cleanElement;
  };

  const result = document.createElement('div');
  source.content.childNodes.forEach((child) => {
    const cleanChild = cleanNode(child);
    if (cleanChild) result.appendChild(cleanChild);
  });

  return result.innerHTML;
};
