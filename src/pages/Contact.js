import React, { useState } from 'react';
import './Contact.css';

var IMG_BASE = "https://raw.githubusercontent.com/CSEpateltanish/CSEpateltanish.github.io/e086ee4f0dc148596f488b2acc6944f351c89780/csce242/projects/part7/images/";

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('Sending...');
    setStatusType('is-loading');

    fetch('https://formspree.io/f/xpwzjlzn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setStatus("Message sent! I'll get back to you soon.");
          setStatusType('is-success');
          setForm({ name: '', email: '', subject: '', message: '' });
        } else {
          setStatus('Something went wrong. Please try again.');
          setStatusType('is-error');
        }
        setSubmitting(false);
      })
      .catch(() => {
        setStatus('Something went wrong. Please try again.');
        setStatusType('is-error');
        setSubmitting(false);
      });
  }

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
          <h2>Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" value={form.name} onChange={handleChange} minLength="2" required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Subject
              <input type="text" name="subject" value={form.subject} onChange={handleChange} minLength="3" required />
            </label>
            <label>
              Message
              <textarea name="message" value={form.message} onChange={handleChange} minLength="20" required />
            </label>
            <button type="submit" disabled={submitting}>Send Message</button>
            <p className={`contact-form-status ${statusType}`}>{status}</p>
          </form>
        </section>
      </section>

      <section className="contact-iframe-layout">
        <div className="iframe-panel">
          <div className="iframe-shell">
            <iframe
              src="https://www.google.com/maps?q=Greenville,+SC&output=embed"
              title="Greenville SC map"
              allowFullScreen
            />
          </div>
        </div>

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
