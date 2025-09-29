import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
          </div>

          <div className="not-found-text">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
              Sorry, we couldn't find the page you're looking for. The page might have been moved,
              deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
            <Link to="/cars" className="btn btn-secondary">
              Browse Cars
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="helpful-links">
            <h3>Popular Pages</h3>
            <div className="links-grid">
              <Link to="/cars">All Cars</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;