import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  uid: null, 
  isLoading: true,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      const { uid, cartItems, wishListItems } = action.payload;
      state.uid = uid; 
      state.users[uid] = { cartItems, wishListItems };
    },
    logoutUser(state, action) {
      state.users = {}; 
      state.uid = null; 
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    saveUserSpecificData(state, action) {
      const { uid, userCart, userWishlist } = action.payload;
      state.users[uid] = { userCart, userWishlist };
    },
  },
});

export const { loginUser, logoutUser, setLoading, saveUserSpecificData } =
  authSlice.actions;

export default authSlice.reducer;
