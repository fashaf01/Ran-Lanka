import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = { title: "Gold rate", description: "Today's 22K and 24K gold rate per pawn at Ranlanka, Negombo, a calculator for any weight, and selling old gold." };

export default function GoldRatePage() {
  return (
    <div className="page" data-page="gold-rate">
      <header className="wrap phead">
        <div className="phead-grid">
          <div className="phead-copy">
            <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Gold rate</span></nav>
            <p className="kicker">Today at the counter</p>
            <h1 className="d1 rv"><span className="ln"><span>The gold rate</span></span><span className="ln"><span><em>today.</em></span></span></h1>
          </div>
          <div style={{ "display": "grid", "gap": "18px", "justifyItems": "start" }}>
            <span className="stamp">Sample figures</span>
            <p className="lead">Rates are posted at the counter every morning. These are sample figures for this preview, so call 031 222 2202 for today's numbers.</p>
          </div>
        </div>
      </header>
      <section className="sec-s" style={{ "paddingTop": "0" }} aria-label="Rates and calculator">
        <div className="wrap rt-grid">
          <div>
            <p className="fl">Gold per pawn · 8 grams</p>
            <div className="big-rate">
              <div><span className="k">22K</span><span className="v"><small>LKR</small><span data-count="312000">312,000</span></span><span className="per">LKR 39,000 per gram</span></div>
              <div><span className="k">24K</span><span className="v"><small>LKR</small><span data-count="340000">340,000</span></span><span className="per">LKR 42,500 per gram</span></div>
            </div>
            <div className="tbl" style={{ "marginTop": "44px" }}>
              <table className="ktab">
                <caption className="sr">Karat and purity</caption>
                <thead><tr><th scope="col">Karat</th><th scope="col">Gold in 1,000 parts</th><th scope="col">Used for</th></tr></thead>
                <tbody>
                  <tr><th scope="row">24K</th><td><b>999</b></td><td>Bars and coins. Too soft for daily wear.</td></tr>
                  <tr className="ours"><th scope="row">22K</th><td><b>916</b></td><td>Every piece in our showroom.</td></tr>
                  <tr><th scope="row">21K</th><td><b>875</b></td><td>Some imported jewellery.</td></tr>
                  <tr><th scope="row">18K</th><td><b>750</b></td><td>Settings for diamonds and fine stones.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rt-side">
            <form className="calc" id="calc" autoComplete="off">
              <h3>What does a weight cost today?</h3>
              <div className="calc-row">
                <div className="seg" role="radiogroup" aria-label="Karat"><input type="radio" name="karat" id="k22" value="22" defaultChecked /><label htmlFor="k22">22K</label><input type="radio" name="karat" id="k24" value="24" /><label htmlFor="k24">24K</label></div>
                <div className="seg" role="radiogroup" aria-label="Unit"><input type="radio" name="unit" id="ug" value="g" defaultChecked /><label htmlFor="ug">Grams</label><input type="radio" name="unit" id="up" value="p" /><label htmlFor="up">Pawn</label></div>
              </div>
              <div className="field"><label className="fl" htmlFor="weight">Weight</label><input id="weight" type="number" inputMode="decimal" min="0" step="0.1" defaultValue="16" /></div>
              <div><span className="fl">Estimated gold value</span><output id="value" htmlFor="weight">LKR 624,000</output><p className="conv" id="conv">16 g is 2 pawn. Gold value only, at the sample rate.</p></div>
            </form>
            <ul className="tiles" style={{ "gridTemplateColumns": "repeat(2,minmax(0,1fr))" }}>
              <li><span className="si" lang="si">පවුම</span><h3>1 pawn · 8 g</h3><p>The weight every gold rate in Sri Lanka is quoted in.</p></li>
              <li><h3>2 pawn · 16 g</h3><p>LKR 624,000 in 22K gold at the sample rate.</p></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="sec raise" id="old-gold" aria-label="Old gold">
        <div className="wrap">
          <div className="sec-head end">
            <div className="rv"><p className="kicker">Old gold</p><h2 className="d2"><span className="ln"><span>Sell it, or turn it</span></span><span className="ln"><span>into something <em>new.</em></span></span></h2></div>
            <div className="acts" style={{ "justifySelf": "end" }}><a className="btn" href="/visit">Bring it in</a></div>
          </div>
          <ol className="steps row fade" style={{ "--n": "3" } as React.CSSProperties}>
            <li><h3>Bring it to the counter</h3><p>A broken chain, a single earring, a piece you no longer wear.</p></li>
            <li><h3>We weigh it in front of you</h3><p>You see the scale and the weight, and we tell you what we can offer before you decide.</p></li>
            <li><h3>Take the money, or a new piece</h3><p>Or have it remade into something you will wear.</p></li>
          </ol>
        </div>
      </section>
      <section className="sec" aria-label="Questions">
        <div className="wrap form-wrap">
          <div style={{ "display": "grid", "gap": "18px" }}><p className="kicker">Questions</p><h2 className="d2 rv"><span className="ln"><span>How gold</span></span><span className="ln"><span>is <em>priced.</em></span></span></h2></div>
          <div className="faq fade">
            <details><summary>How is the price of a piece worked out?</summary><p>It starts with the weight of gold in the piece at that day's rate. Ask at the counter for the full price of any piece, including stones and workmanship.</p></details>
            <details><summary>Why do the rates change every day?</summary><p>They follow the world gold price and the rupee. We check them each morning and post them at the counter.</p></details>
            <details><summary>Is every piece 22 karat?</summary><p>Yes. Every piece in our showroom is 22 karat, 916 parts gold in every 1,000.</p></details>
          </div>
        </div>
      </section>
    </div>
  );
}
