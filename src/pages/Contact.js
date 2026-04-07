import React from 'react';
import './Contact.css';

var IMG_BASE = "https://csepateltanish.github.io/csce242/projects/part7/images/";

function Contact() {
  return (
    <section className="page-main contact-page">
      <section className="contact-layout">
        <section className="contact-panel">
          <h2>Contact Me</h2>
          <p>If you would like to book a session, collaborate, or ask a question, reach out using the form or contact details below.</p>
          <div className="contact-list">
            <p className="contact-list-item">
              <img className="contact-icon" src={IMG_BASE + "icons/mail_icon.jpeg"} alt="Email icon" />
              tpatel4237@gmail.com
            </p>
            <p className="contact-list-item">
              <img className="contact-icon" src={IMG_BASE + "icons/ig_icon.jpeg"} alt="Instagram icon" />
              tanishpatelphoto
            </p>
          </div>
        </section>

        <section className="contact-panel">
          <h2>Book With Me</h2>
          <p>Send a request and I will reply as soon as possible!</p>
          <form
            className="contact-form"
            action="https://formsubmit.co/tpatel4237@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value="Through My Lens - Contact Form" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://csepateltanish.github.io/throughmylens" />

            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" name="name" placeholder="Your name" required minLength="2" />

            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" name="email" placeholder="you@example.com" required />

            <label htmlFor="contact-subject">Subject</label>
            <input id="contact-subject" type="text" name="subject" placeholder="Session type" required minLength="3" />

            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" placeholder="Tell me about your project" required minLength="10" />

            <button id="contact-submit" type="submit">Submit</button>
          </form>
        </section>
      </section>

      <section className="contact-iframe-layout">
        <section className="contact-panel iframe-panel">
          <h2>Service Area Map</h2>
          <p>Sessions are available across Greenville and most South Carolina locations.</p>
          <div className="iframe-shell">
            <iframe
              src="https://www.google.com/maps?q=Greenville,+SC&output=embed"
              title="Map of Greenville, South Carolina"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        <section className="contact-panel">
          <h2>Session Info</h2>
          <p>Typical booking workflow:</p>
          <ul className="service-list">
            <li>Send your preferred date, location, and session type.</li>
            <li>Receive confirmation details by email.</li>
            <li>Finalize delivery timeline and edited image package.</li>
          </ul>
        </section>
      </section>
    </section>
  );
}

export default Contact;
