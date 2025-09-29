import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, clearFilters } from '../../store/slices/carsSlice';

const FilterSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.cars);

  const categories = ['Sedan', 'SUV', 'Hatchback', 'Luxury'];
  const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Audi', 'Nissan', 'Hyundai', 'Kia'];

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    const newPriceRange = [...filters.priceRange];
    if (name === 'minPrice') {
      newPriceRange[0] = Number(value);
    } else {
      newPriceRange[1] = Number(value);
    }
    dispatch(setFilters({ priceRange: newPriceRange }));
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    dispatch(setFilters({ brands: newBrands }));
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    dispatch(setFilters({ categories: newCategories }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="filter-overlay" onClick={onClose}></div>}

      <aside className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="filter-header">
          <h3>Filters</h3>
          <button
            className="filter-close"
            onClick={onClose}
            aria-label="Close filters"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="filter-content">
          {/* Price Range */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-range">
              <div className="price-input">
                <label>Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.priceRange[0]}
                  onChange={handlePriceRangeChange}
                  placeholder="0"
                />
              </div>
              <div className="price-input">
                <label>Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.priceRange[1]}
                  onChange={handlePriceRangeChange}
                  placeholder="5000000"
                />
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="filter-group">
            <h4>Brands</h4>
            <div className="filter-options">
              {brands.map(brand => (
                <label key={brand} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <span className="checkmark"></span>
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <h4>Categories</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="checkmark"></span>
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            className="btn btn-secondary clear-filters-btn"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;