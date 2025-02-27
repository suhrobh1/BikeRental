import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateCustomer(){
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
  };


  try{
    const URL = import.meta.env.VITE_API_URL + "customers";
    const response = await axios.post(URL, newCustomer);
    if(response.status === 201){
      navigate("/customers");
    }else{
      alert("Error creating customer");
    }
    }catch(error){
    alert("Erro creating customer");
    console.error("Error creating customer:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () =>{
    setFormData({
      name: "",
      email: "",
      phone: "",
    })
  };
  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    console.log("In createCustomer, ln 48 | formData:", formData);
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return(
    <>
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={formData.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          defaultValue={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <button type="submit">Add Customer</button>
      </form>
    </>
    );

    }

    
 export default CreateCustomer;