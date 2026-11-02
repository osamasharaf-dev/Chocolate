export default function Reveal() {
  return (
    <section className="reveal" id="reveal" aria-label="Inside the box">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="poster"
        src="/frames/f094.webp"
        alt="An open crimson gift box of fifteen chocolate truffles in gold cups, its gold ribbon untied"
      />
      <canvas id="rv-canvas" aria-hidden="true"></canvas>
      <div className="entry" aria-hidden="true"></div>
      <div className="rv-steps">
        <div className="rv-step rv-1">
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>The ribbon</p>
          <h2>The knot<br />slips.</h2>
          <p>Every box leaves our counter tied by hand in satin the colour of saffron.</p>
        </div>
        <div className="rv-step rv-2">
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>The lid</p>
          <h2>The lid<br />lifts.</h2>
          <p>Inside, each piece sits in its own gold cup, so it arrives the way it left.</p>
        </div>
        <div className="rv-step rv-3">
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>The box</p>
          <h2>Fifteen<br />pieces.</h2>
          <p>Dark, milk, pistachio, saffron and rose. Choose them yourself or let us curate.</p>
          <a className="btn btn-gold" href="#build" style={{ alignSelf: 'flex-start' }}>Build your box</a>
        </div>
      </div>
      <div className="rv-count" aria-hidden="true">
        <span>UNWRAPPING</span>
        <span className="bar"><i></i></span>
      </div>
    </section>
  );
}
