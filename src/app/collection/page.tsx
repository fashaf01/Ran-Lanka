import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CollectionBrowser } from "@/components/CollectionBrowser";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PHONE_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collection",
  description: "Necklaces, bangles, earrings, rings, pendants, chains, bracelets and mangalsutra in 22 karat 916 gold, weighed in front of you in Negombo.",
};

export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams;
  return (
    <>
      <SiteHeader current="/collection" />
      <main>
        <CollectionBrowser initialCat={cat} />

        {/* ======================= CAN'T FIND IT ======================= */}
        <section className="rl-tray rl-tray--plain velvet" data-theme="velvet" style={{ padding: "clamp(48px, 5vw, 72px) 0" }}>
          <div className="wrap" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "28px 64px" }}>
            <div style={{ maxWidth: 640 }}>
              <p className="label kicker">Not in the case?</p>
              <h2 className="title t-md" style={{ fontSize: "clamp(32px, 3.4vw, 48px)" }}>We will draw it with you, and make it here.</h2>
              <p className="body muted" style={{ margin: "16px 0 0" }}>Bring a sketch, a photograph or a family piece. You know its weight before anything is made.</p>
            </div>
            <div className="btn-row">
              <Button variant="gold" icon="sketch" href="/bespoke">Design your own</Button>
              <Button variant="line" icon="phone" href={PHONE_HREF}>Call the counter</Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
