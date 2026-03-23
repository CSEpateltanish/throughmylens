import React from 'react';
import './PortfolioCard.css';

function PortfolioCard(props) {
  return (
    <div className="portfolio-card">
      <div className="portfolio-card-image">
        <img src={props.photo.image} alt={props.photo.title} />
        <p className="portfolio-card-caption">{props.photo.title}</p>
      </div>
      <button className="portfolio-card-button" type="button" onClick={() => props.goTo('photo', props.photo)}>
        View Details
      </button>
    </div>
  );
}

export default PortfolioCard;
