import React from 'react';
import './PhotoDetail.css';

function PhotoDetail(props) {
  var photo = props.photo;

  if (!photo) {
    return (
      <section className="page-main photo-detail-page">
        <section className="photo-detail-layout">
          <a className="photo-back-link" href="#portfolio" onClick={() => props.goTo('portfolio')}>&larr; Back to Portfolio</a>
          <p>No photo selected.</p>
        </section>
      </section>
    );
  }

  return (
    <section className="page-main photo-detail-page">
      <section className="photo-detail-layout">
        <a className="photo-back-link" href="#portfolio" onClick={() => props.goTo('portfolio')}>&larr; Back to Portfolio</a>
        <div className="photo-detail-frame">
          <img src={photo.image} alt={photo.title} />
        </div>
        <h2>{photo.title}</h2>
        <div className="photo-detail-info">
          <p><strong>Date Taken:</strong> {photo.date}</p>
          <p><strong>Location:</strong> {photo.location}</p>
          <p><strong>Camera:</strong> {photo.camera}</p>
          <p><strong>Description:</strong> {photo.description}</p>
        </div>
      </section>
    </section>
  );
}

export default PhotoDetail;
