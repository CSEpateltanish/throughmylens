import React from 'react';
import './Home.css';
import GenreRow from '../components/GenreRow';

var IMG_BASE = "https://raw.githubusercontent.com/CSEpateltanish/CSEpateltanish.github.io/e086ee4f0dc148596f488b2acc6944f351c89780/csce242/projects/part7/images/";

var landscapeImages = [
  IMG_BASE + "photos/landscape/River_rocks.jpeg",
  IMG_BASE + "photos/landscape/Leaves.jpeg",
  IMG_BASE + "photos/landscape/Train.jpeg"
];

var urbanImages = [
  IMG_BASE + "photos/urban/Toronto.jpeg",
  IMG_BASE + "photos/urban/GTR.jpeg",
  IMG_BASE + "photos/urban/D3CDA060-869B-4C09-81CB-EFBE82F7540F_1_105_c.jpeg"
];

var portraitImages = [
  IMG_BASE + "photos/portrait/Coco.jpeg",
  IMG_BASE + "photos/portrait/dog.jpg",
  IMG_BASE + "photos/portrait/giraffe.jpg"
];

function Home(props) {
  return (
    <section className="page-main">
      <section className="hero">
        <div className="hero-text">
          <h2 className="hero-heading">Moments Worth Remembering</h2>
          <p className="hero-description">Nature. Cities. Action.</p>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Photography Gallery</h2>
        <p>Capturing moments through a lens. Student photographer based in the Southeast, exploring the intersection of nature, city scapes, and anything that may catch the eyes.</p>
        <div className="genre-list">
          <GenreRow
            title="Landscape"
            description="Natural scenes focused on texture, light, and details across rivers, trails, and open spaces."
            images={landscapeImages}
          />
          <GenreRow
            title="Urban"
            description="City-focused photography capturing movement, architecture, cars, and the energy of street scenes."
            images={urbanImages}
          />
          <GenreRow
            title="Portrait"
            description="Portrait work centered on expression, colors, pets, and personal moments."
            images={portraitImages}
          />
        </div>
        <a className="portfolio-button" href="#portfolio" onClick={() => props.goTo('portfolio')}>View Portfolio</a>
        <p className="portfolio-note">(If you're interested in downloading any images, you may do so by going to my portfolio)</p>
      </section>

      <section className="contact-section">
        <img className="headshot" src={IMG_BASE + "headshot/GIT.jpeg"} alt="Tanish Patel headshot" />
        <div className="contact-copy">
          <h3>Get In Touch</h3>
          <p className="contact-intro">Interested in working together? Have a question?<br />Feel free to reach out</p>
          <p className="contact-row">
            <img className="contact-icon" src={IMG_BASE + "icons/mail_icon.jpeg"} alt="Email icon" />
            tpatel4237@gmail.com
          </p>
          <p className="contact-row">
            <img className="contact-icon" src={IMG_BASE + "icons/ig_icon.jpeg"} alt="Instagram icon" />
            tanishpatelphoto
          </p>
        </div>
      </section>
    </section>
  );
}

export default Home;
