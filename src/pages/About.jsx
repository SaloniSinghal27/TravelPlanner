import React, { useEffect, useState } from 'react';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import saloniImg from './Saloni.jpg';
import sakshamImg from './Saksham.jpg';
import saketImg from './saket.jpg';

const AboutUs = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={`aboutus-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="aboutus-content">
        <button onClick={() => setDarkMode(!darkMode)} className="dark-toggle">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        <h1 className="aboutus-title" data-aos="fade-down">Who We Are</h1>
        <p className="aboutus-tagline" data-aos="fade-up">Turning your travel dreams into reality.</p>

        <hr className="section-divider" />

        <div className="aboutus-text" data-aos="fade-up">
          <p>
            At <strong>Travel Planner</strong>, we believe travel should be effortless, exciting, and personal.
          </p>
          <p>
            Whether you're planning a weekend escape or a world tour, we're here to make it inspiring and seamless.
          </p>
        </div>

        <hr className="section-divider" />

        <div className="aboutus-stats" data-aos="zoom-in">
          <div className="stat">
            <h2>100+</h2>
            <p>Destinations</p>
          </div>
          <div className="stat">
            <h2>20K+</h2>
            <p>Happy Travelers</p>
          </div>
          <div className="stat">
            <h2>5+</h2>
            <p>Years of Experience</p>
          </div>
        </div>

        <hr className="section-divider" />

        <h2 className="team-title" data-aos="fade-up">Meet Our Team</h2>
        <div className="team-section" data-aos="fade-up">
          <div className="team-member">
            <img src={saloniImg} alt="Saloni Singhal" />
            <h3>Saloni Singhal</h3>
            <p>Frontend Designer</p>
          </div>
          <div className="team-member">
            <img src={sakshamImg} alt="Saksham Gupta" />
            <h3>Saksham Gupta</h3>
            <p>Backend Designer</p>
          </div>
          <div className="team-member">
            <img src={saketImg} alt="Saket Samrat" />
            <h3>Saket Samrat</h3>
            <p>Database Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
