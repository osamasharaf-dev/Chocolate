// Renders text as words of individual characters (.w > .ch) so GSAP can animate each letter.
// Pass `parts` as an array of strings or { text, em: true } for highlighted words.
export default function SplitChars({ as: Tag = 'h2', className = '', parts }) {
  const list = typeof parts === 'string' ? [parts] : parts;
  const label = list.map((p) => (typeof p === 'string' ? p : p.text)).join('');
  let key = 0;

  const renderWords = (text) =>
    text.split(/(\s+)/).filter(Boolean).map((w) => {
      if (/^\s+$/.test(w)) return ' ';
      return (
        <span className="w" key={key++}>
          {Array.from(w).map((c, i) => (
            <span className="ch" key={i}>{c}</span>
          ))}
        </span>
      );
    });

  return (
    <Tag className={className} aria-label={label}>
      {list.map((p, i) =>
        typeof p === 'string' ? (
          <span key={`p${i}`} aria-hidden="true">{renderWords(p)}</span>
        ) : (
          <em key={`p${i}`} aria-hidden="true">{renderWords(p.text)}</em>
        )
      )}
    </Tag>
  );
}
