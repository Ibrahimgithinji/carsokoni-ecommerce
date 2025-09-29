import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { car, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === car.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...car, quantity });
      }

      // Recalculate total and item count
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
    },

    removeFromCart: (state, action) => {
      const carId = action.payload;
      state.items = state.items.filter(item => item.id !== carId);

      // Recalculate total and item count
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
    },

    updateCartQuantity: (state, action) => {
      const { carId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== carId);
      } else {
        const item = state.items.find(item => item.id === carId);
        if (item) {
          item.quantity = quantity;
        }
      }

      // Recalculate total and item count
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;

// Selectors with stable references to prevent infinite loops
export const selectCartItems = (state) => {
  const items = state?.cart?.items;
  return Array.isArray(items) ? items : [];
};

export const selectCartTotal = (state) => {
  const total = state?.cart?.total;
  return (typeof total === 'number' && !isNaN(total)) ? total : 0;
};

export const selectCartItemCount = (state) => {
  const itemCount = state?.cart?.itemCount;
  return (typeof itemCount === 'number' && !isNaN(itemCount)) ? itemCount : 0;
};

export const selectCartItemById = (state, carId) => {
  const items = state?.cart?.items;
  if (!Array.isArray(items) || !carId) return undefined;
  return items.find(item => item?.id === carId);
};

export default cartSlice.reducer;