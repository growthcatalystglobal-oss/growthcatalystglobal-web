import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teamMembers } from '../data/teamData';
import './AboutPage.css';

const AboutPage = () => {
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

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="about-page">
      {/* 1. Hero / Mission Statement */}
      <section className="section section--dark about-hero">
        <video className="about-hero__video-bg" autoPlay loop muted playsInline>
          <source src={`${import.meta.env.BASE_URL}about background.mp4`} type="video/mp4" />
        </video>
        <div className="about-hero__video-overlay"></div>
        <div className="container">
          <div className="about-hero__quote-mark" aria-hidden="true">“</div>
          <span className="section-label reveal">OUR MISSION</span>
          <h1 className="about-hero__mission reveal">
            To empower businesses with the strategy, systems, and creative infrastructure to achieve sustainable growth.
          </h1>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="section section--white story-section">
        <div className="container">
          <div className="story-split">
            <div className="story-content-col reveal">
              <div className="story-content">
                <span className="section-label">OUR JOURNEY</span>
                <h2>Built by Builders</h2>
                <p>
                  Growth Catalyst began with the belief that growth is built through strong systems, meaningful partnerships, and talented people.
                </p>
                <p>
                  Today, we're committed to helping businesses scale with confidence while creating opportunities for specialists to grow, learn, and succeed together.
                </p>
              </div>
            </div>
            <div className="story-image-col reveal">
              <div className="story-image-wrap">
                <img
                  src={`${import.meta.env.BASE_URL}Growthcatalyst.jpeg`}
                  alt="Growth Catalyst - Built by Builders"
                  className="story-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Meet the Catalysts */}
      <section className="section section--dark team-section">
        {/* Top Loop Animation */}
        <div className="gc-marquee-container gc-marquee-container--top">
          <div className="gc-marquee-track">
            <div className="gc-marquee-group">
              {Array(24).fill('Growth Catalyst').map((text, idx) => (
                <span key={`top-1-${idx}`} className="gc-marquee-text">{text}</span>
              ))}
            </div>
            <div className="gc-marquee-group" aria-hidden="true">
              {Array(24).fill('Growth Catalyst').map((text, idx) => (
                <span key={`top-2-${idx}`} className="gc-marquee-text">{text}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="team-header reveal">
            <span className="section-label">THE TEAM</span>
            <h2 className="team-title">Meet the Catalysts</h2>
            <p className="team-subtitle">
              The strategists, creators, and operators behind Growth Catalyst.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <Link
                key={member.id}
                to={`/team/${member.id}`}
                className="team-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="team-card__image-container">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="team-card__image" />
                  ) : (
                    <div className="team-card__placeholder">
                      <svg className="team-card__placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span className="team-card__placeholder-name">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="team-card__content">
                  <div className="team-card__info">
                    <h3 className="team-card__name">{member.name}</h3>
                    <p className="team-card__role">{member.role}</p>
                  </div>
                  <div className="team-card__action">
                    <span>View Profile</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Loop Animation */}
        <div className="gc-marquee-container gc-marquee-container--bottom">
          <div className="gc-marquee-track gc-marquee-track--reverse">
            <div className="gc-marquee-group">
              {Array(24).fill('Growth Catalyst').map((text, idx) => (
                <span key={`bot-1-${idx}`} className="gc-marquee-text">{text}</span>
              ))}
            </div>
            <div className="gc-marquee-group" aria-hidden="true">
              {Array(24).fill('Growth Catalyst').map((text, idx) => (
                <span key={`bot-2-${idx}`} className="gc-marquee-text">{text}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="section section--white">
        <div className="container">
          <span className="section-label reveal">CORE VALUES</span>
          <div className="values-grid">
            <div className="value-card reveal">
              <svg className="value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="value-title">Innovation</h3>
              <p className="value-desc">We challenge the status quo and embrace new thinking.</p>
            </div>
            <div className="value-card reveal" style={{ transitionDelay: '0.1s' }}>
              <svg className="value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="value-title">Integrity</h3>
              <p className="value-desc">Transparency and honesty are non-negotiable.</p>
            </div>
            <div className="value-card reveal" style={{ transitionDelay: '0.2s' }}>
              <svg className="value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h3 className="value-title">Growth</h3>
              <p className="value-desc">We measure success by the progress we create.</p>
            </div>
            <div className="value-card reveal" style={{ transitionDelay: '0.3s' }}>
              <svg className="value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="value-title">Collaboration</h3>
              <p className="value-desc">The best results come from true partnership.</p>
            </div>
          </div>
        </div>
      </section>


      {/* 5. Join the Team CTA */}
      <section className="section section--blue join-cta">
        <div className="container reveal">
          <h2>Want to grow with us?</h2>
          <Link to="/intern" className="btn btn--outline-white btn--pill">
            Be Our Intern
          </Link>
        </div>
      </section>

      {/* 6. Ready to Scale CTA */}
      <section className="section section--white about-client-cta">
        <div className="container text-center reveal">
          <span className="section-label">PARTNER WITH US</span>
          <h2 className="about-client-cta__title">Ready to Scale Your Business?</h2>
          <p className="about-client-cta__desc">
            Let's collaborate to build sustainable systems, elevate your brand, and accelerate your growth.
          </p>
          <div className="about-client-cta__actions">
            <Link to="/contact" className="btn btn--outline btn--pill">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
