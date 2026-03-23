import React, { useState } from 'react';
import './GenreRow.css';

function GenreRow(props) {
  var [index, setIndex] = useState(0);

  function showPrev() {
    var newIndex = (index - 1 + props.images.length) % props.images.length;
    setIndex(newIndex);
  }

  function showNext() {
    var newIndex = (index + 1) % props.images.length;
    setIndex(newIndex);
  }

  return (
    <section className="genre-row">
      <div className="genre-copy">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="genre-slideshow">
        <div className="slides">
          <button className="slide-button arrow-prev" type="button" onClick={showPrev}>&lt;</button>
          <button className="slide-button arrow-next" type="button" onClick={showNext}>&gt;</button>
          {props.images.map(function(img, i) {
            return (
              <img
                key={i}
                src={img}
                alt={props.title + " photo"}
                className={i === index ? '' : 'hidden'}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default GenreRow;
