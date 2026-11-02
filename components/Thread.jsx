// One segment of the gold ribbon that runs through the page.
export default function Thread({ id, d }) {
  return (
    <svg className="thread" id={id} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path className="t-edge" d={d} />
      <path className="t-base" d={d} />
      <path className="t-sheen" d={d} />
    </svg>
  );
}
