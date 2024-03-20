import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartSlice from "./Slices/cartSlice";
import api from "./Slices/api";
 
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
 
setupListeners(store.dispatch);
 
export default store;
export type RootState=ReturnType<typeof store.getState>