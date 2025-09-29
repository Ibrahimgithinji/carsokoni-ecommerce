import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, selectFilteredCars, setFilters, setSortBy } from '../store/slices/carsSlice';
import CarCard from '../components/car/CarCard';
import SearchBar from '../components/common/SearchBar';
import FilterSidebar from '../components/car/FilterSidebar';
import Loading from '../components/common/Loading';

const ITEMS_PER_PAGE = 6;

const CarListingsPage = () => {
  const dispatch = useDispatch();
  const { loading, error, filters, sortBy } = useSelector(state => state.cars);
  const filteredCars = useSelector(selectFilteredCars);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const handleSearch = useCallback((searchTerm) => {
    dispatch(setFilters({ searchTerm }));
  }, [dispatch]);

  const handleSortChange = useCallback((e) => {
    dispatch(setSortBy(e.target.value));
  }, [dispatch]);

  // Memoize pagination logic to prevent unnecessary recalculations
  const totalPages = useMemo(() => Math.ceil(filteredCars.length / ITEMS_PER_PAGE), [filteredCars.length]);
  const startIndex = useMemo(() => (currentPage - 1) * ITEMS_PER_PAGE, [currentPage]);
  const paginatedCars = useMemo(() => filteredCars.slice(startIndex, startIndex + ITEMS_PER_PAGE), [filteredCars, startIndex]);

  const getSortLabel = useCallback((value) => {
    const sortOptions = {
      'newest': 'Newest First',
      'oldest': 'Oldest First',
      'price-low-high': 'Price: Low to High',
      'price-high-low': 'Price: High to Low',
      'name-a-z': 'Name: A to Z',
      'name-z-a': 'Name: Z to A'
    };
    return sortOptions[value] || value;
  }, []);

  if (loading) {
    return <Loading message="Loading car listings..." />;
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
    <div className="car-listings-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Browse Cars</h1>
          <p>Discover your perfect vehicle from our extensive collection</p>
        </div>

        {/* Search and Controls */}
        <div className="listings-controls">
          <div className="search-section">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by brand, model, or category..."
              initialValue={filters.searchTerm}
            />
          </div>

          <div className="controls-section">
            <button
              className="btn btn-secondary filter-toggle"
              onClick={() => setIsFilterOpen(true)}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>

            <div className="sort-section">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing {paginatedCars.length} of {filteredCars.length} vehicles
            {filters.searchTerm && (
              <span> for "<strong>{filters.searchTerm}</strong>"</span>
            )}
          </p>
        </div>

        {/* Main Content */}
        <div className="listings-content">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Cars Grid */}
          <div className="cars-container">
            {paginatedCars.length > 0 ? (
              <>
                <div className="cars-grid">
                  {paginatedCars.map((car, index) => (
                    <div
                      key={car.id}
                      className="car-card-wrapper"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>

                    <div className="pagination-info">
                      <span>Page {currentPage} of {totalPages}</span>
                    </div>

                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3>No cars found</h3>
                <p>Try adjusting your search criteria or filters to find what you're looking for.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(setFilters({ searchTerm: '', brands: [], categories: [] }));
                    dispatch(setSortBy('newest'));
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListingsPage;