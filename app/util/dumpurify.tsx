import DOMPurify from 'dompurify';

function hasHTMLTags(str: string): boolean {
  return /<[^>]*>/g.test(str);
}

export function SafeContent({ html }: { html: string }) {
  if (!html) return null;

  const isHTML = hasHTMLTags(html);

  if (isHTML) {
    const clean = DOMPurify.sanitize(html);
    return (
      <div
        className="whitespace-pre-wrap leading-relaxed"
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    );
  }

  // Preserve whitespace and render with line breaks
  return <div className="whitespace-pre-wrap leading-relaxed">{html}</div>;
}
