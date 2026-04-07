import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import PortfolioCard from '../components/PortfolioCard';

var SERVER_URL = "https://throughmylens-backend.onrender.com";

function Portfolio(props) {
  var [filter, setFilter] = useState('all');
  var [photos, setPhotos] = useState([]);
  var [status, setStatus] = useState('loading photos...');
  var [statusType, setStatusType] = useState('is-loading');

  useEffect(function() {
    fetch(SERVER_URL + '/api/photos')
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        setPhotos(data);
        setStatus('loaded ' + data.length + ' photos');
        setStatusType('is-success');
      })
      .catch(function() {
        setStatus('error: could not load photos');
        setStatusType('is-error');
      });
  }, []);

  var filteredPhotos = [];
  for (var i = 0; i < photos.length; i++) {
    if (filter === 'all' || photos[i].category === filter) {
      filteredPhotos.push(photos[i]);
    }
  }

  return (
    <section className="page-main portfolio-page">
      <section className="portfolio-layout">
        <h2>Full Portfolio</h2>
        <p className="portfolio-lead">Here you can find all of the best photos I have taken in my time as a hobby photographer. You may click on each photo to view more details or for downloading options.</p>

        <div className="portfolio-filter-bar">
          <button className={"portfolio-filter" + (filter === 'all' ? ' is-active' : '')} type="button" onClick={() => setFilter('all')}>All</button>
          <button className={"portfolio-filter" + (filter === 'landscape' ? ' is-active' : '')} type="button" onClick={() => setFilter('landscape')}>Landscape</button>
          <button className={"portfolio-filter" + (filter === 'urban' ? ' is-active' : '')} type="button" onClick={() => setFilter('urban')}>Urban</button>
          <button className={"portfolio-filter" + (filter === 'portrait' ? ' is-active' : '')} type="button" onClick={() => setFilter('portrait')}>Portrait</button>
        </div>

        <p className={"portfolio-status " + statusType}>{status}</p>

        <div className="portfolio-grid">
          {filteredPhotos.map(function(photo) {
            return <PortfolioCard key={photo.id} photo={photo} goTo={props.goTo} />;
          })}
        </div>
      </section>
    </section>
  );
}

export default Portfolio;
