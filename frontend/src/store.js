import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import {cartSlice} from './slices/cartSlice';
import authSlice from './slices/authSlice';
export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [apiSlice.reducerPath]: apiSlice.reducer,
      cart: cartSlice.reducer,
      auth:authSlice.reducer
      
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
  });

  setupListeners(store.dispatch)