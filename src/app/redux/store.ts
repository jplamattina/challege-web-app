import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import itemReducer from './slices/itemSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        items: itemReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;