import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cart.mjs';

export const store = configureStore({
    reducer: cartReducer
})