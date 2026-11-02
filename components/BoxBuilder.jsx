'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Thread from './Thread';
import SplitChars from './SplitChars';

const FLAVOURS = [
  { id: 'dark', name: 'Dark 72%', c: '#2E1408' },
  { id: 'milk', name: 'Milk', c: '#8A4B25' },
  { id: 'pistachio', name: 'Pistachio', c: '#8DBF4A' },
  { id: 'saffron', name: 'Saffron', c: '#F2B705' },
  { id: 'rose', name: 'Rose', c: '#E86A8A' },
  { id: 'date', name: 'Date & caramel', c: '#A0521D' },
];
const SIZES = [4, 9, 16];
const DEFAULT_NOTE = 'Mabrook. This one is all yours.';

export default function BoxBuilder() {
  const [size, setSize] = useState(9);
  const [picked, setPicked] = useState({ dark: true, pistachio: true, saffron: true });
  const [note, setNote] = useState('');
  const [added, setAdded] = useState(false);
  const trayRef = useRef(null);
  const mounted = useRef(false);

  const chosen = FLAVOURS.filter((f) => picked[f.id]);
  const palette = chosen.length ? chosen.map((f) => f.c) : ['#4A2412'];
  const cols = size === 4 ? 2 : size === 9 ? 3 : 4;

  // Pop the truffles in whenever the box changes (not on first render).
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !trayRef.current) return;
    gsap.from(trayRef.current.children, {
      scale: 0, duration: 0.5, ease: 'back.out(2)', stagger: { each: 0.03, from: 'center' },
    });
  }, [size, picked]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2200);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <section className="build wrap" id="build">
      <Thread id="th-build" d="M88 0 L88 8 C88 26 8 16 8 36 L8 100" />
      <div className="build-grid above">
        <div className="box-preview" aria-live="polite">
          <div
            className="tray"
            id="tray"
            ref={trayRef}
            style={{ gridTemplateColumns: `repeat(${cols},minmax(0,1fr))` }}
          >
            {Array.from({ length: size }, (_, i) => (
              <div className="truffle" key={`${size}-${i}`} style={{ background: palette[i % palette.length] }} />
            ))}
          </div>
          <div className="card-note">
            <small>Gift note</small>
            <span id="note-out">{note.trim() || DEFAULT_NOTE}</span>
          </div>
        </div>

        <form className="builder" id="builder" onSubmit={(e) => e.preventDefault()}>
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>Build your box</p>
          <SplitChars className="split-chars" parts="Tie your own box." />

          <fieldset className="field">
            <legend>Box size</legend>
            <div className="chips" id="sizes">
              {SIZES.map((s) => (
                <button
                  type="button"
                  className="chip"
                  key={s}
                  aria-pressed={size === s ? 'true' : 'false'}
                  onClick={() => setSize(s)}
                >
                  {s} pieces
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="field">
            <legend>Flavours</legend>
            <div className="chips" id="flavours">
              {FLAVOURS.map((f) => (
                <button
                  type="button"
                  className="chip"
                  key={f.id}
                  aria-pressed={picked[f.id] ? 'true' : 'false'}
                  onClick={() => setPicked((p) => ({ ...p, [f.id]: !p[f.id] }))}
                >
                  <span className="dot" style={{ background: f.c }}></span>
                  {f.name}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label className="lbl" htmlFor="note">Gift note</label>
            <input
              className="note-input"
              id="note"
              type="text"
              maxLength={60}
              placeholder="Write a few words for the card"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="summary">
            <button type="button" className="btn btn-gold" id="add" onClick={() => setAdded(true)}>
              {added ? 'Added to order' : 'Add to order'}
            </button>
            <output id="summary" htmlFor="sizes flavours">
              {size} pieces · {chosen.length} {chosen.length === 1 ? 'flavour' : 'flavours'}
            </output>
          </div>
        </form>
      </div>
    </section>
  );
}
