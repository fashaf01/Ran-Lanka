import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="wrap nf">
      <p className="kicker">404</p>
      <h1 className="h1">This page has gone back in the safe.</h1>
      <p className="lede">The link may be old, or the piece may have found its owner.</p>
      <div className="nf-links">
        <Link className="btn btn--dark" href="/shop">Shop the jewellery</Link>
        <Link className="btn btn--line" href="/">Home</Link>
      </div>
    </section>
  );
}
