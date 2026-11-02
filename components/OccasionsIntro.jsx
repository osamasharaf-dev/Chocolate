import Thread from './Thread';
import SplitChars from './SplitChars';

export default function OccasionsIntro() {
  return (
    <section className="occ-intro wrap" id="occasions">
      <Thread id="th-intro" d="M50 0 C50 46 88 34 88 100" />
      <div className="inner above">
        <p className="eyebrow">Occasions</p>
        <SplitChars className="split-chars" parts={['Gifts for every ', { text: 'moment.', em: true }]} />
        <p>Four celebrations, four boxes, one knot. Keep scrolling to move through them.</p>
      </div>
    </section>
  );
}
