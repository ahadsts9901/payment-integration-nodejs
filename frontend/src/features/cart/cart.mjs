import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
}



export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const cart = {
                quantity: 1,
                ...action.payload
            }
            state.cart.push(cart)
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        increaseQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload)
            item.quantity++
        },
        decreaseQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload)
            item.quantity--
            if (item.quantity <= 0) {
                state.cart = state.cart.filter((cartItem) => cartItem.id !== action.payload);
            }
        },
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cart.actions

export default cart.reducer