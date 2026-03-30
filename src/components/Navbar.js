import React, { useState } from 'react';
import './Navbar.css';

var IMG_BASE = "https://raw.githubusercontent.com/CSEpateltanish/CSEpateltanish.github.io/e086ee4f0dc148596f488b2acc6944f351c89780/csce242/projects/part7/images/";

function Navbar(props) {
  const [navOpen, setNavOpen] = useState(false);

  function handleNavClick(page) {
    props.goTo(page);
    setNavOpen(false);
  }

  return (
    <section className="topbar">
      <div className="brand">
        <img className="camera-icon" src={IMG_BASE + "icons/camera_icon.jpeg"} alt="Camera icon" />
        <h1 className="brand-title">Through My Lens <span>| Tanish Patel</span></h1>
      </div>
      <button className="nav-toggle" type="button" onClick={() => setNavOpen(!navOpen)}>
        Menu
      </button>
      <div className={`main-nav${navOpen ? ' show-nav' : ''}`}>
        <a href="#home" className={props.currentPage === 'home' ? 'current-link' : ''} onClick={() => handleNavClick('home')}>Home</a>
        <a href="#portfolio" className={props.currentPage === 'portfolio' ? 'current-link' : ''} onClick={() => handleNavClick('portfolio')}>Portfolio</a>
        <a href="#about" className={props.currentPage === 'about' ? 'current-link' : ''} onClick={() => handleNavClick('about')}>About</a>
        <a href="#contact" className={props.currentPage === 'contact' ? 'current-link' : ''} onClick={() => handleNavClick('contact')}>Contact</a>
      </div>
    </section>
  );
}

export default Navbar;
