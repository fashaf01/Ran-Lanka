import type { Metadata } from "next";

export const metadata: Metadata = { title: "Visit", description: "Ranlanka Jewellery, 192 Main Street, Negombo. Open Monday to Saturday, 10:00 am to 7:30 pm." };

export default function VisitPage() {
  return (
    <div className="page" data-page="visit">
      <header className="wrap phead">
        <div className="phead-copy" style={{ "maxWidth": "1100px" }}>
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Visit</span></nav>
          <p className="kicker">Visit</p>
          <h1 className="d1 rv"><span className="ln"><span>Gold looks best</span></span><span className="ln"><span><em>in person.</em></span></span></h1>
          <p className="lead">Come in, hold it to the light and take your time. We are on Main Street in the centre of Negombo, a short drive from Bandaranaike International Airport.</p>
        </div>
      </header>
      <section className="sec-s" style={{ "paddingTop": "0" }} aria-label="Showroom details">
        <div className="wrap vi-grid">
          <div className="vi-col">
            <h3>Showroom</h3>
            <address>Ranlanka Jewellery<br />192 Main Street<br />Negombo 11500, Sri Lanka</address>
            <div className="acts" style={{ "marginTop": "28px" }}><a className="btn solid" href="https://www.google.com/maps/search/?api=1&amp;query=Ranlanka%2C%20192%20Main%20Street%2C%20Negombo" target="_blank" rel="noopener">Get directions</a><a className="btn" href="https://www.instagram.com/ranlankanegombo/" target="_blank" rel="noopener">Instagram</a></div>
          </div>
          <div className="vi-col">
            <h3>Opening hours</h3>
            <p className="status"><i></i><span>Monday to Saturday</span></p>
            <ul className="hours">
              <li data-d="1"><span>Monday</span><span>10:00 am – 7:30 pm</span></li>
              <li data-d="2"><span>Tuesday</span><span>10:00 am – 7:30 pm</span></li>
              <li data-d="3"><span>Wednesday</span><span>10:00 am – 7:30 pm</span></li>
              <li data-d="4"><span>Thursday</span><span>10:00 am – 7:30 pm</span></li>
              <li data-d="5"><span>Friday</span><span>10:00 am – 7:30 pm</span></li>
              <li data-d="6"><span>Saturday</span><span>10:00 am – 7:30 pm</span></li>
              <li data-d="0"><span>Sunday</span><span>Closed</span></li>
              <li><span>Poya days</span><span>Closed</span></li>
            </ul>
          </div>
          <div className="vi-col">
            <h3>Call or email</h3>
            <ul className="contact">
              <li><a href="tel:0312222202">031 222 2202</a><button className="copy" type="button" data-copy="031 222 2202">Copy</button></li>
              <li><a href="tel:0312238383">031 223 8383</a><button className="copy" type="button" data-copy="031 223 8383">Copy</button></li>
              <li><span className="v">ranlankanegombo@gmail.com</span><button className="copy" type="button" data-copy="ranlankanegombo@gmail.com">Copy</button></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="sec raise" id="enquiry" aria-label="Send an enquiry">
        <div className="wrap form-wrap">
          <div style={{ "display": "grid", "gap": "22px" }}>
            <p className="kicker">Send an enquiry</p>
            <h2 className="d2 rv"><span className="ln"><span>Ask us</span></span><span className="ln"><span><em>anything.</em></span></span></h2>
            <p className="body">About a piece, a design idea, today's rates or a bridal viewing. We will turn this into a message you can send us.</p>
            <div className="faq" style={{ "marginTop": "14px" }}>
              <details><summary>How is gold weighed?</summary><p>In pawn. One pawn is 8 grams, and every piece is weighed and priced that way.</p></details>
              <details><summary>Do you buy old gold?</summary><p>Yes. Bring it to the counter. We weigh it in front of you and tell you what we can offer before you decide.</p></details>
              <details><summary>When are you closed?</summary><p>On Sundays and on Poya days. We are open Monday to Saturday, 10:00 am to 7:30 pm.</p></details>
            </div>
          </div>
          <form className="compose" data-greet="Hello Ranlanka," autoComplete="on">
            <div className="fgrid">
              <label className="fld"><span>Your name</span><input id="e-name" name="Name" autoComplete="name" required /></label>
              <label className="fld"><span>Phone</span><input id="e-phone" name="Phone" type="tel" autoComplete="tel" /></label>
              <label className="fld wide"><span>I am asking about</span><input id="e-about" name="About" /></label>
              <label className="fld wide"><span>Message</span><textarea id="e-msg" name="Message" rows={4} /></label>
            </div>
            <div><button className="btn solid" type="submit">Prepare my message</button></div>
            <div className="composed" hidden></div>
          </form>
        </div>
      </section>
    </div>
  );
}
