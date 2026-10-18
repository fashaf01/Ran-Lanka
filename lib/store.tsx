'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { productOf, priceOf, type Metal } from './catalogue';

export type Line = { key: string; id: string; metal: Metal; size?: string; qty: number };

type Store = {
  lines: Line[];
  count: number;
  subtotal: number;
  add: (id: string, metal: Metal, size?: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
  wish: string[];
  toggleWish: (id: string) => void;
};

const Ctx = createContext<Store | null>(null);
const BAG = 'rl-bag';
const WISH = 'rl-wish';

const read = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or storage full: the bag still works for this visit */
  }
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [wish, setWish] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

  useEffect(() => {
    setLines(read<Line[]>(BAG, []).filter((l) => productOf(l.id)));
    setWish(read<string[]>(WISH, []).filter((id) => productOf(id)));
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) write(BAG, lines); }, [lines, loaded]);
  useEffect(() => { if (loaded) write(WISH, wish); }, [wish, loaded]);

  const add = useCallback((id: string, metal: Metal, size?: string, qty = 1) => {
    const key = [id, metal, size ?? ''].join('|');
    setLines((ls) => {
      const hit = ls.find((l) => l.key === key);
      return hit ? ls.map((l) => (l.key === key ? { ...l, qty: Math.min(9, l.qty + qty) } : l)) : [...ls, { key, id, metal, size, qty }];
    });
    setBagOpen(true);
  }, []);
  const setQty = useCallback((key: string, qty: number) => {
    setLines((ls) => (qty < 1 ? ls.filter((l) => l.key !== key) : ls.map((l) => (l.key === key ? { ...l, qty: Math.min(9, qty) } : l))));
  }, []);
  const remove = useCallback((key: string) => setLines((ls) => ls.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);
  const toggleWish = useCallback((id: string) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])), []);

  const value = useMemo<Store>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => {
      const p = productOf(l.id);
      return p ? n + priceOf(p).total * l.qty : n;
    }, 0);
    return { lines, count, subtotal, add, setQty, remove, clear, bagOpen, setBagOpen, wish, toggleWish };
  }, [lines, wish, bagOpen, add, setQty, remove, clear, toggleWish]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
};
