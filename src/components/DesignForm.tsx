"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

/** "Start a design" request. Nothing is sent anywhere yet: wire `onSubmit` to the shop's inbox. */
export function DesignForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="sent">
        <span className="label" style={{ color: "var(--gold-ink)", fontSize: 10.5 }}>Idea received</span>
        <p className="title" style={{ fontSize: "clamp(30px, 3vw, 42px)" }}>Thank you. We will call you to talk it through.</p>
        <p className="body muted">Bring the sketch or the piece when you come in. We draw it with you before anything is made.</p>
        <div>
          <Button variant="line" onClick={() => setSent(false)}>Send another idea</Button>
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
        <label className="fld">
          <span className="label">Kind of piece</span>
          <select name="kind"><option>Necklace</option><option>Earrings</option><option>Bangle</option><option>Ring</option><option>Pendant</option><option>Thali</option><option>Something else</option></select>
        </label>
        <label className="fld">
          <span className="label">Rough weight</span>
          <select name="weight"><option>Not sure yet</option><option>Under 2 pawns</option><option>2 to 5 pawns</option><option>5 to 10 pawns</option><option>More than 10 pawns</option></select>
        </label>
      </div>
      <label className="fld"><span className="label">Describe it</span><textarea name="describe" placeholder="What it is for, the look you want, a piece you would like remade" /></label>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
        <label className="file small">
          <Icon name="sketch" size={20} />
          <span>Attach a sketch or photo</span>
          <input type="file" name="photo" accept="image/*" aria-label="Attach a sketch or photo" />
        </label>
        <span className="small muted">A phone photo is fine</span>
      </div>
      <div className="form-foot" style={{ paddingTop: 8 }}>
        <Button variant="gold" icon type="submit">Send my idea</Button>
        <span className="small muted">We reply on shop days</span>
      </div>
    </form>
  );
}
