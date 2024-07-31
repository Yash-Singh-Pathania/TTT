import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import matchesReducer from './matchesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        matches: matchesReducer,
    },
});

export default store;
