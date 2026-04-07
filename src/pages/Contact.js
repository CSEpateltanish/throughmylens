import React, { useState } from 'react';
import './Contact.css';

var IMG_BASE = "https://csepateltanish.github.io/csce242/projects/part7/images/";
var SEND_URL = "https://formsubmit.co/ajax/tpatel4237@gmail.com";

function Contact() {
  var [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  var [status, setStatus] = useState('');
  var [statusType, setStatusType] = useState('');
  var [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('sending...');
    setStatusType('is-loading');

    var info = new FormData();
    info.append('name', form.name);
    info.append('email', form.email);
    info.append('subject', form.subject);
    info.append('message', form.message);
    info.append('_subject', 'contact form message');
    info.append('_captcha', 'false');

    fetch(SEND_URL, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: info
    })
      .then(function(res) {
        if (!res.ok) { throw new Error('send failed'); }
        return res.json();
      })
      .then(function() {
        setForm({ name: '', email: '', subject: '', message: '' });
        setStatus('message sent');
        setStatusType('is-success');
        setSubmitting(false);
      })
      .catch(function() {
        setStatus('error sending message');
        setStatusType('is-error');
        setSubmitting(false);
      });
  }

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
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required minLength="2" />

            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />

            <label htmlFor="contact-subject">Subject</label>
            <input id="contact-subject" type="text" name="subject" placeholder="Session type" value={form.subject} onChange={handleChange} required minLength="3" />

            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" placeholder="Tell me about your project" value={form.message} onChange={handleChange} required minLength="20" />

            <button id="contact-submit" type="submit" disabled={submitting}>Submit</button>
            <p className={"contact-form-status " + statusType}>{status}</p>
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
