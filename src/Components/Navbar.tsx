import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store'; // You need to replace './store' with the actual path to your store

export const Navbar: React.FC = () => {
  // const cartItem = useSelector((state: RootState) => state.cart.numberOfCartItem)
  const cartItem = useSelector((state: RootState) => state.cart.cart);
  // console.log("Hi");
  let num: number = cartItem.length;
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/cart">
          {/* <ShoppingCart size={30} />{num > 0 && (num)} */}
          <ShoppingCart size={30} /><sup>{num > 0 && (num)}</sup>
        </Link>
      </div>
    </div>
  );
};


