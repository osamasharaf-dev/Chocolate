import Thread from './Thread';
import SplitChars from './SplitChars';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section className="contact wrap" id="contact">
      <Thread id="th-contact" d="M50 0 L50 100" />
      <div className="contact-grid above">
        <div className="info">
          <p className="eyebrow">Contact</p>
          <SplitChars className="split-chars" parts="Let's tie it up." />
          <p style={{ maxWidth: 420, fontSize: 18 }}>
            Tell us the occasion and how many boxes. We reply with ideas and a quote.
          </p>
          <div className="place">
            <div className="map" aria-hidden="true"><b></b></div>
            <strong>Riyadh, Saudi Arabia</strong>
            <span>Store address and opening hours go here</span>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
