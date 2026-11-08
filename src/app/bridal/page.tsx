import type { Metadata } from "next";
import { Grid } from "@/components/Cards";
import { BRIDAL } from "@/lib/data";

export const metadata: Metadata = { title: "Bridal", description: "Bridal necklaces, bangles and thali chains in 22 karat gold. Book a bridal viewing at Ranlanka, Negombo." };

export default function BridalPage() {
  return (
    <div className="page" data-page="bridal">
      <header className="bottle">
        <div className="wrap phead">
          <div className="phead-grid wide" style={{ "alignItems": "center" }}>
            <div className="phead-copy">
              <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Bridal</span></nav>
              <p className="kicker">Bridal · <span lang="si" style={{ "letterSpacing": "0", "textTransform": "none", "fontSize": "14px" }}>මනාලිය</span></p>
              <h1 className="d1 rv"><span className="ln"><span>For the day</span></span><span className="ln"><span>the whole family</span></span><span className="ln"><span><em>remembers.</em></span></span></h1>
              <p className="lead">Bring your family and take your time. We bring out the trays, try every piece with the saree, and size the bangles on the wrist.</p>
              <div className="acts"><button className="btn solid" type="button" data-to="#bridal-form">Request a bridal viewing</button></div>
            </div>
            <div className="plate ph-plate clip"><img src="/img/bride.webp" alt="A bride in a red and green silk saree with a gold choker, a long temple necklace and stacked bangles" style={{ "objectPosition": "50% 20%" }} /></div>
          </div>
        </div>
      </header>
      <section className="sec stone" aria-label="The bridal edit">
        <div className="wrap">
          <div className="sec-head">
            <div className="rv"><p className="kicker">The bridal edit</p><h2 className="d2"><span className="ln"><span>Chosen for</span></span><span className="ln"><span>the <em>wedding.</em></span></span></h2></div>
            <p className="body fade">Necklaces, bangles and mangalsutras for the bride. Mix them as you like, or ask us about a thali chain made to your family's design.</p>
          </div>
          <Grid name="bridal" ids={BRIDAL} />
        </div>
      </section>
      <section className="sec" aria-label="A bridal viewing">
        <div className="wrap">
          <div className="sec-head"><div className="rv"><p className="kicker">A bridal viewing</p><h2 className="d2"><span className="ln"><span>How it works</span></span><span className="ln"><span>at the <em>counter.</em></span></span></h2></div></div>
          <ol className="steps row fade">
            <li><h3>Book a time</h3><p>Tell us the date and the pieces you have in mind, so the trays are ready.</p></li>
            <li><h3>Bring the family</h3><p>Sit together at the counter and try every piece with the saree.</p></li>
            <li><h3>Size and fit</h3><p>Bangles on the wrist, rings while you wait, chain lengths cut at the counter.</p></li>
            <li><h3>Collect</h3><p>Every piece is weighed in front of you and priced at the day's rate.</p></li>
          </ol>
          <div className="trio" style={{ "marginTop": "clamp(56px,7vw,100px)" }}>
            <figure className="plate clip"><img src="/img/life-bride2.webp" alt="A bride laughing in a pink saree and layered gold" /><figcaption>The trial</figcaption></figure>
            <figure className="plate clip"><img src="/img/life-bride1.webp" alt="A bride in a layered gold necklace, surrounded by her family's hands" /><figcaption>The family</figcaption></figure>
            <figure className="plate clip"><img src="/img/life-bride3.webp" alt="A bride in a gold-bordered saree on her wedding day" /><figcaption>The day</figcaption></figure>
          </div>
        </div>
      </section>
      <section className="sec raise" id="bridal-form" aria-label="Request a bridal viewing">
        <div className="wrap form-wrap">
          <div style={{ "display": "grid", "gap": "22px" }}>
            <p className="kicker">Request a viewing</p>
            <h2 className="d2 rv"><span className="ln"><span>Tell us about</span></span><span className="ln"><span>the <em>day.</em></span></span></h2>
            <p className="body">We will turn your answers into a message you can send us by email or read to us on the phone.</p>
          </div>
          <form className="compose" data-greet="Hello Ranlanka, I would like to book a bridal viewing." autoComplete="on">
            <div className="fgrid">
              <label className="fld"><span>Your name</span><input id="b-name" name="Name" autoComplete="name" required /></label>
              <label className="fld"><span>Phone</span><input id="b-phone" name="Phone" type="tel" autoComplete="tel" /></label>
              <label className="fld"><span>Wedding date</span><input id="b-date" name="Wedding date" type="date" /></label>
              <label className="fld"><span>Tradition</span><select id="b-trad" name="Tradition"><option value="">Choose one</option><option>Kandyan</option><option>Low-country Sinhala</option><option>Tamil</option><option>Muslim</option><option>Christian</option><option>Other</option></select></label>
              <fieldset className="fset"><legend>Pieces in mind</legend><div className="checks"><label><input type="checkbox" id="b-p1" name="Pieces" value="Necklaces" />Necklaces</label><label><input type="checkbox" id="b-p2" name="Pieces" value="Bangles" />Bangles</label><label><input type="checkbox" id="b-p3" name="Pieces" value="Earrings" />Earrings</label><label><input type="checkbox" id="b-p4" name="Pieces" value="Thali and mangalsutra" />Thali and mangalsutra</label><label><input type="checkbox" id="b-p5" name="Pieces" value="Rings" />Rings</label></div></fieldset>
              <label className="fld wide"><span>Anything else</span><textarea id="b-notes" name="Notes" rows={3} /></label>
            </div>
            <div><button className="btn solid" type="submit">Prepare my message</button></div>
            <div className="composed" hidden></div>
          </form>
        </div>
      </section>
    </div>
  );
}
