"use client";

import { useState } from "react";
import { Button } from "./Button";
import { PHONE } from "@/lib/site";

/** "We will call you back" form on the Visit page. Nothing is sent anywhere yet. */
export function EnquiryForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="sent">
        <span className="label" style={{ color: "var(--gold-ink)", fontSize: 10.5 }}>Message received</span>
        <p className="title" style={{ fontSize: "clamp(30px, 3vw, 42px)" }}>Thank you. We will call you back.</p>
        <p className="body muted">We are open Monday to Saturday, 10 am to 7.30 pm.</p>
        <div>
          <Button variant="line" onClick={() => setSent(false)}>Send another message</Button>
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
          <span className="label">About</span>
          <select name="about"><option>A piece in the case</option><option>A bridal viewing</option><option>A design of my own</option><option>Old gold</option><option>Money exchange</option><option>Something else</option></select>
        </label>
        <label className="fld">
          <span className="label">Best time to call</span>
          <select name="time"><option>Morning</option><option>Afternoon</option><option>Evening</option></select>
        </label>
      </div>
      <label className="fld"><span className="label">Message</span><textarea name="message" placeholder="How can we help?" /></label>
      <div className="form-foot">
        <Button variant="gold" icon type="submit">Send</Button>
        <span className="small muted">Or call {PHONE}</span>
      </div>
    </form>
  );
}
