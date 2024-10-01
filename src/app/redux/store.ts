import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import { placeholderApi } from  './services/authService'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        [placeholderApi.reducerPath]: placeholderApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(placeholderApi.middleware),
});

export default store;