import { productApi } from "./apiSlice";
import cartReducer from "./cartSlice";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
      cart: cartReducer,
      [productApi.reducerPath] : productApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
  })
 