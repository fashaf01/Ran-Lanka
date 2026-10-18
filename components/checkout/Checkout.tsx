'use client';

import Link from 'next/link';
import { useState } from 'react';
import { METALS, lkr, priceOf, productOf } from '@/lib/catalogue';
import { useStore, type Line } from '@/lib/store';
import { BagIcon, CheckIcon, LockIcon } from '../Icons';
import { ProductImage } from '../ProductImage';

type Delivery = 'home' | 'showroom';
type Pay = 'card' | 'bank' | 'store';

// Design only: the whole flow works on the page, but no order is sent and no payment is taken.
export function Checkout() {
  const { lines, subtotal, clear } = useStore();
  const [delivery, setDelivery] = useState<Delivery>('home');
  const [pay, setPay] = useState<Pay>('card');
  const [done, setDone] = useState<{ orderRef: string; lines: Line[]; total: number; email: string } | null>(null);

  if (done) return <Confirmed {...done} />;

  if (!lines.length) {
    return (
      <div className="co-empty">
        <BagIcon size={36} />
        <h1 className="h2">Your bag is empty.</h1>
        <p className="lede">Add a piece to your bag and come back here to check out.</p>
        <Link className="btn btn--dark" href="/shop">Shop the jewellery</Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '');
    const orderRef = 'RL-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    setDone({ orderRef, lines, total: subtotal, email });
    clear();
    scrollTo({ top: 0 });
  };

  return (
    <form className="co" onSubmit={submit}>
      <div className="co-main">
        <ol className="co-steps" aria-label="Checkout steps">
          <li className="done"><Link href="/shop">Bag</Link></li>
          <li className="on" aria-current="step">Details</li>
          <li>Confirmation</li>
        </ol>
        <h1 className="h1 co-title">Checkout</h1>

        <section className="co-sec">
          <h2 className="co-h"><span>01</span>Contact</h2>
          <div className="field-row">
            <label className="field"><span className="label">Email</span><input className="inp" name="email" type="email" autoComplete="email" required /></label>
            <label className="field"><span className="label">Phone</span><input className="inp" name="phone" type="tel" autoComplete="tel" required placeholder="07X XXX XXXX" /></label>
          </div>
          <p className="note">We call to confirm every order and the day’s gold rate before anything is charged.</p>
        </section>

        <section className="co-sec">
          <h2 className="co-h"><span>02</span>Delivery</h2>
          <div className="opts">
            <label className={`opt${delivery === 'home' ? ' on' : ''}`}>
              <input type="radio" name="delivery" checked={delivery === 'home'} onChange={() => setDelivery('home')} />
              <span className="opt-t">Insured delivery<small>Anywhere in Sri Lanka, two to four working days, signed for on arrival</small></span>
              <span className="opt-p">Free</span>
            </label>
            <label className={`opt${delivery === 'showroom' ? ' on' : ''}`}>
              <input type="radio" name="delivery" checked={delivery === 'showroom'} onChange={() => setDelivery('showroom')} />
              <span className="opt-t">Collect at the showroom<small>192 Main Street, Negombo. We weigh it with you before you take it home</small></span>
              <span className="opt-p">Free</span>
            </label>
          </div>
          {delivery === 'home' && (
            <div className="co-fields">
              <div className="field-row">
                <label className="field"><span className="label">First name</span><input className="inp" name="first" autoComplete="given-name" required /></label>
                <label className="field"><span className="label">Last name</span><input className="inp" name="last" autoComplete="family-name" required /></label>
              </div>
              <label className="field"><span className="label">Address</span><input className="inp" name="address" autoComplete="street-address" required /></label>
              <div className="field-row">
                <label className="field"><span className="label">City</span><input className="inp" name="city" autoComplete="address-level2" required /></label>
                <label className="field"><span className="label">Postal code</span><input className="inp" name="postcode" autoComplete="postal-code" inputMode="numeric" /></label>
              </div>
            </div>
          )}
          {delivery === 'showroom' && (
            <div className="co-fields">
              <label className="field"><span className="label">Name for collection</span><input className="inp" name="name" autoComplete="name" required /></label>
              <p className="note">Open Monday to Saturday, 10 am to 7.30 pm. Bring your ID when you collect.</p>
            </div>
          )}
        </section>

        <section className="co-sec">
          <h2 className="co-h"><span>03</span>Payment</h2>
          <div className="opts">
            <label className={`opt${pay === 'card' ? ' on' : ''}`}>
              <input type="radio" name="pay" checked={pay === 'card'} onChange={() => setPay('card')} />
              <span className="opt-t">Card<small>Visa, Mastercard, Amex</small></span>
              <span className="opt-cards" aria-hidden="true"><i>VISA</i><i>MC</i><i>AMEX</i></span>
            </label>
            {pay === 'card' && (
              <div className="co-fields co-card">
                <label className="field"><span className="label">Card number</span><input className="inp" name="card" inputMode="numeric" autoComplete="cc-number" placeholder="1234 1234 1234 1234" /></label>
                <div className="field-row">
                  <label className="field"><span className="label">Expiry</span><input className="inp" name="exp" autoComplete="cc-exp" placeholder="MM / YY" /></label>
                  <label className="field"><span className="label">Security code</span><input className="inp" name="cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" /></label>
                </div>
              </div>
            )}
            <label className={`opt${pay === 'bank' ? ' on' : ''}`}>
              <input type="radio" name="pay" checked={pay === 'bank'} onChange={() => setPay('bank')} />
              <span className="opt-t">Bank transfer<small>We send the account details when we call to confirm</small></span>
            </label>
            <label className={`opt${pay === 'store' ? ' on' : ''}`}>
              <input type="radio" name="pay" checked={pay === 'store'} onChange={() => setPay('store')} />
              <span className="opt-t">Pay at the showroom<small>Cash or card when you collect or view the piece</small></span>
            </label>
          </div>
        </section>

        <button type="submit" className="btn btn--dark btn--full co-place"><LockIcon size={16} />Place order · {lkr(subtotal)}</button>
        <p className="note co-demo">This checkout is a design preview. No order is sent and no payment is taken.</p>
      </div>

      <aside className="co-side" aria-label="Order summary">
        <h2 className="label">Order summary</h2>
        <ul className="co-lines">
          {lines.map((l) => {
            const p = productOf(l.id);
            if (!p) return null;
            return (
              <li key={l.key}>
                <span className="co-img"><ProductImage product={p} sizes="72px" /><b>{l.qty}</b></span>
                <span className="co-name">{p.name}<small>{METALS[l.metal].name}{l.size ? ` · Size ${l.size}` : ''}</small></span>
                <span className="co-price">{lkr(priceOf(p).total * l.qty)}</span>
              </li>
            );
          })}
        </ul>
        <dl className="co-sum">
          <div><dt>Subtotal</dt><dd>{lkr(subtotal)}</dd></div>
          <div><dt>{delivery === 'home' ? 'Insured delivery' : 'Collection'}</dt><dd>Free</dd></div>
          <div className="co-total"><dt>Total</dt><dd>{lkr(subtotal)}</dd></div>
        </dl>
        <p className="note">Estimated at today’s gold rate. If the rate moves before we confirm, we tell you the new price first.</p>
      </aside>
    </form>
  );
}

function Confirmed({ orderRef, lines, total, email }: { orderRef: string; lines: Line[]; total: number; email: string }) {
  return (
    <div className="co-done">
      <span className="co-check"><CheckIcon size={28} /></span>
      <p className="kicker">Order {orderRef}</p>
      <h1 className="h1">Thank you.</h1>
      <p className="lede">We would now call you to confirm the day’s gold rate, then send the details to {email || 'your email'}. This is a design preview, so nothing was sent and no payment was taken.</p>
      <ul className="co-lines co-lines--done">
        {lines.map((l) => {
          const p = productOf(l.id);
          return p ? <li key={l.key}><span className="co-img"><ProductImage product={p} sizes="72px" /><b>{l.qty}</b></span><span className="co-name">{p.name}<small>{METALS[l.metal].name}{l.size ? ` · Size ${l.size}` : ''}</small></span><span className="co-price">{lkr(priceOf(p).total * l.qty)}</span></li> : null;
        })}
      </ul>
      <div className="co-sum co-sum--done"><span>Total</span><b>{lkr(total)}</b></div>
      <Link className="btn btn--dark" href="/shop">Continue shopping</Link>
    </div>
  );
}
