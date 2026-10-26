"use client";

import { useEffect, useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export type ColomboStatus = {
  /** Index into Monday..Sunday. */
  day: number;
  dayName: string;
  /** Minutes since midnight in Colombo. */
  mins: number;
  open: boolean;
};

/** The shop's clock: Monday to Saturday, 10 am to 7.30 pm, Colombo time. */
export function colomboStatus(date = new Date()): ColomboStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Colombo",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayName = get("weekday");
  const mins = 60 * Number(get("hour")) + Number(get("minute"));
  return {
    day: DAYS.indexOf(dayName),
    dayName,
    mins,
    open: dayName !== "Sunday" && mins >= 600 && mins < 1170,
  };
}

/** Null until the browser has read the clock, so server and first client render agree. */
export function useColomboStatus(): ColomboStatus | null {
  const [status, setStatus] = useState<ColomboStatus | null>(null);
  useEffect(() => {
    const tick = () => setStatus(colomboStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

/** The rate is posted every shop morning, so a Sunday still shows Saturday's. */
export function postedDay(s: ColomboStatus | null) {
  if (!s) return "Saturday";
  return s.dayName === "Sunday" ? "Saturday" : s.dayName;
}

export function openLine(s: ColomboStatus | null) {
  if (!s) return "Open Monday to Saturday, 10 am to 7.30 pm";
  return s.open ? "Open now until 7.30 pm" : "Closed now · Open Monday to Saturday from 10 am";
}

/** The two-line headline: "Open now." / "Until 7.30 pm today." */
export function statusHeadline(s: ColomboStatus | null, poyaNote = false) {
  if (!s) return { a: "Open Monday to Saturday.", b: "10 am to 7.30 pm.", open: true };
  if (s.open) {
    return { a: "Open now.", b: poyaNote ? "Until 7.30 pm today, unless it is a Poya day." : "Until 7.30 pm today.", open: true };
  }
  const b =
    s.dayName === "Sunday" || (s.dayName === "Saturday" && s.mins >= 1170)
      ? "We open Monday at 10 am."
      : s.mins < 600
        ? "We open today at 10 am."
        : "We open tomorrow at 10 am.";
  return { a: "Closed now.", b, open: false };
}
