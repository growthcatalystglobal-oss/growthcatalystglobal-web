import { useState, useEffect, useRef } from 'react';
import './ContactPage.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const loadedAtRef = useRef(0);

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  const observerRef = useRef(null);

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

    // Client-side validation (first pass)
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _honeypot: honeypot,
          _loadedAt: loadedAtRef.current,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="section section--dark contact-hero">
        <div className="container reveal">
          <h1 className="contact-hero__title">Let's Connect</h1>
          <p className="contact-hero__subtitle">Have a question or ready to start? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section section--white contact-content">
        <div className="container contact-grid">

          <div className="contact-left reveal">
            {submitted ? (
              <div className="contact-form__success">
                <div className="contact-form__success-icon-wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="contact-form__success-icon"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="contact-form__success-title">Message Sent!</h3>
                <p className="contact-form__success-desc">
                  Thank you for reaching out to Growth Catalyst. We have received your message in our inbox and will get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  className="btn btn--outline contact-form__reset-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setError('');
                    loadedAtRef.current = Date.now();
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot field — hidden from real users, bots auto-fill it */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="contact_honeypot">Leave this field blank</label>
                  <input
                    type="text"
                    id="contact_honeypot"
                    name="_honeypot"
                    tabIndex="-1"
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="contact-form__error" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="contact-form__group">
                  <label htmlFor="name" className="contact-form__label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="contact-form__input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    disabled={loading}
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="email" className="contact-form__label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="contact-form__input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    disabled={loading}
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="message" className="contact-form__label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="contact-form__input contact-form__textarea"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, or inquiry."
                    disabled={loading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn--primary contact-form__btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="contact-form__btn-loading">
                      <span className="contact-form__spinner" />
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="contact-right reveal">
            <div className="contact-schedule-card">
              <div className="contact-schedule-card__header">
                <div className="contact-schedule-card__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="contact-schedule-card__title">Book a Discovery Call</h3>
                  <span className="contact-schedule-card__meta">15–30 min intro call</span>
                </div>
              </div>
              <p className="contact-schedule-card__desc">
                Prefer to talk directly? Pick a time on our calendar that works best for you and let's discuss your project.
              </p>
              <a
                href="https://calendly.com/hello-growthcatalyst/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary contact-schedule-card__btn"
              >
                <span>Choose a Time</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <h2 className="contact-details__title">Contact Information</h2>

            <div className="contact-details__list">
              <div className="contact-details__item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-details__icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>growthcatalyst.global@gmail.com</span>
              </div>
              <div className="contact-details__item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-details__icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+63 967 224 3141</span>
              </div>
              <div className="contact-details__item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-details__icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>Lapu-Lapu City, Cebu</span>
              </div>
            </div>

            <div className="contact-social">
              <h3 className="contact-social__title">Follow Us</h3>
              <div className="contact-social__links">
                <a href="https://www.instagram.com/growthcatalyst.global/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="contact-social__link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
                <a href="https://www.threads.com/@growthcatalyst.global?xmt=AQG0cZaL9M1r8vGfrlQoWVJV-DezDIkZtMw382wLudT8wQQ" target="_blank" rel="noopener noreferrer" aria-label="Threads" className="contact-social__link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" /></svg>
                </a>
                <a href="https://www.tiktok.com/@growth.catalyst.global" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="contact-social__link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61592740551622" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="contact-social__link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="https://www.youtube.com/@growthcatalyst.global" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="contact-social__link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                </a>
                <a href="https://ph.pinterest.com/hellogrowthcatalyst/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="contact-social__link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" /></svg>
                </a>
                <a href="https://x.com/growthcatalyst6?ref_src=twsrc%5Etfw" target="_blank" rel="noopener noreferrer" aria-label="X" className="contact-social__link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
