import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {BorrowedBooks } from "../../types/Book";
import { ReturnCartItem } from "../../types/ReturnCart";

const initialState: ReturnCartItem[] = [];

const accountManagementSlice = createSlice({
  name: "accountManagement",
  initialState,
  reducers: {
    addBorrowedItemsToCart: (state, action: PayloadAction<BorrowedBooks>) => {
      const foundIndex = state.findIndex(
        (item: ReturnCartItem) => item._id === action.payload._id
      );
      if (foundIndex !== -1) {
        state[foundIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeBorrowedItemsFromCart: (state, action: PayloadAction<string>) => {
      const foundIndex = state.findIndex(
        (item: ReturnCartItem) => item._id === action.payload
      );
      if (foundIndex !== -1) {
        state.splice(foundIndex, 1);
      }
    },
    updateBorrowedItemsQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const foundIndex = state.findIndex(
        (item: ReturnCartItem) => item._id === action.payload._id
      );
      if (foundIndex !== -1) {
        state[foundIndex].quantity = action.payload.quantity;
      }
    },
    clearBorrowedItemsCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

const accountManagementReducer = accountManagementSlice.reducer;
export const {
  addBorrowedItemsToCart,
  removeBorrowedItemsFromCart,
  updateBorrowedItemsQuantity,
  clearBorrowedItemsCart,
} = accountManagementSlice.actions;
export default accountManagementReducer;