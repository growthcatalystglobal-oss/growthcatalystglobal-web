import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const industries = [
  'Real Estate',
  'Fitness',
  'E-Commerce',
  'Non-Profit Organizations',
  'Beauty & Cosmetic',
  'Trading',
  'Cleaning Industries',
  'And So On...'
];

const HomePage = () => {
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
    <div className="home-page">
      {/* WHO WE ARE */}
      <section className="section section--white who-we-are-section">
        <div className="container">
          <div className="who-we-are-split">
            <div className="who-we-are-content-col reveal">
              <div className="who-we-are-content">
                <span className="section-label">WHO WE ARE</span>
                <h2 className="home-heading">Strategy Meets Execution</h2>
                <p className="home-paragraph">
                  Growth Catalyst is a growth operations partner helping businesses scale through strategic marketing, streamlined systems, automation, and creative digital solutions.
                </p>
              </div>
            </div>
            <div className="who-we-are-image-col reveal">
              <div className="who-we-are-image-wrap">
                <img
                  src={`${import.meta.env.BASE_URL}builders.jpeg`}
                  alt="Growth Catalyst - Strategy Meets Execution"
                  className="who-we-are-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SERVED (ANIMATED TEXT-ONLY TICKER) */}
      <section className="section section--dark industries-section">
        <video className="industries-video-bg" autoPlay loop muted playsInline>
          <source src={`${import.meta.env.BASE_URL}Industries video.mp4`} type="video/mp4" />
        </video>
        <div className="industries-video-overlay"></div>
        <div className="container reveal industries-header-content">
          <h2 className="industries-title">Industries We Serve</h2>
          <p className="industries-paragraph">
            We partner with startups, growing businesses, and established companies seeking to scale through strategy, systems, and digital growth.
          </p>
        </div>

        <div className="industries-marquee-container">
          <div className="industries-marquee-track">
            {/* Primary group */}
            <div className="industries-marquee-group">
              {[...industries, ...industries, ...industries].map((name, i) => (
                <div key={`ind-1-${i}`} className="industry-item">
                  <span className="industry-name">{name}</span>
                </div>
              ))}
            </div>
            {/* Duplicate group for seamless infinite loop */}
            <div className="industries-marquee-group" aria-hidden="true">
              {[...industries, ...industries, ...industries].map((name, i) => (
                <div key={`ind-2-${i}`} className="industry-item">
                  <span className="industry-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section section--white services-section">
        <div className="container">
          <div className="reveal text-center">
            <span className="section-label">WHAT WE OFFER</span>
            <h2 className="home-heading">Services Built for Growth</h2>
          </div>

          <div className="services-grid">
            <div className="service-card reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19A2 2 0 104 15A2 2 0 104 19zM20 19A2 2 0 1020 15A2 2 0 1020 19zM20 5A2 2 0 1020 1A2 2 0 1020 5zM5.9 16.1L18.1 17.9M5.9 17.9L18.1 16.1M18.1 6.1L5.9 13.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>Social Media Management</h3>
              <p>Elevate your brand presence with targeted, engaging content strategies.</p>
            </div>

            <div className="service-card reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="18" y="3" width="4" height="18" rx="1" ry="1" />
                <rect x="10" y="8" width="4" height="13" rx="1" ry="1" />
                <rect x="2" y="13" width="4" height="8" rx="1" ry="1" />
              </svg>
              <h3>Analytics & Reporting</h3>
              <p>Turn raw data into actionable insights for continuous optimization.</p>
            </div>

            <div className="service-card reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <h3>Business Strategy</h3>
              <p>Comprehensive roadmaps designed to scale your operations sustainably.</p>
            </div>

            <div className="service-card reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="2" y1="7" x2="7" y2="7" />
                <line x1="2" y1="17" x2="7" y2="17" />
                <line x1="17" y1="17" x2="22" y2="17" />
                <line x1="17" y1="7" x2="22" y2="7" />
              </svg>
              <h3>Video Editing</h3>
              <p>Professional post-production to craft compelling visual stories.</p>
            </div>

            <div className="service-card reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
              <h3>Systems & Automation</h3>
              <p>Streamline workflows to save time and reduce operational friction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--blue cta-section">
        <div className="container reveal text-center">
          <h2 className="cta-heading">Ready to Grow?</h2>
          <p className="cta-subtext">Let's build something that lasts.</p>
          <Link to="/contact" className="btn btn--outline-white btn--pill">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
