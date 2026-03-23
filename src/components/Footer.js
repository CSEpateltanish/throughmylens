import React from 'react';
import './Footer.css';

function Footer(props) {
  return (
    <section className="site-footer">
      <div className="footer-nav">
        <a href="#home" onClick={() => props.goTo('home')}>Home</a>
        <span>|</span>
        <a href="#portfolio" onClick={() => props.goTo('portfolio')}>Portfolio</a>
        <span>|</span>
        <a href="#about" onClick={() => props.goTo('about')}>About</a>
        <span>|</span>
        <a href="#contact" onClick={() => props.goTo('contact')}>Contact</a>
      </div>
      <p className="footer-copy">&copy; 2026 Tanish Patel. All rights reserved.</p>
    </section>
  );
}

export default Footer;
