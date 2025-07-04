export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export function parseInternalLinks(content: string): string[] {
  const internalLinkRegex = /\[\[([a-zA-Z0-9\-]+)\]\]/g;
  const matches = content.match(internalLinkRegex) || [];
  return matches.map(match => match.slice(2, -2)); // Extract slug from [[slug]]
}
