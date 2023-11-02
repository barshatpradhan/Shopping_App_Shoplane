import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cartItems: [],
  wishListItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      if (item) {
        item.itemQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, itemQuantity: 1 });
      }
    },

    removeFromCart(state, action) {
      const { id } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      if (item) {
        if (item.itemQuantity > 1) {
          item.itemQuantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
      }
    },

    deleteFromCart(state, action) {
      // const { id, title } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },

    addToWishlist(state, action) {
      const { id } = action.payload;
      const itemIndex = state.wishListItems.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.wishListItems.splice(itemIndex, 1);
      } else {
        state.wishListItems.push({ ...action.payload, heart: true });
      }
    },

    removeFromWishlist(state, action) {
      const { id } = action.payload;
      state.wishListItems = state.wishListItems.filter(
        (item) => item.id !== id
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  addToWishlist,
  removeFromWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;