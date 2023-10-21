import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quntity } = action.payload;
      const quntityNumber = quntity ? quntity : 1;
      const index = state.cart.findIndex((item) => product.id === item.id);
      if (index < 0) {
        state.cart.push({ ...product, quntity: quntityNumber });
      } else {
        state.cart[index].quntity = state.cart[index].quntity + quntityNumber;
      }
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((product) => action.payload !== product.id);
    },
    decrementProduct: (state, action) => {
      const index = state.cart.findIndex((product) => action.payload === product.id);
      const quntity = state.cart[index].quntity
      if(quntity>1){
        state.cart[index].quntity  = quntity - 1
      }
    },
    incremenProduct: (state, action) => {
      const index = state.cart.findIndex((product) => action.payload === product.id);
      state.cart[index].quntity = state.cart[index].quntity + 1;
    },
  },
});

export const { addToCart, incremenProduct, decrementProduct, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
