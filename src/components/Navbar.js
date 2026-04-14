import React, { useState } from 'react';
import './Navbar.css';

var IMG_BASE = "https://csepateltanish.github.io/csce242/projects/part7/images/";

function Navbar(props) {
  var [navOpen, setNavOpen] = useState(false);

  function toggleNav() {
    setNavOpen(!navOpen);
  }

  function goToPage(page) {
    props.goTo(page);
    setNavOpen(false);
  }

  var navClass = "main-nav";
  if (navOpen) {
    navClass = "main-nav show-nav";
  }

  return (
    <section className="topbar">
      <div className="brand">
        <img className="camera-icon" src={IMG_BASE + "icons/camera_icon.jpeg"} alt="Camera icon" />
        <h1 className="brand-title">Through My Lens <span>| Tanish Patel</span></h1>
      </div>

      <button className="nav-toggle" type="button" onClick={toggleNav}>Menu</button>

      <div className={navClass}>
        <a href="#home" className={props.currentPage === 'home' ? 'current-link' : ''} onClick={() => goToPage('home')}>Home</a>
        <a href="#portfolio" className={props.currentPage === 'portfolio' ? 'current-link' : ''} onClick={() => goToPage('portfolio')}>Portfolio</a>
        <a href="#about" className={props.currentPage === 'about' ? 'current-link' : ''} onClick={() => goToPage('about')}>About</a>
        <a href="#community" className={props.currentPage === 'community' ? 'current-link' : ''} onClick={() => goToPage('community')}>Community</a>
        <a href="#contact" className={props.currentPage === 'contact' ? 'current-link' : ''} onClick={() => goToPage('contact')}>Contact</a>
      </div>
    </section>
  );
}

export default Navbar;
