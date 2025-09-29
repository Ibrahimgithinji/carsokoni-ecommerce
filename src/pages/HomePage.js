import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, selectFeaturedCars } from '../store/slices/carsSlice';
import CarCard from '../components/car/CarCard';
import Loading from '../components/common/Loading';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.cars);
  const featuredCars = useSelector(selectFeaturedCars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const categories = [
    { name: 'Sedan', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400', count: 3 },
    { name: 'SUV', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400', count: 4 },
    { name: 'Hatchback', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400', count: 1 },
    { name: 'Luxury', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400', count: 2 }
  ];

  if (loading) {
    return <Loading message="Loading amazing cars..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchCars())}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Find Your Perfect Car
                <span className="highlight"> Today</span>
              </h1>
              <p className="hero-description">
                Discover an extensive collection of quality vehicles from trusted brands.
                Whether you're looking for a fuel-efficient sedan, a spacious SUV, or a luxury ride,
                we have the perfect car for your needs and budget.
              </p>
              <div className="hero-actions">
                <Link to="/cars" className="btn btn-primary btn-large">
                  Browse Cars
                </Link>
                <a href="#featured" className="btn btn-secondary btn-large">
                  View Featured
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600"
                alt="Featured car"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find the perfect car type for your lifestyle</p>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/cars?category=${category.name}`}
                className="category-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} loading="lazy" />
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.count} vehicles</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section id="featured" className="featured-cars">
        <div className="container">
          <div className="section-header">
            <h2>Featured Vehicles</h2>
            <p>Hand-picked premium cars just for you</p>
          </div>

          <div className="cars-grid">
            {featuredCars.map((car, index) => (
              <div
                key={car.id}
                className="car-card-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>

          <div className="section-footer">
            <Link to="/cars" className="btn btn-primary">
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Cars Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Trusted Brands</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10k+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest updates and events.</p>
            <form className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-submit-btn">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;