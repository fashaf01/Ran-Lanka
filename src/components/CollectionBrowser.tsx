"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { ProductTile } from "./ProductTile";
import { CATEGORIES, PIECES, countIn, getCategory } from "@/lib/catalogue";

type Sort = "case" | "az" | "za";
const PAGE = 12;

export function CollectionBrowser({ initialCat = "all" }: { initialCat?: string }) {
  const [cat, setCat] = useState(getCategory(initialCat) ? initialCat : "all");
  const [sort, setSort] = useState<Sort>("case");
  const [limit, setLimit] = useState(PAGE);

  const cur = getCategory(cat) ?? CATEGORIES[0];
  let list = cat === "all" ? PIECES : PIECES.filter((p) => p.cat === cat);
  if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "za") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
  const visible = list.slice(0, limit);

  const pick = (key: string) => {
    setCat(key);
    setLimit(PAGE);
    window.history.replaceState(null, "", key === "all" ? "/collection" : `/collection?cat=${key}`);
  };

  return (
    <>
      {/* ---------- Page head ---------- */}
      <section className="lampbg" data-theme="lamp" style={{ padding: "32px 0 0" }}>
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="small breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Collection</span>
          </nav>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", justifyContent: "space-between", gap: "32px 64px", marginTop: 28 }}>
            <div style={{ flex: "1 1 480px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p className="label kicker">{cur.kicker}</p>
              <h1 className="title" style={{ margin: "20px 0 0", fontSize: "clamp(44px, 5vw, 72px)" }}>
                {cur.plural}
              </h1>
              <p className="body" style={{ margin: "20px 0 0", color: "var(--ink-muted)", maxWidth: "48ch", fontSize: 17 }}>
                {cur.text}
              </p>
              <p className="label" style={{ margin: "28px 0 0", color: "var(--ink-muted)", fontSize: 10.5 }}>
                22 karat · 916 hallmark · Weighed in front of you
              </p>
            </div>
            <div className="framed" style={{ flex: "0 1 460px", minWidth: 0, aspectRatio: "4 / 3" }}>
              <img src={cur.img} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Filters ---------- */}
      <section className="lampbg" data-theme="lamp" style={{ padding: "40px 0 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px 32px", padding: "20px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <div role="group" aria-label="Choose a kind of piece" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {CATEGORIES.map((c) => (
                <button key={c.key} type="button" className="rl-reset label chip-btn" aria-pressed={cat === c.key} onClick={() => pick(c.key)}>
                  {c.name} <span style={{ opacity: 0.7, marginLeft: 4 }}>{countIn(c.key)}</span>
                </button>
              ))}
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="label" style={{ color: "var(--ink-muted)", fontSize: 10.5 }}>
                Sort
              </span>
              <select className="sel" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="case">As in the case</option>
                <option value="az">Name, A to Z</option>
                <option value="za">Name, Z to A</option>
              </select>
            </label>
          </div>
          <p className="small muted" style={{ margin: "20px 0 0" }} aria-live="polite">
            Showing {visible.length} of {list.length} pieces
          </p>
        </div>
      </section>

      {/* ---------- Grid ---------- */}
      <section className="lampbg" data-theme="lamp" style={{ padding: "28px 0 clamp(64px, 6vw, 88px)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))", gap: "36px 22px" }}>
            {visible.map((p) => (
              <ProductTile key={p.id} piece={p} kind={`${getCategory(p.cat)?.kind ?? ""} · ${p.no}`} />
            ))}
          </div>
          {list.length > visible.length ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 52 }}>
              <Button variant="line" onClick={() => setLimit(limit + PAGE)}>
                Show more pieces
              </Button>
              <span className="small muted">
                {visible.length} of {list.length}
              </span>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
