import SplitChars from './SplitChars';

const SLIDES = [
  {
    id: 's-wed', cls: 's-wed', title: 'Weddings', titleCls: 't-wed', img: '/img/wedding.webp',
    alt: 'An open crimson box of truffles with two gold wedding rings, white roses and tulle on cream linen',
    eyebrow: '01 of 04 · Weddings',
    text: 'Favours and grand boxes for the day you say yes, finished in gold and made for the whole guest list.',
    link: 'Plan wedding favours →',
  },
  {
    id: 's-new', cls: 's-new', title: 'Newborns', titleCls: 't-new', img: '/img/newborn.webp',
    alt: 'A crimson hat box with a gold bow beside knitted cream baby booties and rose-dusted truffles on blush velvet',
    eyebrow: '02 of 04 · Newborns',
    text: 'Soft little boxes to welcome someone new, with rose-dusted pieces for the visitors who come to meet them.',
    link: 'Welcome a baby →', extra: <div className="edge" aria-hidden="true"></div>,
  },
  {
    id: 's-grad', cls: 's-grad', title: 'Graduation', titleCls: 't-grad', img: '/img/graduation.webp',
    alt: 'A graduation cap and gold tassel on a crimson gift box, a diploma and a snapped chocolate bar',
    eyebrow: '03 of 04 · Graduation',
    text: 'For the cap in the air and the name on the diploma. Boxes that say you did it.',
    link: 'Celebrate a graduate →', extra: <div className="cut" aria-hidden="true"></div>,
  },
  {
    id: 's-eid', cls: 's-eid', title: 'Eid', titleCls: 't-eid', img: '/img/eid.webp',
    alt: 'A glowing brass lantern, a crimson gift box and a gold tray of truffles and dates in warm evening light',
    eyebrow: '04 of 04 · Eid',
    text: 'Trays of truffles and dates for the table, and boxes for every house you visit after prayer.',
    link: 'Order Eid trays →',
  },
];

export default function Occasions() {
  return (
    <section className="occ" aria-label="Occasions">
      <div className="occ-stage" id="occ-stage">
        {SLIDES.map((s) => (
          <article className={`slide ${s.cls}`} id={s.id} key={s.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt={s.alt} />
            <div className="scrim"></div>
            {s.extra}
            <div className="slide-copy">
              <p className="eyebrow">{s.eyebrow}</p>
              <SplitChars as="h3" className={s.titleCls} parts={s.title} />
              <p>{s.text}</p>
              <a href="#contact">{s.link}</a>
            </div>
          </article>
        ))}
        <div className="occ-track" aria-hidden="true"><i></i></div>
        <div className="occ-labels" aria-hidden="true">
          <span className="on">WEDDINGS</span>
          <span>NEWBORNS</span>
          <span>GRADUATION</span>
          <span>EID</span>
        </div>
      </div>
    </section>
  );
}
