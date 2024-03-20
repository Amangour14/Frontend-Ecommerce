import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import { useSubmitFormMutation } from "../../Redux/Slices/api";
import { toast } from "react-toastify";
 
interface FormValues {
  name: string 
  email: string
  message:string }

const Contact: React.FC = () => {
    
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    message: ""
  });
 
  const navigate = useNavigate();
  const [submitForm, { isLoading, isError }] = useSubmitFormMutation();
 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
    //  const formDataToSend = new FormData();
    //   formDataToSend.append('name', formData.name);
    //   formDataToSend.append('email', formData.email);
    //   formDataToSend.append('message', formData.message);
    const formDataToSend = formData
      await submitForm(formDataToSend);
      toast.success("Your Query submitted successfully!", { position: "top-center" });
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
 
  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form action="Post" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required onChange={handleChange} />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required onChange={handleChange} />
        
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows={4} required onChange={handleChange}></textarea>
        
        <button type="submit" disabled={isLoading}>Submit</button>
        {isError && <div>Error Submitting Form</div>}
      </form>
    </div>
  );
};
 
export default Contact;