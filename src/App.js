import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Community from './pages/Community';
import PhotoDetail from './pages/PhotoDetail';

function App() {
  var [currentPage, setCurrentPage] = useState('home');
  var [selectedPhoto, setSelectedPhoto] = useState(null);

  function goTo(page, photo) {
    setCurrentPage(page);
    if (photo) {
      setSelectedPhoto(photo);
    }
  }

  return (
    <div className="page-frame">
      <Navbar currentPage={currentPage} goTo={goTo} />

      {currentPage === 'home' && <Home goTo={goTo} />}
      {currentPage === 'portfolio' && <Portfolio goTo={goTo} />}
      {currentPage === 'about' && <About />}
      {currentPage === 'community' && <Community />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'photo' && <PhotoDetail photo={selectedPhoto} goTo={goTo} />}

      <Footer goTo={goTo} />
    </div>
  );
}

export default App;
