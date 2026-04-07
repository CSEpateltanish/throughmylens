import React from 'react';
import './About.css';

var IMG_BASE = "https://csepateltanish.github.io/csce242/projects/part7/images/";

function About() {
  return (
    <section className="page-main about-page">
      <section className="about-layout">
        <h2>About Me</h2>
        <p>I'm a third-year student studying Computer Information Systems with a focus on Business Administration. Although being a pilot is my career goal, my interest in photography explores the beauty in everyday moments, from sweeping landscapes to framed urban scenes.</p>
        <p>What truly kickstarted it all was that as a kid, my uncle gave me a DSLR and ever since then it sparked a curiosity of what could be captured behind a lens.</p>
        <p>When I'm not behind the camera, you can find me working at the airport fueling planes, exploring blue skies, or learning about new techniques in lightroom.</p>
        <div className="about-photo-circle">
          <img src={IMG_BASE + "headshot/AM_Headshot.jpeg"} alt="Tanish Patel portrait headshot" />
        </div>
      </section>
    </section>
  );
}

export default About;
