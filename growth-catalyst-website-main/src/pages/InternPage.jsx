import React, { useState, useEffect, useRef } from 'react';
import './InternPage.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const InternPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    track: '',
    portfolio: '',
    message: '',
    vaExperience: '',
    vaExpertise: '',
    unpaidTrial: '',
    anythingElse: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadedAtRef = useRef(0);
  const observerRef = useRef(null);

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.track.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    const payload = JSON.stringify({
      name: formData.name,
      email: formData.email,
      track: formData.track,
      portfolio: formData.portfolio,
      message: formData.message,
      vaExperience: formData.vaExperience,
      vaExpertise: formData.vaExpertise,
      unpaidTrial: formData.unpaidTrial,
      anythingElse: formData.anythingElse,
      _honeypot: honeypot,
      _elapsed: Date.now() - loadedAtRef.current,
    });

    try {
      // ── 1. Google Apps Script (spreadsheet) — fire-and-forget ──
      // Sent in "no-cors" mode because Apps Script doesn't return
      // CORS headers.  The opaque response (status 0) is expected.
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (scriptUrl) {
        fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: payload,
        }).catch(() => {
          // Silently ignore — spreadsheet logging is best-effort.
          // The email endpoint below is the authoritative handler.
        });
      }

      // ── 2. /api/intern (email notification) — awaited ──
      const response = await fetch('/api/intern', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', track: '', portfolio: '', message: '', vaExperience: '', vaExpertise: '', unpaidTrial: '', anythingElse: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try again later.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      title: 'Mentorship',
      desc: 'Learn directly from experienced strategists and creatives.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    },
    {
      title: 'Real Projects',
      desc: 'Work on actual client campaigns not busy work.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
    },
    {
      title: 'Flexible Hours',
      desc: 'Remote-friendly with schedules that fit your life.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    }
  ];

  const selectTrackAndScroll = (trackTitle) => {
    setFormData(prev => ({ ...prev, track: trackTitle }));
    const applyEl = document.getElementById('apply');
    if (applyEl) {
      applyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tracks = [
    {
      title: 'Social Media Manager',
      desc: 'Plan and execute content strategies, manage community engagement, and grow brand presence across digital channels.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M8 9h8"></path>
          <path d="M8 13h6"></path>
        </svg>
      )
    },
    {
      title: 'Video Editor',
      desc: 'Produce and edit high-retention short-form videos, reels, and visual storytelling content for real campaigns.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      )
    },
    {
      title: 'Website Designer',
      desc: 'Craft intuitive user experiences, modern responsive web pages, and clean conversion-focused layouts.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    }
  ];

  return (
    <div className="intern-page">
      <section className="section section--dark intern-hero">
        <div className="container reveal">
          <h1 className="intern-hero__title">Be Our Intern</h1>
          <p className="intern-hero__subtitle">Gain hands-on experience, mentorship from industry professionals, and work on real client projects that make an impact.</p>
        </div>
      </section>

      <section className="section section--white intern-benefits-section">
        <div className="container">
          <div className="intern-benefits">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="intern-benefit-card reveal">
                <div className="intern-benefit-card__icon">{benefit.icon}</div>
                <h3 className="intern-benefit-card__title">{benefit.title}</h3>
                <p className="intern-benefit-card__desc">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--off-white intern-tracks-section">
        <div className="container">
          <div className="intern-tracks-header reveal">
            <span className="section-label">OPEN TRACKS</span>
            <h2 className="intern-tracks__heading">Choose Your Track</h2>
            <p className="intern-tracks__subheading">Select a track to build real-world experience through hands-on projects and direct mentorship.</p>
          </div>
          <div className="intern-tracks">
            {tracks.map((track, idx) => (
              <div key={idx} className="intern-track-card reveal">
                <div className="intern-track-card__icon">{track.icon}</div>
                <h3 className="intern-track-card__title">{track.title}</h3>
                <p className="intern-track-card__desc">{track.desc}</p>
                <button
                  type="button"
                  className="btn btn--outline intern-track-card__btn"
                  onClick={() => selectTrackAndScroll(track.title)}
                >
                  Apply for this Track
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white intern-apply-section" id="apply">
        <div className="container">
          <div className="section-label reveal">APPLY NOW</div>
          <div className="intern-form-wrapper reveal">
            {submitted ? (
              <div className="intern-form__success">
                <div className="intern-form__success-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="intern-form__success-icon">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="intern-form__success-title">Application Submitted!</h3>
                <p className="intern-form__success-desc">
                  Thank you for your interest in joining Growth Catalyst. We have received your details in our inbox and will be in touch soon!
                </p>
                <button
                  type="button"
                  className="btn btn--outline intern-form__reset-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setError('');
                    loadedAtRef.current = Date.now();
                  }}
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form className="intern-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot field for bot protection — hidden from human users */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="intern_honeypot">Leave this field blank</label>
                  <input
                    type="text"
                    id="intern_honeypot"
                    name="_honeypot"
                    tabIndex="-1"
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="intern-form__error" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="intern-form__group">
                  <label htmlFor="name" className="intern-form__label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="intern-form__input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    disabled={loading}
                  />
                </div>

                <div className="intern-form__group">
                  <label htmlFor="email" className="intern-form__label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="intern-form__input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    disabled={loading}
                  />
                </div>

                <div className="intern-form__group">
                  <label htmlFor="track" className="intern-form__label">Track / Role Interested In *</label>
                  <select
                    id="track"
                    name="track"
                    required
                    className="intern-form__input intern-form__select"
                    value={formData.track}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="" disabled>Select a track</option>
                    {tracks.map((t, idx) => (
                      <option key={idx} value={t.title}>{t.title}</option>
                    ))}
                  </select>
                </div>

                <div className="intern-form__group">
                  <label htmlFor="portfolio" className="intern-form__label">Portfolio / Resume Link</label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    className="intern-form__input"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/... or Google Drive link"
                    disabled={loading}
                  />
                </div>

                <div className="intern-form__group">
                  <label htmlFor="message" className="intern-form__label">Short Message / Cover Note *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="intern-form__input intern-form__textarea"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a little bit about yourself, your background, and why you'd like to intern with us."
                    disabled={loading}
                  ></textarea>
                </div>

                <div className="intern-form__group">
                  <label htmlFor="vaExperience" className="intern-form__label">Do you have any experience of being a Virtual Assistant?</label>
                  <select
                    id="vaExperience"
                    name="vaExperience"
                    className="intern-form__input intern-form__select"
                    value={formData.vaExperience}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="intern-form__group">
                  <label htmlFor="vaExpertise" className="intern-form__label">Which area(s) of expertise in Virtual Assistance do you have?</label>
                  <select
                    id="vaExpertise"
                    name="vaExpertise"
                    className="intern-form__input intern-form__select"
                    value={formData.vaExpertise}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="" disabled>Select your area of expertise</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Website Designer">Website Designer</option>
                  </select>
                </div>

                <div className="intern-form__group">
                  <label htmlFor="unpaidTrial" className="intern-form__label">Are you interested in a 1 month unpaid trial?</label>
                  <textarea
                    id="unpaidTrial"
                    name="unpaidTrial"
                    className="intern-form__input intern-form__textarea"
                    rows="3"
                    value={formData.unpaidTrial}
                    onChange={handleChange}
                    placeholder="Share your thoughts about the 1 month unpaid trial period."
                    disabled={loading}
                  ></textarea>
                </div>

                <div className="intern-form__group">
                  <label htmlFor="anythingElse" className="intern-form__label">Is there anything else you'd like us to know before we hop on a call?</label>
                  <textarea
                    id="anythingElse"
                    name="anythingElse"
                    className="intern-form__input intern-form__textarea"
                    rows="3"
                    value={formData.anythingElse}
                    onChange={handleChange}
                    placeholder="Any additional information, availability, or questions you'd like to share."
                    disabled={loading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn--primary intern-form__btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="intern-form__btn-loading">
                      <span className="intern-form__spinner" />
                      Submitting Application...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternPage;
