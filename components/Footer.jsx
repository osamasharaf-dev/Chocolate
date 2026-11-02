export default function Footer() {
  return (
    <footer className="foot wrap">
      <svg className="bow" viewBox="0 0 240 150" aria-hidden="true">
        <rect x="107" y="0" width="26" height="40" fill="#F2B705" />
        <path className="bow-l" d="M120 62 C78 10 18 18 34 58 C44 82 92 74 120 62Z" fill="none" stroke="#F2B705" strokeWidth="20" />
        <path className="bow-r" d="M120 62 C162 10 222 18 206 58 C196 82 148 74 120 62Z" fill="none" stroke="#F2B705" strokeWidth="20" />
        <path d="M112 66 L84 146" stroke="#F2B705" strokeWidth="20" />
        <path d="M128 66 L156 146" stroke="#F2B705" strokeWidth="20" />
        <rect x="104" y="44" width="32" height="36" rx="9" fill="#C99400" />
      </svg>
      <div className="row">
        <div>
          <a href="#reveal">The Box</a>
          <a href="#occasions">Occasions</a>
          <a href="#build">Build a box</a>
          <a href="#corporate">Corporate</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="word" aria-hidden="true">NOUÉ</div>
      <small>© NOUÉ · Chocolate gifts, Riyadh</small>
    </footer>
  );
}
