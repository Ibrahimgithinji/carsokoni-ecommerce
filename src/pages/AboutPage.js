import React from 'react';

const AboutPage = () => {
  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      bio: 'With over 15 years in the automotive industry, John founded Carsokoni with a vision to make car shopping simple and transparent.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
      bio: 'Sarah ensures smooth operations and maintains our high standards for vehicle quality and customer service.'
    },
    {
      name: 'Mike Chen',
      role: 'Lead Technician',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Mike leads our team of certified technicians who inspect every vehicle to ensure it meets our quality standards.'
    }
  ];

  const values = [
    {
      icon: '🚗',
      title: 'Quality First',
      description: 'Every vehicle undergoes rigorous inspection by our certified technicians before being listed.'
    },
    {
      icon: '🤝',
      title: 'Transparency',
      description: 'We provide complete vehicle history, detailed specifications, and honest pricing with no hidden fees.'
    },
    {
      icon: '⚡',
      title: 'Fast & Easy',
      description: 'Simple browsing, quick search, and streamlined purchasing process to save you time and effort.'
    },
    {
      icon: '🎯',
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We offer comprehensive support throughout your car buying journey.'
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About Carsokoni</h1>
          <p className="hero-subtitle">
            Revolutionizing the way people buy cars online since 2020
          </p>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Carsokoni was born from a simple frustration: buying a car shouldn't be complicated,
                time-consuming, or stressful. Our founder, John Smith, experienced this firsthand when
                searching for his family's first car. After visiting multiple dealerships, dealing with
                pushy salespeople, and spending weeks on research, he realized there had to be a better way.
              </p>
              <p>
                In 2020, we launched Carsokoni with a mission to make car shopping transparent, efficient,
                and enjoyable. We've grown from a small startup to become one of the most trusted online
                car marketplaces, helping thousands of customers find their perfect vehicle.
              </p>
              <p>
                Today, we continue to innovate and improve our platform, always putting our customers first.
                Every decision we make is guided by our commitment to quality, transparency, and exceptional service.
              </p>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                alt="Carsokoni office"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>
                To democratize car ownership by providing a transparent, hassle-free platform
                where customers can discover, compare, and purchase quality vehicles with confidence.
              </p>
            </div>
            <div className="vision-card">
              <h3>Our Vision</h3>
              <p>
                To become the world's most trusted automotive marketplace, setting the standard
                for transparency, quality, and customer experience in the online car buying industry.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats">
          <h2>By The Numbers</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Vehicles Sold</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Trusted Partners</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer Support</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Car?</h2>
            <p>Join thousands of satisfied customers who found their dream car with Carsokoni.</p>
            <a href="/cars" className="btn btn-primary btn-large">
              Browse Our Inventory
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;