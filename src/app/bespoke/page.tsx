import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bespoke", description: "Bring a sketch or a photo. We design it, weigh it and make it for you in 22 karat gold." };

export default function BespokePage() {
  return (
    <div className="page" data-page="bespoke">
      <header className="wrap phead">
        <div className="phead-copy" style={{ "maxWidth": "1000px" }}>
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Bespoke</span></nav>
          <p className="kicker">Bespoke</p>
          <h1 className="d1 rv"><span className="ln"><span>Your sketch,</span></span><span className="ln"><span>in <em>22 karat gold.</em></span></span></h1>
          <p className="lead">Bring a drawing, a photo or a piece you have seen and liked. We design it, weigh it and make it for you, and you approve every step.</p>
        </div>
      </header>
      <section className="sec-s" style={{ "paddingTop": "0" }} aria-label="From sketch to gold">
        <div className="wrap split">
          <div className="compare clip" data-cursor="Drag">
            <img src="/img/starburst-sketch.webp" alt="A pencil drawing of the Starburst pendant" />
            <img className="gold" src="/img/starburst-gold.webp" alt="The finished Starburst pendant in 22 karat gold" />
            <span className="lab l">Sketch</span>
            <span className="lab r">Gold</span>
            <input type="range" id="cmp-bespoke" min="0" max="100" defaultValue="50" aria-label="Compare the sketch with the finished pendant" />
            <span className="cut"><i>Drag</i></span>
          </div>
          <div style={{ "display": "grid", "gap": "24px" }}>
            <h2 className="d3">From your idea to the counter</h2>
            <ol className="steps fade">
              <li><h3>Bring your idea</h3><p>A drawing, a photo, or a piece you want to make your own.</p></li>
              <li><h3>See the design</h3><p>We draw it up and tell you its weight in pawn before anything is made.</p></li>
              <li><h3>Agree the price</h3><p>Based on that day's gold rate, so you know the cost up front.</p></li>
              <li><h3>Collect your piece</h3><p>Finished in 22 karat gold and ready for you at the showroom.</p></li>
            </ol>
          </div>
        </div>
      </section>
      <section className="sec raise" aria-label="What to bring">
        <div className="wrap">
          <div className="sec-head"><div className="rv"><p className="kicker">What to bring</p><h2 className="d2"><span className="ln"><span>Anything that</span></span><span className="ln"><span>shows the <em>idea.</em></span></span></h2></div></div>
          <ul className="tiles fade">
            <li><h3>A sketch or photo</h3><p>Any drawing helps, however rough. A picture from a magazine or your phone works too.</p></li>
            <li><h3>A piece for reference</h3><p>An old piece whose shape or pattern you like, so we can see it in the hand.</p></li>
            <li><h3>Your size</h3><p>Your ring or bangle size if you know it. We can measure you at the counter if not.</p></li>
            <li><h3>A weight or budget</h3><p>Tell us roughly how many pawn, or how much you want to spend, and we design to it.</p></li>
          </ul>
        </div>
      </section>
      <section className="sec" id="design-form" aria-label="Start your design">
        <div className="wrap form-wrap">
          <div style={{ "display": "grid", "gap": "22px" }}>
            <p className="kicker">Start your design</p>
            <h2 className="d2 rv"><span className="ln"><span>Tell us what</span></span><span className="ln"><span>you have <em>in mind.</em></span></span></h2>
            <p className="body">We will turn this into a message you can send us. Bring your sketch or photo when you come in.</p>
          </div>
          <form className="compose" data-greet="Hello Ranlanka, I would like a piece designed and made." autoComplete="on">
            <div className="fgrid">
              <label className="fld"><span>Your name</span><input id="d-name" name="Name" autoComplete="name" required /></label>
              <label className="fld"><span>Phone</span><input id="d-phone" name="Phone" type="tel" autoComplete="tel" /></label>
              <label className="fld"><span>Kind of piece</span><select id="d-kind" name="Piece"><option value="">Choose one</option><option>Ring</option><option>Pendant</option><option>Earrings</option><option>Bangle</option><option>Necklace</option><option>Chain or bracelet</option><option>Thali or mangalsutra</option><option>Something else</option></select></label>
              <label className="fld"><span>Weight or budget</span><input id="d-budget" name="Weight or budget" placeholder="For example, 2 pawn" /></label>
              <label className="fld wide"><span>Describe your idea</span><textarea id="d-idea" name="Idea" rows={4} /></label>
            </div>
            <div><button className="btn solid" type="submit">Prepare my message</button></div>
            <div className="composed" hidden></div>
          </form>
        </div>
      </section>
    </div>
  );
}
