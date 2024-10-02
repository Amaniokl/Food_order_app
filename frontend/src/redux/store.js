import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './slices/restaurantSlice';

const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,
    },
});

export default store;
