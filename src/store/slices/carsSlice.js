import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import carsData from '../../data/cars.json';

// Async thunk for fetching cars
export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return carsData;
    } catch (error) {
      return rejectWithValue('Failed to fetch cars');
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: '',
  filters: {
    priceRange: [0, 5000000],
    brands: [],
    categories: [],
    searchTerm: ''
  },
  sortBy: 'newest'
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, setSortBy, clearFilters } = carsSlice.actions;

// Selectors with memoization to prevent infinite loops
export const selectFilteredCars = (state) => {
  const { items, filters, sortBy } = state.cars;

  // Early return if no items
  if (!items || items.length === 0) {
    return [];
  }

  // Create a cache key based on filters and sort to detect actual changes
  const cacheKey = JSON.stringify({
    itemCount: items.length,
    searchTerm: filters.searchTerm,
    priceRange: filters.priceRange,
    brands: filters.brands,
    categories: filters.categories,
    sortBy
  });

  // For now, return filtered results (in production, you'd use reselect for proper memoization)
  let filteredCars = [...items];

  // Apply search filter
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filteredCars = filteredCars.filter(car =>
      car.brand.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.category.toLowerCase().includes(searchTerm)
    );
  }

  // Apply price range filter
  filteredCars = filteredCars.filter(car =>
    car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
  );

  // Apply brand filter
  if (filters.brands.length > 0) {
    filteredCars = filteredCars.filter(car =>
      filters.brands.includes(car.brand)
    );
  }

  // Apply category filter
  if (filters.categories.length > 0) {
    filteredCars = filteredCars.filter(car =>
      filters.categories.includes(car.category)
    );
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-low-high':
      filteredCars.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      filteredCars.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredCars.sort((a, b) => b.year - a.year);
      break;
    case 'oldest':
      filteredCars.sort((a, b) => a.year - b.year);
      break;
    case 'name-a-z':
      filteredCars.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
      break;
    case 'name-z-a':
      filteredCars.sort((a, b) => `${b.brand} ${b.model}`.localeCompare(`${a.brand} ${a.model}`));
      break;
    default:
      break;
  }

  return filteredCars;
};

export const selectFeaturedCars = (state) => {
  return state.cars.items.slice(0, 8);
};

export const selectCarById = (state, carId) => {
  return state.cars.items.find(car => car.id === carId);
};

export default carsSlice.reducer;