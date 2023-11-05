import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  wishListItems: [],
  uid: null,
  isLoading: true
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
        toast.success(`${action.payload.title} added to the cart`, {
          position: "bottom-right",
          autoClose: 600,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      toast.error(`${action.payload.title} removed from the cart`, {
        position: "bottom-right",
        autoClose: 600,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },

    addToWishlist(state, action) {
      const { id } = action.payload;
      const itemIndex = state.wishListItems.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.wishListItems.splice(itemIndex, 1);
        toast.warning(`${action.payload.title} removed from wishlist`, {
          position: "bottom-right",
          autoClose: 600,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        state.wishListItems.push({ ...action.payload, heart: true });
        toast.info(`${action.payload.title} added to wishlist`, {
          position: "bottom-right",
          autoClose: 600,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
  loginUser,
  logoutUser,
  setLoading
} = cartSlice.actions;

export default cartSlice.reducer;