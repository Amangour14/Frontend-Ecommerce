import React, { useState, FormEvent, ChangeEvent } from "react";
import "./Check.css";
import { useNavigate } from "react-router-dom";
 
interface Address {
  street: string;
  city: string;
  zipCode: string;
}
 
const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    zipCode: "",
  });
 
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
 
  const handleCheckoutSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('address', JSON.stringify(address));
    navigate("/payment");
  };
 
  return (
    <div className="contact-form">
      <h2>Address</h2>
      <form onSubmit={handleCheckoutSubmit}>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            required
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            required
          />
        </label>
        <br />
        <label>
          Zip Code:
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleAddressChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Address</button>
      </form>
    </div>
  );
};
 
export default Checkout;