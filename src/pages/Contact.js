import React from 'react';
import './Contact.css';

var IMG_BASE = "https://raw.githubusercontent.com/CSEpateltanish/CSEpateltanish.github.io/e086ee4f0dc148596f488b2acc6944f351c89780/csce242/projects/part7/images/";

function Contact() {
  return (
    <section className="page-main contact-page">
      <section className="contact-layout">
        <section className="contact-panel">
          <h2>Contact Me</h2>
          <p>If you would like to book a session, collaborate, or ask a question, reach out using the contact details below.</p>
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
