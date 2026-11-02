'use client';

import { useRef, useState } from 'react';

// Demo form: validates and thanks the visitor, but does not send anything yet.
// Connect handleSubmit to EmailJS, Formspree or an API route when a real shop goes live.
export default function ContactForm() {
  const [status, setStatus] = useState('');
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    if (!name || !phone) {
      setStatus('Add your name and phone number so we can reply.');
      (name ? phoneRef : nameRef).current.focus();
      return;
    }
    setStatus(`Thanks, ${name.split(' ')[0]}. This is a demo page, so nothing was sent yet.`);
  }

  return (
    <form className="form" id="contact-form" noValidate onSubmit={handleSubmit}>
      <label htmlFor="c-name">Name<input ref={nameRef} id="c-name" name="name" type="text" autoComplete="name" required /></label>
      <label htmlFor="c-phone">Phone<input ref={phoneRef} id="c-phone" name="phone" type="tel" autoComplete="tel" required /></label>
      <label htmlFor="c-occ">
        Occasion
        <select id="c-occ" name="occasion" defaultValue="Wedding">
          <option>Wedding</option>
          <option>Newborn</option>
          <option>Graduation</option>
          <option>Eid</option>
          <option>Corporate</option>
        </select>
      </label>
      <label htmlFor="c-msg">Message<textarea id="c-msg" name="message" rows={4}></textarea></label>
      <button className="btn btn-crimson" type="submit">Send message</button>
      <p className="done" id="c-done" role="status">{status}</p>
    </form>
  );
}
