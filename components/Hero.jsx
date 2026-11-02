import Thread from './Thread';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-mark" aria-label="NOUÉ">
        <span className="l" aria-hidden="true">N</span>
        <svg className="hero-box" viewBox="0 0 34 44" aria-hidden="true">
          <g className="box-body">
            <rect x="3" y="12" width="28" height="30" rx="3" fill="none" stroke="#FFF6E8" strokeWidth="4.4" />
            <rect x="14.7" y="12" width="4.6" height="32" fill="#F2B705" />
            <rect x="3" y="24.5" width="28" height="4.4" fill="#F2B705" />
          </g>
          <path
            className="box-bow"
            d="M17 12 C11 2 4 5 8 10 C10 12 14 12 17 12 C20 12 24 12 26 10 C30 5 23 2 17 12Z"
            fill="#F2B705"
          />
        </svg>
        <span className="r" aria-hidden="true">UÉ</span>
      </div>
      <div className="hero-thread">
        <Thread id="th-hero" d="M50 0 L50 100" />
        <div className="hero-copy wrap">
          <div>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 18 }}>
              Maison de chocolat · Riyadh
            </p>
            <h1 className="split-lines">
              <span className="line"><span>Gifts,</span></span>
              <span className="line"><span>tied by</span></span>
              <span className="line"><span>hand.</span></span>
            </h1>
          </div>
          <div className="side">
            <p>
              One golden ribbon runs through everything we make, from the first knot to the last piece in the box.
              Scroll and follow it.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center' }}>
              <a className="btn btn-gold" href="#occasions">Find a gift</a>
              <span className="scroll-cue" aria-hidden="true"><i></i>Scroll</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
