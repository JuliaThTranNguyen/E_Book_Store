import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CartItem } from '../../types/Cart'
import { Book } from '../../types/Book'

const initialState: CartItem[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const foundIndex = state.findIndex(
        (item: CartItem) => item._id === action.payload._id
      )
      if (foundIndex !== -1) {
        state[foundIndex].quantity += 1
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const foundIndex = state.findIndex(
        (item: CartItem) => item._id === action.payload
      )
      if (foundIndex !== -1) {
        state.splice(foundIndex, 1)
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const foundIndex = state.findIndex(
        (item: CartItem) => item._id === action.payload._id
      )
      if (foundIndex !== -1) {
        state[foundIndex].quantity = action.payload.quantity
      }
    },
    clearCart: (state) => {
      state.splice(0, state.length); 
    },
  },
})

const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartReducer;
