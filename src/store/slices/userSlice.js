import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userInfo: {},
  loading: false,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = '';
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      state.error = '';
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userInfo = {};
      state.error = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = {};
      state.error = '';
    },

    registerStart: (state) => {
      state.loading = true;
      state.error = '';
    },

    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      state.error = '';
    },

    registerFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userInfo = {};
      state.error = action.payload;
    },

    updateProfile: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },

    clearError: (state) => {
      state.error = '';
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  updateProfile,
  clearError
} = userSlice.actions;

// Selectors with stable references to prevent infinite loops
export const selectUser = (state) => {
  // Ensure we return a stable reference by avoiding object recreation
  const userInfo = state?.user?.userInfo;
  return userInfo && typeof userInfo === 'object' ? userInfo : {};
};

export const selectIsAuthenticated = (state) => {
  return Boolean(state?.user?.isAuthenticated);
};

export const selectUserLoading = (state) => {
  return Boolean(state?.user?.loading);
};

export const selectUserError = (state) => {
  return state?.user?.error || '';
};

export default userSlice.reducer;