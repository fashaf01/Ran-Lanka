import type { Metadata } from "next";
import type React from "react";
import { FxTable } from "@/components/Cards";
import { FX } from "@/lib/data";

export const metadata: Metadata = { title: "Money exchange", description: "Money exchange in Negombo with no commission. More than fifty currencies at the Ranlanka counter on Main Street." };

export default function ExchangePage() {
  return (
    <div className="page" data-page="exchange">
      <header className="wrap phead">
        <div className="phead-grid one">
          <div className="phead-copy">
            <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Money exchange</span></nav>
            <p className="kicker">Money exchange</p>
            <h1 className="d1 rv"><span className="ln"><span>Fifty currencies.</span></span><span className="ln"><span><em>No commission.</em></span></span></h1>
          </div>
          <div style={{ "display": "grid", "gap": "18px", "justifyItems": "start", "maxWidth": "620px" }}>
            <span className="stamp">Sample figures</span>
            <p className="lead">At the same counter as the gold. Rates change through the day, so call 031 222 2202 to check a rate before you come in.</p>
          </div>
        </div>
      </header>
      <section className="sec-s" style={{ "paddingTop": "0" }} aria-label="Rates and converter">
        <div className="wrap rt-grid">
          <div>
            <p className="fl">LKR per unit · Sample figures</p>
            <div className="tbl"><FxTable /></div>
            <p className="note" style={{ "marginTop": "14px" }}>Other currencies at the counter. The rate on the board is the rate you get.</p>
          </div>
          <form className="calc" id="fxcalc" autoComplete="off">
            <h3>What will I get?</h3>
            <div className="seg" role="radiogroup" aria-label="Direction">
              <input type="radio" name="fxdir" id="fx-sell" value="sell" defaultChecked />
              <label htmlFor="fx-sell">I have foreign cash</label>
              <input type="radio" name="fxdir" id="fx-buy" value="buy" />
              <label htmlFor="fx-buy">I need foreign cash</label>
            </div>
            <div className="calc-row">
              <div className="field" style={{ "flex": "2 1 160px" }}><label className="fl" htmlFor="fx-amt">Amount</label><input id="fx-amt" type="number" inputMode="decimal" min="0" step="1" defaultValue="100" /></div>
              <div className="field" style={{ "flex": "1 1 120px" }}><label className="fl" htmlFor="fx-cur">Currency</label><select id="fx-cur" defaultValue="USD">
                {FX.map(([c, n]) => <option key={c} value={c}>{c} · {n}</option>)}
              </select></div>
            </div>
            <div><span className="fl" id="fx-outlab">You receive</span><output id="fx-out" htmlFor="fx-amt fx-cur">LKR 29,740</output><p className="conv" id="fx-conv"></p></div>
          </form>
        </div>
      </section>
      <section className="sec raise" aria-label="How exchange works">
        <div className="wrap">
          <div className="sec-head"><div className="rv"><p className="kicker">At the counter</p><h2 className="d2"><span className="ln"><span>Change money</span></span><span className="ln"><span>where you buy <em>gold.</em></span></span></h2></div></div>
          <ol className="steps row fade" style={{ "--n": "3" } as React.CSSProperties}>
            <li><h3>Check the rate</h3><p>Rates move through the day. Call 031 222 2202 before you come if you want today's figure.</p></li>
            <li><h3>Come to the counter</h3><p>The same counter as the gold, at 192 Main Street, Negombo, a short drive from the airport.</p></li>
            <li><h3>No commission</h3><p>The rate on the board is the rate you get, with nothing taken off.</p></li>
          </ol>
        </div>
      </section>
    </div>
  );
}
