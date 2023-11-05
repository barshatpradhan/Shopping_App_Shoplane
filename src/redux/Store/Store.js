import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../Slice/CartSlice";
import AuthSlice from "../Slice/AuthSlice"

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    user: AuthSlice
  },
});
