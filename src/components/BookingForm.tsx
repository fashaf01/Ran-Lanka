"use client";

import { useState } from "react";
import { Button } from "./Button";
import { PHONE } from "@/lib/site";

const WANTS = ["Necklace", "Earrings", "Bangles", "Thali", "Rings", "Pendant"];

/** Bridal viewing request. Nothing is sent anywhere yet: wire `onSubmit` to the shop's inbox. */
export function BookingForm() {
  const [sent, setSent] = useState(false);
  const [picked, setPicked] = useState<string[]>(["Necklace", "Bangles"]);
  const toggle = (n: string) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  if (sent) {
    return (
      <div className="sent">
        <span className="label" style={{ color: "var(--gold-ink)", fontSize: 10.5 }}>Request received</span>
        <p className="title" style={{ fontSize: "clamp(30px, 3vw, 42px)" }}>Thank you. We will call you to agree a time.</p>
        <p className="body muted">We are open Monday to Saturday, 10 am to 7.30 pm. If it is urgent, call {PHONE}.</p>
        <div>
          <Button variant="line" onClick={() => setSent(false)}>Send another request</Button>
        </div>
      </div>
    );
  }
  return (
    <form
      className="form-stack"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-grid">
        <label className="fld"><span className="label">Your name</span><input type="text" name="name" placeholder="Name" autoComplete="name" required /></label>
        <label className="fld"><span className="label">Phone</span><input type="tel" name="phone" placeholder="07X XXX XXXX" autoComplete="tel" required /></label>
        <label className="fld"><span className="label">Wedding date</span><input type="date" name="date" /></label>
        <label className="fld">
          <span className="label">Who is coming</span>
          <select name="party"><option>Just me</option><option>Two of us</option><option>Three or four</option><option>Five or more</option></select>
        </label>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <span className="label" style={{ color: "var(--gold-ink)", fontSize: 10 }}>Pieces you would like to see</span>
        <div role="group" aria-label="Pieces you would like to see" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {WANTS.map((n) => (
            <button key={n} type="button" className="rl-reset label chip-btn" aria-pressed={picked.includes(n)} onClick={() => toggle(n)}>
              {n}
            </button>
          ))}
        </div>
      </div>
      <label className="fld"><span className="label">Anything else</span><textarea name="notes" placeholder="The colour of the saree, a look you love, a piece to remake" /></label>
      <div className="form-foot">
        <Button variant="gold" icon type="submit">Request a viewing</Button>
        <span className="small muted">Or call {PHONE}</span>
      </div>
    </form>
  );
}
