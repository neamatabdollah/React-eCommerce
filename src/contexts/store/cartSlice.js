import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCount: 0,
  cartItem: [],
  footer: "",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action) => {
      console.log("action", action?.payload);
      state.totalCount = state.totalCount + 1;
    },
    decr: (state, action) => {
      console.log("action", action?.payload);
      state.totalCount = state.totalCount - 1;
    },
    addCart: (state, action) => {
      console.log("action", action.payload);
      const foundedEle = state.cartItem?.find(
        (p) => p?.id === action?.payload?.id
      );
      if (foundedEle) {
        state.cartItem = state.cartItem.map((p) => ({
          ...p,
          count: p?.id === action.payload.id ? p?.count + 1 : p?.count,
        }));
      } else {
        state.cartItem = [...state.cartItem, { ...action.payload, count: 1 }];
      }
      state.totalCount += 1;
    },

    removeFromCart: (state, action) => {
      console.log("action", action.payload);
      const foundedEle = state.cartItem?.find(
        (p) => p?.id === action?.payload?.id
      );
      if (foundedEle) {
        state.cartItem = state.cartItem.map((p) => ({
          ...p,
          count: p?.id === action.payload.id ? p?.count - 1 : p?.count,
        }));
      } else {
        state.cartItem = [...state.cartItem, { ...action.payload, count: 1 }];
      }
      state.totalCount -= 1;
    },
  },
});
console.log("cartSlice", cartSlice);
export const cartReducer = cartSlice.reducer;
// export const { increment } = cartSlice.actions;
export const { increment, decr, addCart, removeFromCart } = cartSlice.actions;
