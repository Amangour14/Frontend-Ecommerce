import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../Redux/Slices/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import {  RootState } from "../../Redux/store";

 
const Payment: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector((state: RootState) => state.cart.totalCost);
  const [paymentMethod, setPaymentMethod] = useState("COD");
 
  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };
 
  const handlePayNowClick = () => {
    axios
      .post('http://localhost:8080/order', order)
      .then(() => {
        toast.success(`Hurray ! Order Placed Successfully`, { position: "top-center" });
        navigate("/");
        dispatch(cartAction.emptyCart());
      });
  };
 
  const [order, setOrder] = useState({});
 
  useEffect(() => {
    let addressobj = JSON.parse(localStorage.getItem('address') || '{}');
    let orderAddress = `${addressobj["street"]}, ${addressobj["city"]}, ${addressobj["zipCode"]} `;
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let totalCost = (JSON.parse(localStorage.getItem('totalCost') || '0')).toFixed(2);
    setOrder({ address: orderAddress, products: [...cart], totalCost });
  }, []);
 
  return (
    <div>
      <h2>Payment</h2>
      <hr></hr>
      <br></br>
      <h2>Total Cost :${total.toFixed(2)}</h2>
      <div>
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={handlePaymentChange}>
            <option value="COD">Cash on Delivery (COD)</option>
          </select>
        </label>
      </div>
      <br />
      <button onClick={handlePayNowClick}>Placed Your Order</button>
    </div>
  );
};
 
export default Payment;