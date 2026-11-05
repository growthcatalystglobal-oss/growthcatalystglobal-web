import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

const processSteps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: "A no-pressure conversation to understand where you are, what's slowing you down, and what growth looks like for your business right now.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Getting to Know the Business',
    description: 'We go deeper, reviewing your current systems, tools, workflows, and goals so our recommendations fit your business, not a generic template.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Brainstorming',
    description: "Behind the scenes, our team maps out the right mix of support based on what we've learned matching tasks, skills, and strategy to your specific needs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Proposal',
    description: "You receive a clear, tailored plan outlining scope, deliverables, and structure no jargon, no guesswork, just what we'll do and how it helps.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  {
    number: '05',
    title: '3-Month Execution',
    description: 'The plan goes live. Consistent, hands-on support begins with regular check-ins to track progress and adjust as needed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  }
];

export default function ServicesPage() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
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
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="section section--dark services-hero">
        <div className="container text-center reveal">
          <span className="section-label">OUR SOLUTIONS</span>
          <h1 className="services-hero__title">Explore Our Solutions</h1>
        </div>
      </section>

      {/* Section 1 — Pricing / Package Cards */}
      <section className="section section--white services-packages-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-label">PACKAGES</span>
            <h2 className="services-section-title">Tailored Support Packages</h2>
          </div>

          <div className="packages-grid">
            {/* Starter Package Card */}
            <div className="package-card package-card--starter reveal">
              <div className="package-card__header">
                <span className="package-card__badge">Active Package</span>
                <h3 className="package-card__title">Growth Catalyst Starter</h3>
              </div>

              <div className="package-card__categories">
                {/* Category 1 */}
                <div className="package-category">
                  <h4 className="package-category__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Website, Digital Marketing & Automations
                  </h4>
                  <ul className="package-category__list">
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Minor Website Content Updates
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Basic SEO housekeeping
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Broken Link checks and simple bug fixes
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Setting up basic automations
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Email marketing setup/scheduling
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Basic performance/traffic reporting
                    </li>
                  </ul>
                </div>

                {/* Category 2 */}
                <div className="package-category">
                  <h4 className="package-category__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19A2 2 0 104 15A2 2 0 104 19zM20 19A2 2 0 1020 15A2 2 0 1020 19zM20 5A2 2 0 1020 1A2 2 0 1020 5zM5.9 16.1L18.1 17.9M5.9 17.9L18.1 16.1M18.1 6.1L5.9 13.9" />
                    </svg>
                    Social Media & Branding
                  </h4>
                  <ul className="package-category__list">
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Content Calendar Planning
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Scheduling posts across platforms
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Basic Graphic Creation
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Community Engagement
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Light Brand Consistency Checks
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Monthly engagement/growth summary
                    </li>
                  </ul>
                </div>

                {/* Category 3 */}
                <div className="package-category">
                  <h4 className="package-category__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                      <line x1="7" y1="2" x2="7" y2="22" />
                      <line x1="17" y1="2" x2="17" y2="22" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <line x1="2" y1="7" x2="7" y2="7" />
                      <line x1="2" y1="17" x2="7" y2="17" />
                      <line x1="17" y1="17" x2="22" y2="17" />
                      <line x1="17" y1="7" x2="22" y2="7" />
                    </svg>
                    Video Editing
                  </h4>
                  <ul className="package-category__list">
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Editing short-form content
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Captions, simple transitions, branding overlays
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Repurposing long-form content into short clips
                    </li>
                    <li>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Basic thumbnail creation
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Coming Soon Cards Grid */}
            <div className="packages-coming-soon-grid">
              {/* Plus Card */}
              <div className="package-card package-card--coming-soon reveal">
                <div className="package-card__header">
                  <span className="package-card__badge package-card__badge--muted">Tier 2</span>
                  <h3 className="package-card__title">Growth Catalyst Plus</h3>
                </div>
                <div className="package-card__body-coming-soon">
                  <span className="coming-soon-pill">Coming soon...</span>
                </div>
              </div>

              {/* Premium Card */}
              <div className="package-card package-card--coming-soon reveal">
                <div className="package-card__header">
                  <span className="package-card__badge package-card__badge--muted">Tier 3</span>
                  <h3 className="package-card__title">Growth Catalyst Premium</h3>
                </div>
                <div className="package-card__body-coming-soon">
                  <span className="coming-soon-pill">Coming soon...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Our Process */}
      <section className="section section--off-white services-process-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-label">HOW WE WORK</span>
            <h2 className="services-section-title">Our Process</h2>
          </div>
          <div className="process-grid">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-step-card reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="process-step-card__top">
                  <div className="process-step-card__icon-wrapper">
                    {step.icon}
                  </div>
                  <span className="process-step-card__number">{step.number}</span>
                </div>
                <h3 className="process-step-card__title">{step.title}</h3>
                <p className="process-step-card__desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Closing Section */}
      <section className="section section--dark process-closing-section">
        <div className="container">
          <div className="process-closing-block reveal">
            <p className="process-closing__paragraph">
              At Growth Catalyst, what matters most is helping your business run smoother and grow with intention not just checking tasks off a list.
            </p>
            <p className="process-closing__paragraph">
              What we'll do is bring the right specialists to your corner: covering your website, marketing, automation, social media, and content, so every part of your digital presence moves in the same direction.
            </p>
            <p className="process-closing__paragraph">
              What happens next is simple we get to know your business, build a plan around your goals, and get to work, adjusting along the way as results come in and trust builds.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section--blue services-cta-section">
        <div className="container text-center reveal">
          <h2 className="services-cta-heading">Ready to Move in the Same Direction?</h2>
          <Link to="/contact" className="btn btn--outline-white btn--pill services-cta-btn">
            Contact Us to Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
