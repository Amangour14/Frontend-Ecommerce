import React from "react";
import {ProductProps } from "./Product";
import Product from "./Product";
import "./Home.css";
import { useGetAllProductsQuery } from "../../Redux/Slices/api";
 
const Home: React.FC = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error </div>;
 
  return (
    <div className="shop">
      <div className="shopTitle">
        {/* <h1>SIYARAM STORE</h1> */}
      </div>
      <div className="products">
        {data?.map((product) => (
        <Product data={product}  />
        ))}
      </div>
    </div>
  );
};
 
export default Home;