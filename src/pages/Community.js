import React, { useState, useEffect } from 'react';
import './Community.css';

var API = 'https://throughmylens-backend.onrender.com';

function Community() {

  // ── Spots list + loading ──
  var [spots, setSpots] = useState([]);
  var [loadingSpots, setLoadingSpots] = useState(true);

  // ── Submit form ──
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

  // ── Edit form ──
  var [editingId, setEditingId] = useState(null);
  var [editForm, setEditForm] = useState({});
  var [editErrors, setEditErrors] = useState({});
  var [editStatus, setEditStatus] = useState('idle');
  var [editImagePreview, setEditImagePreview] = useState(null);
  var [editFileKey, setEditFileKey] = useState(0);

  // Load spots from server on page load
  useEffect(function() {
    fetch(API + '/api/spots')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        setSpots(data);
        setLoadingSpots(false);
      })
      .catch(function() {
        setLoadingSpots(false);
      });
  }, []);

  // ── Submit form validation ──
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

  // ── Edit form validation (same rules, no email) ──
  function validateEdit() {
    var newErrors = {};
    if (!editForm.name || editForm.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    if (!editForm.locationName || editForm.locationName.trim().length < 2) {
      newErrors.locationName = 'Location name must be at least 2 characters.';
    }
    if (!editForm.city || editForm.city.trim().length < 2) {
      newErrors.city = 'City must be at least 2 characters.';
    }
    if (!editForm.spotType) {
      newErrors.spotType = 'Please select a spot type.';
    }
    if (!editForm.description || editForm.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
    }
    if (!editForm.bestTime) {
      newErrors.bestTime = 'Please select the best time of day.';
    }
    return newErrors;
  }

  // ── POST submit ──
  function handleSubmit(e) {
    e.preventDefault();
    var validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormStatus('error');
      return;
    }
    setFormStatus('loading');
    fetch(API + '/api/spots', {
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

  // ── Image handlers ──
  function handleImageChange(e) {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = function() { setImagePreview(reader.result); };
      reader.readAsDataURL(file);
    }
  }

  function handleEditImageChange(e) {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = function() { setEditImagePreview(reader.result); };
      reader.readAsDataURL(file);
    }
  }

  // ── Edit handlers ──
  function startEdit(spot) {
    setEditingId(spot.id);
    setEditForm({
      name: spot.name,
      locationName: spot.locationName,
      city: spot.city,
      spotType: spot.spotType,
      description: spot.description,
      bestTime: spot.bestTime
    });
    setEditImagePreview(spot.image || null);
    setEditErrors({});
    setEditStatus('idle');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
    setEditErrors({});
    setEditStatus('idle');
    setEditImagePreview(null);
  }

  function updateEditField(field, value) {
    var updated = Object.assign({}, editForm);
    updated[field] = value;
    setEditForm(updated);
    if (editErrors[field]) {
      var nextErrors = Object.assign({}, editErrors);
      delete nextErrors[field];
      setEditErrors(nextErrors);
    }
  }

  // ── PUT submit ──
  function handleEditSubmit(e) {
    e.preventDefault();
    var validationErrors = validateEdit();
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      setEditStatus('error');
      return;
    }
    setEditStatus('loading');
    fetch(API + '/api/spots/' + editingId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editForm.name.trim(),
        locationName: editForm.locationName.trim(),
        city: editForm.city.trim(),
        spotType: editForm.spotType,
        description: editForm.description.trim(),
        bestTime: editForm.bestTime,
        image: editImagePreview
      })
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success) {
          setSpots(spots.map(function(s) {
            return s.id === editingId ? data.spot : s;
          }));
          cancelEdit();
        } else {
          setEditStatus('serverError');
        }
      })
      .catch(function() {
        setEditStatus('serverError');
      });
  }

  // ── DELETE ──
  function handleDelete(id) {
    fetch(API + '/api/spots/' + id, { method: 'DELETE' })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success) {
          setSpots(spots.filter(function(s) { return s.id !== id; }));
        }
      })
      .catch(function() {});
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
              <a href="https://throughmylens-backend.onrender.com" target="_blank" rel="noreferrer" className="backend-link">
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
                <input id="sc-name" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className={errors.name ? 'input-error' : ''} />
                {errors.name && <p className="field-error">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="sc-email">Email</label>
                <input id="sc-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className={errors.email ? 'input-error' : ''} />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              <div className="field-row">
                <div>
                  <label htmlFor="sc-location">Location Name</label>
                  <input id="sc-location" type="text" placeholder="e.g. Falls Park" value={locationName} onChange={e => setLocationName(e.target.value)} className={errors.locationName ? 'input-error' : ''} />
                  {errors.locationName && <p className="field-error">{errors.locationName}</p>}
                </div>
                <div>
                  <label htmlFor="sc-city">City</label>
                  <input id="sc-city" type="text" placeholder="e.g. Greenville, SC" value={city} onChange={e => setCity(e.target.value)} className={errors.city ? 'input-error' : ''} />
                  {errors.city && <p className="field-error">{errors.city}</p>}
                </div>
              </div>

              <div className="field-row">
                <div>
                  <label htmlFor="sc-type">Spot Type</label>
                  <select id="sc-type" value={spotType} onChange={e => setSpotType(e.target.value)} className={errors.spotType ? 'input-error' : ''}>
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
                  <select id="sc-time" value={bestTime} onChange={e => setBestTime(e.target.value)} className={errors.bestTime ? 'input-error' : ''}>
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
                <textarea id="sc-description" placeholder="e.g. The waterfall catches the morning light perfectly between 7-9 AM. Free parking just north of the entrance..." value={description} onChange={e => setDescription(e.target.value)} className={errors.description ? 'input-error' : ''} />
                {errors.description && <p className="field-error">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="sc-image">Photo of the Spot <span className="field-optional">(optional)</span></label>
                <p className="field-hint">Upload a photo from this location to show the community what it looks like.</p>
                <input key={fileKey} id="sc-image" type="file" accept="image/*" onChange={handleImageChange} className="image-input" />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview of selected spot" />
                  </div>
                )}
              </div>

              <button type="submit" disabled={formStatus === 'loading'}>
                {formStatus === 'loading' ? 'Submitting...' : 'Add My Spot'}
              </button>

              {formStatus === 'success' && <p className="form-status is-success">Your spot has been added to the feed below!</p>}
              {formStatus === 'serverError' && <p className="form-status is-error">Something went wrong. Make sure the server is running and try again.</p>}

            </form>
          </section>

        </div>
      </section>

      <section className="spots-section">
        <div className="spots-inner">
          <h2>Community Spots ({spots.length})</h2>
          <p>Spots load from the server. Use the Edit and Delete buttons to manage any entry.</p>

          {loadingSpots && <p className="spots-loading">Loading spots...</p>}

          {!loadingSpots && spots.length === 0 && (
            <p className="spots-empty">No spots have been submitted yet. Be the first!</p>
          )}

          {spots.length > 0 && (
            <div className="spots-grid">
              {spots.map(spot => (
                <div key={spot.id} className="spot-card">

                  {editingId === spot.id ? (

                    <form className="edit-form" onSubmit={handleEditSubmit} noValidate>
                      <p className="edit-form-title">Editing: {spot.locationName}</p>

                      <div>
                        <label>Name</label>
                        <input type="text" value={editForm.name || ''} onChange={e => updateEditField('name', e.target.value)} className={editErrors.name ? 'input-error' : ''} />
                        {editErrors.name && <p className="field-error">{editErrors.name}</p>}
                      </div>

                      <div className="field-row">
                        <div>
                          <label>Location Name</label>
                          <input type="text" value={editForm.locationName || ''} onChange={e => updateEditField('locationName', e.target.value)} className={editErrors.locationName ? 'input-error' : ''} />
                          {editErrors.locationName && <p className="field-error">{editErrors.locationName}</p>}
                        </div>
                        <div>
                          <label>City</label>
                          <input type="text" value={editForm.city || ''} onChange={e => updateEditField('city', e.target.value)} className={editErrors.city ? 'input-error' : ''} />
                          {editErrors.city && <p className="field-error">{editErrors.city}</p>}
                        </div>
                      </div>

                      <div className="field-row">
                        <div>
                          <label>Spot Type</label>
                          <select value={editForm.spotType || ''} onChange={e => updateEditField('spotType', e.target.value)} className={editErrors.spotType ? 'input-error' : ''}>
                            <option value="">Select a type...</option>
                            <option value="Golden Hour">Golden Hour</option>
                            <option value="Urban">Urban</option>
                            <option value="Nature">Nature</option>
                            <option value="Indoor">Indoor</option>
                          </select>
                          {editErrors.spotType && <p className="field-error">{editErrors.spotType}</p>}
                        </div>
                        <div>
                          <label>Best Time of Day</label>
                          <select value={editForm.bestTime || ''} onChange={e => updateEditField('bestTime', e.target.value)} className={editErrors.bestTime ? 'input-error' : ''}>
                            <option value="">Select a time...</option>
                            <option value="Early Morning / Sunrise">Early Morning / Sunrise</option>
                            <option value="Morning">Morning</option>
                            <option value="Midday">Midday</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Golden Hour / Sunset">Golden Hour / Sunset</option>
                            <option value="Blue Hour / Dusk">Blue Hour / Dusk</option>
                            <option value="Night">Night</option>
                          </select>
                          {editErrors.bestTime && <p className="field-error">{editErrors.bestTime}</p>}
                        </div>
                      </div>

                      <div>
                        <label>Description</label>
                        <textarea value={editForm.description || ''} onChange={e => updateEditField('description', e.target.value)} className={editErrors.description ? 'input-error' : ''} />
                        {editErrors.description && <p className="field-error">{editErrors.description}</p>}
                      </div>

                      <div>
                        <label>Update Photo <span className="field-optional">(optional)</span></label>
                        <input key={editFileKey} type="file" accept="image/*" onChange={handleEditImageChange} className="image-input" />
                        {editImagePreview && (
                          <div className="image-preview">
                            <img src={editImagePreview} alt="Current spot" />
                          </div>
                        )}
                      </div>

                      <div className="edit-form-actions">
                        <button type="submit" disabled={editStatus === 'loading'}>
                          {editStatus === 'loading' ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                      </div>

                      {editStatus === 'serverError' && <p className="form-status is-error">Something went wrong. Please try again.</p>}
                    </form>

                  ) : (

                    <React.Fragment>
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
                      <div className="card-actions">
                        <button className="edit-btn" onClick={() => startEdit(spot)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(spot.id)}>Delete</button>
                      </div>
                    </React.Fragment>

                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </section>
  );
}

export default Community;
