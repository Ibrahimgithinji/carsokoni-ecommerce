import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCarById, selectFeaturedCars } from '../store/slices/carsSlice';
import { addToCart } from '../store/slices/cartSlice';
import CarCard from '../components/car/CarCard';
import Loading from '../components/common/Loading';

const CarDetailsPage = React.memo(() => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(state => selectCarById(state, id));
  const featuredCars = useSelector(selectFeaturedCars);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (car && car.images.length > 0) {
      setSelectedImage(0);
    }
  }, [car]);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ car, quantity }));
  }, [dispatch, car, quantity]);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const getRelatedCars = useCallback(() => {
    if (!car) return [];
    return featuredCars
      .filter(c => c.id !== car.id && c.category === car.category)
      .slice(0, 4);
  }, [car, featuredCars]);

  const relatedCars = useMemo(() => getRelatedCars(), [getRelatedCars]);

  if (!car) {
    return (
      <div className="error-container">
        <h2>Car not found</h2>
        <p>The car you're looking for doesn't exist or has been removed.</p>
        <Link to="/cars" className="btn btn-primary">Browse All Cars</Link>
      </div>
    );
  }

  return (
    <div className="car-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/cars">Cars</Link>
          <span>/</span>
          <span>{car.brand} {car.model}</span>
        </div>

        <div className="car-details-content">
          {/* Image Gallery */}
          <div className="car-gallery">
            <div className="main-image">
              <img
                src={car.images[selectedImage]}
                alt={`${car.brand} ${car.model}`}
                loading="lazy"
              />
            </div>

            <div className="thumbnail-gallery">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${car.brand} ${car.model} ${index + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Car Information */}
          <div className="car-info-section">
            <div className="car-header">
              <div className="car-title">
                <h1>{car.brand} {car.model}</h1>
                <div className="car-year">{car.year}</div>
              </div>

              <div className="car-price">
                <span className="price">{formatPrice(car.price)}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="car-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`star ${i < Math.floor(car.rating) ? 'filled' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="rating-text">({car.rating} rating)</span>
            </div>

            {/* Description */}
            <div className="car-description">
              <h3>Description</h3>
              <p>{car.description}</p>
            </div>

            {/* Specifications */}
            <div className="car-specifications">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Engine</span>
                  <span className="spec-value">{car.specifications.engine}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Transmission</span>
                  <span className="spec-value">{car.specifications.transmission}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Fuel Type</span>
                  <span className="spec-value">{car.specifications.fuelType}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Mileage</span>
                  <span className="spec-value">{car.specifications.mileage}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Seating Capacity</span>
                  <span className="spec-value">{car.specifications.seatingCapacity} seats</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Color</span>
                  <span className="spec-value">{car.specifications.color}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="car-features">
              <h3>Features</h3>
              <div className="features-list">
                {car.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="car-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!car.inStock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="btn btn-primary add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!car.inStock}
                >
                  {car.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <Link to="/cart" className="btn btn-secondary">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <div className="related-cars">
            <h2>Related Cars</h2>
            <div className="cars-grid">
              {relatedCars.map((relatedCar, index) => (
                <div
                  key={relatedCar.id}
                  className="car-card-wrapper"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CarCard car={relatedCar} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

CarDetailsPage.displayName = 'CarDetailsPage';

export default CarDetailsPage;