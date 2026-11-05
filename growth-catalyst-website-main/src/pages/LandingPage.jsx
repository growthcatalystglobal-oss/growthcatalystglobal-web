import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="landing-page">
      <video className="landing-video-bg" autoPlay loop muted playsInline>
        <source src={`${import.meta.env.BASE_URL}background video.mp4`} type="video/mp4" />
      </video>
      <div className="landing-video-overlay"></div>
      <div className="container landing-content">
        <h1 className="landing-title reveal">Your Dedicated Partner in Business Transformation</h1>
        <p className="landing-subtitle reveal">
          We help ambitious brands build the strategy, systems, and creative infrastructure they need to scale and stay scaled.
        </p>
        <div className="reveal">
          <Link to="/home" className="btn btn--primary btn--pill landing-cta">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
