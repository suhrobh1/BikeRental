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

      const handleSubmit = async (event) => {
        event.preventDefault();

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
                navigate("/people");
            }catch(error){
                console.log( "Error updating customer!", error);
                }
            }
         }

        
        
        return (
            <div>
              <h2>Update Customer</h2>
              
               <form onSubmit={handleSubmit}>
                <div>
                  <label>Name: </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    required
                    defaultValue={prevCustomer.name}
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                    required
                    defaultValue={prevCustomer.email}
                  />
                </div>
                <div>
                  <label>Phone numer:</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleInputChange}
                    required
                    defaultValue={prevCustomer.phone}
                  />
                </div>
                <button type="button" onClick={() => navigate("/customers")}>
                  Cancel
                </button>
                <button type="submit">Update</button>
              </form> 
            </div>
          );
        };
        
        export default UpdateCustomer;