import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: 'user',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload) => {
      state.isAuthenticated = true;
      state.userRole = payload.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
