import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  RootState } from "../../Redux/store";
import { cartAction } from "../../Redux/Slices/cartSlice";
 
interface CartItemProps {
  data: {
    id: number;
    productName: string;
    price: number;
    productImage: string;
    quantity: number;
  };
}
 
const CartItem: React.FC<CartItemProps> = (props) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
 
  const { id, productName, price, productImage, quantity } = props.data;
 
  const handleRemove = (id: number) => {
    console.log(cart);
    for (const item of cart.cart) {
      if (item.id === id) {
        dispatch(cartAction.removeFromCart(id));
      }
    }
  };
 
  const handleQuantity = (numberOfItems: number) => {
    dispatch(
      cartAction.updateCartItemQuantity({
        id: id,
        numberOfItems: numberOfItems,
      })
    );
  };
 
  return (
    <div className="cartItem">
      <img src={productImage} alt="img" />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => handleQuantity(-1)}> - </button>
          <input value={quantity} readOnly />
          <button onClick={() => handleQuantity(1)}> + </button>
          <button onClick={() => handleRemove(id)}>Remove</button>
        </div>
        <h5>Total Price: ${(quantity * price).toFixed(2)}</h5>
      </div>
    </div>
  );
};
 
export default CartItem;