import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { teamMembers, getMemberById } from '../data/teamData';
import './MemberProfilePage.css';

const MemberProfilePage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();

  const member = getMemberById(memberId);

  useEffect(() => {
    window.scrollTo(0, 0);

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
  }, [memberId]);

  if (!member) {
    return (
      <div className="member-not-found section">
        <div className="container text-center">
          <h2>Team Member Not Found</h2>
          <p>The profile you are looking for does not exist or has been moved.</p>
          <Link to="/about" className="btn btn--primary mt-md">
            ← Back to Team
          </Link>
        </div>
      </div>
    );
  }

  // Find next and previous members for navigation
  const currentIndex = teamMembers.findIndex((m) => m.id === member.id);
  const prevMember = teamMembers[(currentIndex - 1 + teamMembers.length) % teamMembers.length];
  const nextMember = teamMembers[(currentIndex + 1) % teamMembers.length];

  return (
    <div className="member-profile-page">
      {/* Top Header / Navigation Bar */}
      <section className="member-profile-hero section">
        <div className="container">
          <div className="member-breadcrumb reveal">
            <Link to="/about" className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Team</span>
            </Link>
          </div>

          <div className="member-profile-grid">
            {/* Left: Big Portrait Photo */}
            <div className="member-portrait-wrapper reveal">
              <div className="member-portrait-card">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="member-portrait-img"
                  />
                ) : (
                  <div className="member-portrait-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
                <div className="member-portrait-badge">
                  <span>Growth Catalyst Specialist</span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Bio & Profile Info */}
            <div className="member-info-content reveal reveal-delay-1">
              <div className="member-header">
                <span className="section-label">THE CATALYSTS</span>
                <h1 className="member-name">{member.name}</h1>
                <p className="member-role">{member.role}</p>
              </div>

              <div className="member-tagline">
                <p>"{member.tagline}"</p>
              </div>

              <div className="member-quick-stats">
                {member.experienceYears && (
                  <div className="stat-item">
                    <span className="stat-label">Experience</span>
                    <span className="stat-value">{member.experienceYears}</span>
                  </div>
                )}
                {member.education && (
                  <div className="stat-item">
                    <span className="stat-label">Background</span>
                    <span className="stat-value">{member.education}</span>
                  </div>
                )}
              </div>

              {/* Quote Block */}
              {member.quote && (
                <div className="member-quote-box">
                  <div className="quote-mark">“</div>
                  <p className="quote-text">{member.quote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Bibliography & Detailed Information Section */}
      <section className="section section--white member-details-section">
        <div className="container container--narrow">
          
          {/* Executive Overview */}
          <div className="detail-block reveal">
            <span className="section-label">OVERVIEW</span>
            <h2 className="detail-title">Biography</h2>
            <p className="detail-text">{member.bio}</p>
          </div>

          {/* Bibliography / Key Achievements */}
          {member.bibliography && member.bibliography.length > 0 && (
            <div className="detail-block reveal reveal-delay-1">
              <span className="section-label">CAREER HIGHLIGHTS</span>
              <h2 className="detail-title">Bibliography & Milestones</h2>
              <ul className="bibliography-list">
                {member.bibliography.map((item, index) => (
                  <li key={index} className="bibliography-item">
                    <div className="bib-icon">✦</div>
                    <div className="bib-content">
                      <p>{item}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Areas of Expertise */}
          {member.expertise && member.expertise.length > 0 && (
            <div className="detail-block reveal reveal-delay-2">
              <span className="section-label">SPECIALIZATIONS</span>
              <h2 className="detail-title">Areas of Expertise</h2>
              <div className="expertise-tags">
                {member.expertise.map((skill, index) => (
                  <span key={index} className="expertise-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Team Navigation & Next Member Switcher */}
      <section className="section section--dark member-nav-section">
        <div className="container">
          <div className="member-nav-header text-center reveal">
            <span className="section-label">THE TEAM</span>
            <h2>Explore Other Catalysts</h2>
          </div>

          <div className="member-switcher-grid">
            <Link to={`/team/${prevMember.id}`} className="member-nav-card reveal">
              <span className="nav-direction">← Previous Member</span>
              <div className="nav-member-info">
                {prevMember.image ? (
                  <img src={prevMember.image} alt={prevMember.name} className="nav-avatar" />
                ) : (
                  <div className="nav-avatar-placeholder">
                    <span>{prevMember.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
                <div>
                  <h4>{prevMember.name}</h4>
                  <p>{prevMember.role}</p>
                </div>
              </div>
            </Link>

            <Link to={`/team/${nextMember.id}`} className="member-nav-card reveal reveal-delay-1">
              <span className="nav-direction">Next Member →</span>
              <div className="nav-member-info">
                {nextMember.image ? (
                  <img src={nextMember.image} alt={nextMember.name} className="nav-avatar" />
                ) : (
                  <div className="nav-avatar-placeholder">
                    <span>{nextMember.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
                <div>
                  <h4>{nextMember.name}</h4>
                  <p>{nextMember.role}</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-xl reveal">
            <Link to="/about" className="btn btn--outline-white btn--pill">
              View Full Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemberProfilePage;
