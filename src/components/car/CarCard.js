import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const CarCard = React.memo(({ car }) => {
  const dispatch = useDispatch();

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ car, quantity: 1 }));
  }, [dispatch, car]);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  // Memoize formatted price to prevent recalculation
  const formattedPrice = useMemo(() => formatPrice(car.price), [formatPrice, car.price]);

  // Memoize visible features to prevent array recreation
  const visibleFeatures = useMemo(() => car.features.slice(0, 3), [car.features]);
  const hasMoreFeatures = useMemo(() => car.features.length > 3, [car.features.length]);

  return (
    <div className="car-card">
      <Link to={`/cars/${car.id}`} className="car-card-link">
        <div className="car-image">
          <img src={car.thumbnail} alt={`${car.brand} ${car.model}`} loading="lazy" />
          <div className="car-badge">{car.category}</div>
        </div>

        <div className="car-info">
          <h3 className="car-name">
            {car.brand} {car.model}
          </h3>

          <p className="car-year">{car.year}</p>

          <div className="car-price">
            <span className="price">{formatPrice(car.price)}</span>
          </div>

          <div className="car-specs">
            <span>{car.specifications.fuelType}</span>
            <span>{car.specifications.transmission}</span>
            <span>{car.specifications.mileage}</span>
          </div>

          <div className="car-features">
            {visibleFeatures.map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
            {hasMoreFeatures && (
              <span className="feature-tag">+{car.features.length - 3} more</span>
            )}
          </div>

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
            <span className="rating-text">({car.rating})</span>
          </div>
        </div>
      </Link>

      <div className="car-actions">
        <button
          className="btn btn-primary add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!car.inStock}
        >
          {car.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        <Link to={`/cars/${car.id}`} className="btn btn-secondary">
          View Details
        </Link>
      </div>
    </div>
  );
});

CarCard.displayName = 'CarCard';

export default CarCard;