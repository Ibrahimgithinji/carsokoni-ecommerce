import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, selectCartItemCount, updateCartQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';

const CartPage = React.memo(() => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemCount = useSelector(selectCartItemCount);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const handleQuantityChange = useCallback((carId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(carId));
    } else {
      dispatch(updateCartQuantity({ carId, quantity: newQuantity }));
    }
  }, [dispatch]);

  const handleRemoveItem = useCallback((carId) => {
    dispatch(removeFromCart(carId));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  }, [dispatch]);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any cars to your cart yet.</p>
            <Link to="/cars" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Cart Header */}
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-items-header">
              <h2>Items</h2>
              <button
                className="btn btn-secondary clear-cart-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.thumbnail} alt={`${item.brand} ${item.model}`} loading="lazy" />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <h3>
                        <Link to={`/cars/${item.id}`}>
                          {item.brand} {item.model}
                        </Link>
                      </h3>
                      <button
                        className="remove-item-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove item"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="cart-item-details">
                      <p className="cart-item-year">{item.year}</p>
                      <p className="cart-item-category">{item.category}</p>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-prices">
                        <span className="unit-price">{formatPrice(item.price)}</span>
                        <span className="total-price">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({cartItemCount} items)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <Link to="/cars" className="btn btn-secondary">
                Continue Shopping
              </Link>
              <button className="btn btn-primary checkout-btn">
                Proceed to Checkout
              </button>
            </div>

            <div className="cart-security">
              <div className="security-icons">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CartPage.displayName = 'CartPage';

export default CartPage;