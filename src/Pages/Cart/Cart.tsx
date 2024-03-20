import React from "react";
import CartItem from "./Cart-item";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  RootState } from "../../Redux/store";

import "./Cart.css";
 
const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const total = useSelector((state: RootState) => state.cart.totalCost.toFixed(2));
 
  return (
    <>
      <div className="cart">
        <div className="cart-items">
          {cartItems.map((product) => (
           <CartItem key={product.id} data={product} />
          ))}
        </div>
      </div>
      {total !== "0.00" && cartItems.length !== 0 ? (
        <div className="checkout">
          <div>
            <h2>Total Cost : ${total}</h2>
          </div>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button onClick={() => navigate("/checkout")}> Checkout </button>
        </div>
      ) : (
        <div className="checkout">
          <h1>Your Cart is Empty</h1>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
        </div>
      )}
    </>
  );
};
 
export default Cart;