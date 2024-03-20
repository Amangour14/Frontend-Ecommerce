import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

 export interface CartItem {
  id: number;
  productName: string;
  price: number;
  productImage:string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  totalCost: number;
}

const initState: CartState = {
  cart: JSON.parse(localStorage.getItem("cart") || '[]'),
  totalCost: parseFloat(localStorage.getItem("totalCost") || '0'),
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalCost += newItem.price;
        localStorage.setItem("cart", JSON.stringify(state.cart));
        toast.info(`1 ${newItem.productName} quantity added to cart`, {
          position: "bottom-left",
        });
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
        state.totalCost += newItem.price;
        localStorage.setItem("cart", JSON.stringify(state.cart));
        toast.success(`${newItem.productName} added to cart successfully!`, {
          position: "bottom-right",
        });
      }
      localStorage.setItem("totalCost", state.totalCost.toString());
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.cart.findIndex((item) => item.id === id);
      const cartItem = state.cart[index];
      state.cart = state.cart.filter((item) => item.id !== id);
      state.totalCost -= cartItem.price * cartItem.quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalCost", state.totalCost.toString());
      toast.success(`${cartItem.productName} removed from the cart!`, {
        position: "top-center",
      });
    },
    updateCartItemQuantity(state, action: PayloadAction<{ id: number; numberOfItems: number }>) {
      const { id, numberOfItems } = action.payload;
      const index = state.cart.findIndex((item) => item.id === id);
      const cartItem = state.cart[index];
      if (!cartItem) {
        toast.info(`Item not present in the cart!`, {
          position: "top-center",
        });
      } else {
        cartItem.quantity += numberOfItems;
        state.totalCost += numberOfItems * cartItem.price;
        if (cartItem.quantity === 0) {
          state.cart.splice(index, 1);
          toast.success(`${cartItem.productName} removed from the cart!`, {
            position: "bottom-right",
          });
        }
        if (numberOfItems === -1) {
          toast.info(`1 ${cartItem.productName} quantity decreased from the cart!`, {
            position: "top-left",
          });
        } else {
          toast.info(`1 ${cartItem.productName} quantity increased from the cart!`, {
            position: "top-left",
          });
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalCost", state.totalCost.toString());
    },
    emptyCart(state) {
      state.cart = [];
      state.totalCost = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("totalCost");
    },
  },
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;



