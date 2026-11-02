import Thread from './Thread';
import SplitChars from './SplitChars';

export default function Corporate() {
  return (
    <section className="corp wrap" id="corporate">
      <Thread id="th-corp" d="M8 0 L8 30 C8 70 50 56 50 100" />
      <div className="corp-grid above">
        <div className="corp-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/corporate.webp"
            alt="Nine crimson gift boxes with gold ribbons and blank cards in a grid, the centre box open to show truffles"
          />
        </div>
        <div className="corp-copy">
          <p className="eyebrow">Corporate gifting</p>
          <SplitChars className="split-chars" parts="Your name, in gold." />
          <ul className="ticks">
            <li>Your logo on the box sleeve and the card</li>
            <li>Bulk orders for clients, teams and events</li>
            <li>Delivery across Riyadh</li>
          </ul>
          <a className="btn btn-crimson" href="#contact" style={{ alignSelf: 'flex-start' }}>Request a quote</a>
        </div>
      </div>
    </section>
  );
}
