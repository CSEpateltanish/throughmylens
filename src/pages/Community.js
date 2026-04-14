import React, { useState } from 'react';
import './Community.css';

function Community() {
  var [spots, setSpots] = useState([]);
  var [formStatus, setFormStatus] = useState('idle');
  var [errors, setErrors] = useState({});

  var [name, setName] = useState('');
  var [email, setEmail] = useState('');
  var [locationName, setLocationName] = useState('');
  var [city, setCity] = useState('');
  var [spotType, setSpotType] = useState('');
  var [description, setDescription] = useState('');
  var [bestTime, setBestTime] = useState('');
  var [imagePreview, setImagePreview] = useState(null);
  var [fileKey, setFileKey] = useState(0);

  function validate() {
    var newErrors = {};

    if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (locationName.trim().length < 2) {
      newErrors.locationName = 'Location name must be at least 2 characters.';
    }

    if (city.trim().length < 2) {
      newErrors.city = 'City must be at least 2 characters.';
    }

    if (spotType === '') {
      newErrors.spotType = 'Please select a spot type.';
    }

    if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
    }

    if (bestTime === '') {
      newErrors.bestTime = 'Please select the best time of day.';
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    var validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormStatus('error');
      return;
    }

    setFormStatus('loading');

    fetch('https://throughmylens-backend.onrender.com/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        locationName: locationName.trim(),
        city: city.trim(),
        spotType: spotType,
        description: description.trim(),
        bestTime: bestTime,
        image: imagePreview
      })
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success) {
          setSpots([data.spot, ...spots]);
          setFormStatus('success');
          setErrors({});
          setName('');
          setEmail('');
          setLocationName('');
          setCity('');
          setSpotType('');
          setDescription('');
          setBestTime('');
          setImagePreview(null);
          setFileKey(fileKey + 1);
        } else {
          setFormStatus('serverError');
        }
      })
      .catch(function() {
        setFormStatus('serverError');
      });
  }

  function handleImageChange(e) {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function getTypeBadgeClass(type) {
    if (type === 'Golden Hour') return 'badge badge-golden';
    if (type === 'Urban') return 'badge badge-urban';
    if (type === 'Nature') return 'badge badge-nature';
    if (type === 'Indoor') return 'badge badge-indoor';
    return 'badge';
  }

  return (
    <section className="page-main community-page">

      <section className="community-hero">
        <div>
          <h2>Local Photography Spots</h2>
          <p>Discover and share the best shooting locations near you</p>
        </div>
      </section>

      <section className="community-body">
        <div className="community-layout">

          <section className="community-panel">
            <h2>About the Feed</h2>
            <p>Know a great shooting location? Share it with the community so other photographers can find it too.</p>
            <ol className="steps-list">
              <li>Think of your favorite local spot — somewhere with great light, scenery, or character.</li>
              <li>Fill in the details: the name, city, what type of photography it suits, and when the light is best.</li>
              <li>Submit and your spot will appear in the feed below right away!</li>
            </ol>
            <div className="type-note">
              <strong>Spot Types:</strong> Golden Hour, Urban, Nature, Indoor
            </div>

            <div className="backend-link-box">
              <p>Want to see interesting spots?</p>
              <a
                href="https://throughmylens-backend.onrender.com"
                target="_blank"
                rel="noreferrer"
                className="backend-link"
              >
                Click to view others submissions
              </a>
            </div>
          </section>

          <section className="community-panel">
            <h2>Share a Spot</h2>
            <p>Fill out all fields below to add your location to the community feed.</p>

            <form className="community-form" onSubmit={handleSubmit} noValidate>

              <div>
                <label htmlFor="sc-name">Name</label>
                <input
                  id="sc-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <p className="field-error">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="sc-email">Email</label>
                <input
                  id="sc-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              <div className="field-row">
                <div>
                  <label htmlFor="sc-location">Location Name</label>
                  <input
                    id="sc-location"
                    type="text"
                    placeholder="e.g. Falls Park"
                    value={locationName}
                    onChange={e => setLocationName(e.target.value)}
                    className={errors.locationName ? 'input-error' : ''}
                  />
                  {errors.locationName && <p className="field-error">{errors.locationName}</p>}
                </div>

                <div>
                  <label htmlFor="sc-city">City</label>
                  <input
                    id="sc-city"
                    type="text"
                    placeholder="e.g. Greenville, SC"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className={errors.city ? 'input-error' : ''}
                  />
                  {errors.city && <p className="field-error">{errors.city}</p>}
                </div>
              </div>

              <div className="field-row">
                <div>
                  <label htmlFor="sc-type">Spot Type</label>
                  <select
                    id="sc-type"
                    value={spotType}
                    onChange={e => setSpotType(e.target.value)}
                    className={errors.spotType ? 'input-error' : ''}
                  >
                    <option value="">Select a type...</option>
                    <option value="Golden Hour">Golden Hour</option>
                    <option value="Urban">Urban</option>
                    <option value="Nature">Nature</option>
                    <option value="Indoor">Indoor</option>
                  </select>
                  {errors.spotType && <p className="field-error">{errors.spotType}</p>}
                </div>

                <div>
                  <label htmlFor="sc-time">Best Time of Day</label>
                  <select
                    id="sc-time"
                    value={bestTime}
                    onChange={e => setBestTime(e.target.value)}
                    className={errors.bestTime ? 'input-error' : ''}
                  >
                    <option value="">Select a time...</option>
                    <option value="Early Morning / Sunrise">Early Morning / Sunrise</option>
                    <option value="Morning">Morning</option>
                    <option value="Midday">Midday</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Golden Hour / Sunset">Golden Hour / Sunset</option>
                    <option value="Blue Hour / Dusk">Blue Hour / Dusk</option>
                    <option value="Night">Night</option>
                  </select>
                  {errors.bestTime && <p className="field-error">{errors.bestTime}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="sc-description">Description</label>
                <p className="field-hint">Describe what makes this spot great — the light, the scene, any useful tips.</p>
                <textarea
                  id="sc-description"
                  placeholder="e.g. The waterfall catches the morning light perfectly between 7-9 AM. Free parking just north of the entrance..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className={errors.description ? 'input-error' : ''}
                />
                {errors.description && <p className="field-error">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="sc-image">Photo of the Spot <span className="field-optional">(optional)</span></label>
                <p className="field-hint">Upload a photo from this location to show the community what it looks like.</p>
                <input
                  key={fileKey}
                  id="sc-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview of selected spot" />
                  </div>
                )}
              </div>

              <button type="submit" disabled={formStatus === 'loading'}>
                {formStatus === 'loading' ? 'Submitting...' : 'Add My Spot'}
              </button>

              {formStatus === 'success' && (
                <p className="form-status is-success">Your spot has been added to the feed below!</p>
              )}
              {formStatus === 'serverError' && (
                <p className="form-status is-error">Something went wrong. Make sure the server is running and try again.</p>
              )}

            </form>
          </section>

        </div>
      </section>

      {spots.length > 0 && (
        <section className="spots-section">
          <div className="spots-inner">
            <h2>Community Spots ({spots.length})</h2>
            <p>New spots appear here as they are submitted.</p>
            <div className="spots-grid">
              {spots.map(spot => (
                <div key={spot.id} className="spot-card">
                  {spot.image && (
                    <div className="card-image">
                      <img src={spot.image} alt={spot.locationName} />
                    </div>
                  )}
                  <div className="card-header">
                    <div className="card-avatar">{spot.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <p className="card-submitter">{spot.name}</p>
                      <p className="card-date">{spot.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className="card-location-name">{spot.locationName}</p>
                    <p className="card-city">{spot.city}</p>
                  </div>
                  <div className="card-badges">
                    <span className={getTypeBadgeClass(spot.spotType)}>{spot.spotType}</span>
                    <span className="badge">{spot.bestTime}</span>
                  </div>
                  <p className="card-description">{spot.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </section>
  );
}

export default Community;
