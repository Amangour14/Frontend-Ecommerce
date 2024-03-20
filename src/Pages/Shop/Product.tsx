import React from "react";
import { useDispatch } from "react-redux";
import { cartAction, CartItem } from "../../Redux/Slices/cartSlice"; // Assuming you have defined ProductItem type in your cartSlice
import { Dispatch } from "redux";
 
 export interface ProductProps {
  data: CartItem;
}
 
const Product: React.FC<ProductProps> = ({ data }) => {
  const { id, productName, price, productImage } = data;
  const dispatch: Dispatch<any> = useDispatch();
 
  const addTo = (): void => {
    const itemObj = {
      id: id,
      productName: productName,
      price: price,
      productImage: productImage,
      quantity: 1
    };
    dispatch(cartAction.addToCart(itemObj));
  };
 
  const handleQuantity = (numberOfItems: number): void => {
    dispatch(
      cartAction.updateCartItemQuantity({
        id: id,
        numberOfItems: numberOfItems,
      })
    );
  };
 
  return (
    <div className="product">
      <img src={productImage} alt="product img"/>
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <span>
        <button className="ToCartBttn" onClick={() => handleQuantity(-1)}> - </button>
        <button className="addToCartBttn" onClick={addTo}>Add To Cart</button>
        <button className="ToCartBttn" onClick={addTo}> + </button>
      </span>
    </div>
  );
};
 
export default Product;