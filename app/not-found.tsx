export default function NotFound() {
  return (
    <section className="sec nf">
      <div className="wrap">
        <p className="kicker">404</p>
        <h1 className="display" style={{ marginTop: 24 }}>This page has gone back in the safe.</h1>
        <p className="lede" style={{ marginTop: 24 }}>The link may be old. Everything Ranlanka has to show is on one page now.</p>
        <a className="btn btn--gold" href="/" style={{ marginTop: 36 }}>Back to Ranlanka</a>
      </div>
    </section>
  );
}
