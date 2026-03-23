import React, { useState } from 'react';
import './Portfolio.css';
import PortfolioCard from '../components/PortfolioCard';

var IMG_BASE = "https://raw.githubusercontent.com/CSEpateltanish/CSEpateltanish.github.io/e086ee4f0dc148596f488b2acc6944f351c89780/csce242/projects/part7/images/";

var photos = [
  { id: "landscape-island", title: "Island Paradise", category: "landscape", image: IMG_BASE + "photos/landscape/island.jpeg", date: "June 15, 2023", location: "Outer Banks, North Carolina", camera: "Canon EOS Rebel T7", description: "A serene island landscape captured during golden hour, showcasing the natural beauty of coastal terrain." },
  { id: "landscape-mountains", title: "Mountain Vista", category: "landscape", image: IMG_BASE + "photos/landscape/NC_Mountains.jpeg", date: "August 22, 2023", location: "Blue Ridge Mountains, North Carolina", camera: "Canon EOS Rebel T7", description: "Sweeping mountain views with dramatic cloud formations creating a stunning natural backdrop." },
  { id: "landscape-river", title: "Reedy River", category: "landscape", image: IMG_BASE + "photos/landscape/ReedyRiver.jpeg", date: "May 10, 2023", location: "Reedy River, Greenville, South Carolina", camera: "Canon EOS Rebel T7", description: "Flowing water and natural textures captured with a focus on movement and light." },
  { id: "landscape-waterfall", title: "Waterfall Cascade", category: "landscape", image: IMG_BASE + "photos/landscape/waterfall.jpeg", date: "July 3, 2023", location: "Walnut Cove Falls, South Carolina", camera: "Canon EOS Rebel T7", description: "A powerful waterfall frozen in time, capturing the raw beauty of nature's water features." },
  { id: "urban-miami", title: "Miami Vibes", category: "urban", image: IMG_BASE + "photos/urban/Miami.jpeg", date: "December 3, 2023", location: "Miami, Florida", camera: "Canon EOS Rebel T7", description: "Tropical urban energy captured with vibrant colors and dynamic street photography." },
  { id: "urban-gtr", title: "GTR", category: "urban", image: IMG_BASE + "photos/urban/GTR.jpeg", date: "November 8, 2023", location: "Greenville, South Carolina", camera: "Canon EOS Rebel T7", description: "Bold lines and geometry in urban settings." },
  { id: "urban-toronto", title: "Toronto", category: "urban", image: IMG_BASE + "photos/urban/Toronto.jpeg", date: "October 12, 2023", location: "Toronto, Canada", camera: "Canon EOS Rebel T7", description: "Urban architecture and street life captured in vibrant color and dynamic composition." },
  { id: "urban-willybrice", title: "Williams Brice", category: "urban", image: IMG_BASE + "photos/urban/WillyB.jpeg", date: "October 15, 2022", location: "Columbia, South Carolina", camera: "iPhone 16 Pro Max", description: "An action shot from inside a major sports stadium during game day." },
  { id: "portrait-graduation", title: "Graduation", category: "portrait", image: IMG_BASE + "photos/portrait/Graduation.jpeg", date: "May 15, 2023", location: "Greenville, South Carolina", camera: "Canon EOS Rebel T7", description: "A milestone moment captured with warmth and emotion." },
  { id: "portrait-coco", title: "Coco", category: "portrait", image: IMG_BASE + "photos/portrait/Coco.jpeg", date: "June 8, 2023", location: "Park, Greenville, South Carolina", camera: "Canon EOS Rebel T7", description: "A playful pet portrait capturing personality and character." },
  { id: "portrait-cape-cod", title: "Cape Cod", category: "portrait", image: IMG_BASE + "photos/portrait/Cape_cod.jpeg", date: "July 22, 2023", location: "Cape Cod, Massachusetts", camera: "Canon EOS Rebel T7", description: "A portrait session in a beautiful outdoor setting with natural lighting." },
  { id: "portrait-ceremony", title: "Ceremony", category: "portrait", image: IMG_BASE + "photos/portrait/Ceremony.jpeg", date: "August 30, 2023", location: "South Carolina", camera: "Canon EOS Rebel T7", description: "A special ceremony moment captured with warmth and natural emotion." }
];

function Portfolio(props) {
  var [filter, setFilter] = useState('all');

  var filteredPhotos = filter === 'all' ? photos : photos.filter(function(photo) {
    return photo.category === filter;
  });

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
        <div className="portfolio-grid">
          {filteredPhotos.map(function(photo) {
            return (
              <PortfolioCard key={photo.id} photo={photo} goTo={props.goTo} />
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default Portfolio;
