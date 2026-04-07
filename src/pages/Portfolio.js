import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import PortfolioCard from '../components/PortfolioCard';

var JSON_URL = "https://csepateltanish.github.io/csce242/photos.json";
var IMG_BASE = "https://csepateltanish.github.io/csce242/projects/part7/";

// photo details not included in the json file
var photoMeta = {
  "landscape-island":    { title: "Island",         date: "May 18, 2024",       location: "Hilton Head, South Carolina",               camera: "Canon EOS Rebel T7" },
  "landscape-waterfall": { title: "Waterfall",      date: "June 2, 2024",       location: "Pisgah Forest, North Carolina",             camera: "Canon EOS Rebel T7" },
  "landscape-leaves":    { title: "Leaves",         date: "October 14, 2021",   location: "Mountains of Vermont",                      camera: "Canon EOS Rebel T7" },
  "landscape-mountains": { title: "Mountains",      date: "July 8, 2024",       location: "Smoky Mountains, Tennessee",                camera: "Canon EOS Rebel T7" },
  "landscape-ocean":     { title: "Ocean",          date: "August 3, 2022",     location: "Horseneck Beach, Dartmouth, Massachusetts", camera: "Canon EOS Rebel T7" },
  "landscape-reedy":     { title: "Reedy",          date: "September 9, 2017",  location: "Falls Park, Greenville, South Carolina",    camera: "Canon EOS Rebel T7" },
  "landscape-river":     { title: "River",          date: "April 21, 2021",     location: "Mountains of Vermont",                      camera: "Canon EOS Rebel T7" },
  "landscape-train":     { title: "Train",          date: "November 11, 2020",  location: "Mt. Washington, Vermont",                   camera: "Canon EOS Rebel T7" },
  "urban-miami":         { title: "Miami",          date: "December 20, 2017",  location: "Miami, Florida",                            camera: "Canon EOS Rebel T7" },
  "urban-miami2":        { title: "Bayside",        date: "December 21, 2017",  location: "Downtown Miami, Florida",                   camera: "Canon EOS Rebel T7" },
  "urban-cola":          { title: "Columbia",       date: "March 3, 2024",      location: "Columbia, South Carolina",                  camera: "Canon EOS Rebel T7" },
  "urban-toronto":       { title: "Toronto",        date: "June 26, 2022",      location: "Toronto, Ontario",                          camera: "Canon EOS Rebel T7" },
  "urban-gvl":           { title: "Greenville",     date: "September 28, 2016", location: "Greenville, South Carolina",                camera: "Canon EOS Rebel T7" },
  "urban-willyb":        { title: "Williams Brice", date: "November 4, 2024",   location: "Cincinnati, Ohio",                          camera: "iPhone 16 Pro Max"  },
  "portrait-capecod":    { title: "Cape",           date: "July 17, 2021",      location: "Cape Cod, Massachusetts",                   camera: "Canon EOS Rebel T7" },
  "portrait-ceremony":   { title: "Ceremony",       date: "May 10, 2017",       location: "Greenville, South Carolina",                camera: "Canon EOS Rebel T7" },
  "portrait-bird":       { title: "Bird",           date: "August 15, 2024",    location: "Riverbanks Zoo, Columbia, South Carolina",  camera: "Canon EOS Rebel T7" },
  "portrait-cincy":      { title: "Cincy",          date: "October 6, 2019",    location: "Cincinnati, Ohio",                          camera: "Canon EOS Rebel T7" },
  "portrait-graduation": { title: "Graduation",     date: "September 14, 2019", location: "Columbia, South Carolina",                  camera: "Canon EOS Rebel T7" },
  "portrait-dog":        { title: "Dog",            date: "November 2, 2024",   location: "Greenville, South Carolina",                camera: "Canon EOS Rebel T7" },
  "portrait-giraffe":    { title: "Giraffe",        date: "March 24, 2024",     location: "Riverbanks Zoo, Columbia, South Carolina",  camera: "Canon EOS Rebel T7" }
};

function Portfolio(props) {
  var [filter, setFilter] = useState('all');
  var [photos, setPhotos] = useState([]);
  var [status, setStatus] = useState('loading photos...');
  var [statusType, setStatusType] = useState('is-loading');

  useEffect(function() {
    fetch(JSON_URL)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        var list = data.photo_descriptions;
        var result = [];

        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          var meta = photoMeta[item.photo_id];

          result.push({
            id: item.photo_id,
            title: meta.title,
            category: item.category,
            image: IMG_BASE + item.img_name,
            date: meta.date,
            location: meta.location,
            camera: meta.camera,
            description: item.photo_description
          });
        }

        setPhotos(result);
        setStatus('loaded ' + result.length + ' photos');
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
