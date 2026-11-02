export default function Header() {
  return (
    <header className="site-head wrap" id="top">
      <a className="logo" href="#hero" aria-label="NOUÉ home">
        <span>N</span>
        <svg viewBox="0 0 34 44" aria-hidden="true">
          <rect x="3" y="12" width="28" height="30" rx="4" fill="none" stroke="#FFF6E8" strokeWidth="5" />
          <rect x="14.5" y="12" width="5" height="30" fill="#F2B705" />
          <rect x="3" y="24" width="28" height="5" fill="#F2B705" />
          <path d="M17 12 C11 2 4 5 8 10 C10 12 14 12 17 12 C20 12 24 12 26 10 C30 5 23 2 17 12Z" fill="#F2B705" />
        </svg>
        <span>UÉ</span>
      </a>
      <nav className="nav" aria-label="Main">
        <a href="#reveal">The Box</a>
        <a href="#occasions">Occasions</a>
        <a href="#build">Build a box</a>
        <a href="#corporate">Corporate</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="btn btn-gold" href="#build">Order a gift</a>
    </header>
  );
}
