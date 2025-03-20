import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";




const UpdateCustomer = () => {
    const {id} = useParams();
    console.log("id in ln 10 in UpdateCustomer", id);
    const navigate = useNavigate();
    const location = useLocation();
    const prevCustomer = location.state.customer;


    const [formData, setFormData] = useState({
        customer_id: prevCustomer.id || '',
        name: prevCustomer.name || '',
        email: prevCustomer.email || '',
        phone: prevCustomer.phone || '',
    });

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };


      function isUpdate(){
        // Check if formData is equal to old customer
        if (JSON.stringify(formData) === JSON.stringify({
          name: prevCustomer.name || '',
          email: prevCustomer.email|| '',
          phone: prevCustomer.phone || '',
        })) {
          alert("No changes made.");
          return false;
        }
        return true
      }

      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();


        if (!validateEmail(formData.email)) {
          alert("Please enter a valid email address.");
          return;
        }

        if (isUpdate()) {
            try{
                console.log ("In UpdateCustomer, ln 47 | id", id);
                const URL = import.meta.env.VITE_API_URL + "customers/" + id;
                const response = await axios.put(URL, formData);
                if(response.status != 200){
                    alert("Error updating customer!");
                }else{
                    alert(response.data.message);
                }
                navigate("/customers");
            }catch(error){
                console.log( "Error updating customer!", error);
                }
            }
         }

        
        
        return (
<div 
  style={{ 
    maxWidth: "400px", 
    margin: "0 auto", 
    padding: "20px", 
    border: "1px solid #ddd", 
    borderRadius: "8px", 
    backgroundColor: "#f9f9f9",
    textAlign: "center" 
  }}
>
  <h2 style={{ color: "#333", marginBottom: "20px" }}>Update Customer</h2>
  
  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
    
    <div style={{ marginBottom: "10px", textAlign: "left" }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Name:</label>
      <input
        type="text"
        name="name"
        onChange={handleInputChange}
        required
        defaultValue={prevCustomer.name}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
      />
    </div>

    <div style={{ marginBottom: "10px", textAlign: "left" }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Email:</label>
      <input
        type="text"
        name="email"
        onChange={handleInputChange}
        required
        defaultValue={prevCustomer.email}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
      />
    </div>

    <div style={{ marginBottom: "10px", textAlign: "left" }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Phone Number:</label>
      <input
        type="text"
        name="phone"
        onChange={handleInputChange}
        required
        defaultValue={prevCustomer.phone}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
      />
    </div>

    <div style={{ display: "flex", justifyContent: "space-between" }}>
          
          <button
            type="submit"
            style={{ 
              backgroundColor: "#007bff", 
              color: "#fff", 
              fontSize: "18px", 
              padding: "10px 20px", 
              borderRadius: "5px", 
              border: "none", 
              cursor: "pointer"
            }}
          >
            Update Customer
          </button>
          <button
            type="button"
            onClick={() => navigate("/customers")}
            style={{ 
              backgroundColor: "red", 
              color: "#fff", 
              fontSize: "18px", 
              padding: "10px 20px", 
              borderRadius: "5px", 
              border: "none", 
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>

  </form> 
</div>

          );
        };
        
        export default UpdateCustomer;