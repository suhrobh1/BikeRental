import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRental() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rental_id: "",
    customer_id: "",
    bike_id: "",
    rental_date: "",
    return_date: "",
    total_cost: "",
  });

  const [customers, setCustomers] = useState([]);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const customerURL = import.meta.env.VITE_API_URL + "customers";
      const bikesURL = import.meta.env.VITE_API_URL + "bikes";
      const [customerResponse, bikesResponse] = await Promise.all ([axios.get(customerURL), axios.get(bikesURL)]);
      console.log("In Create Rental, ln 29 | customerResponse.data: ", customerResponse.data) ;
      setCustomers(customerResponse.data);
      setBikes(bikesResponse.data);
    } catch (error) {
      alert("Error fetching data from the server.");
      console.error("Error fetching data:", error);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRental = {
      rental_id: formData.rental_id,
      customer_id: formData.customer_id,
      bike_id: formData.bike_id,
      rental_date: formData.rental_date,
      return_date: formData.return_date,
      total_cost: formData.total_cost,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "rentals";
      const response = await axios.post(URL, newRental);
      if (response.status === 201) {
        navigate("/rentals");
      } else {
        alert("Error creating rental");
      }
    } catch (error) {
      alert("Error creating rental");
      console.error("Error creating rental:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      rental_id: "",
      customer_id: "",
      bike_id: "",
      rental_date: "",
      return_date: "",
      total_cost: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("In CreateRental, formData:", formData);
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
    console.log("In CreateRental, ln 84 | formData", formData)
  };

  return (
        <>
      <h2 style={{ textAlign: "center", color: "#333" }}>Add Rental</h2>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          maxWidth: "400px", 
          margin: "0 auto", 
          padding: "20px", 
          border: "1px solid #ddd", 
          borderRadius: "8px", 
          backgroundColor: "#f9f9f9" 
        }}
      >

        {/* Customer Selection Row */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <select 
            name="customer_id" 
            onChange={handleInputChange} 
            value={formData.customer_id}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => ( 
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.name}
              </option>
            ))}
          </select>
          <label 
            htmlFor="customer_id" 
            style={{ marginLeft: "10px", fontWeight: "bold", whiteSpace: "nowrap" }}
          >
            Customer ID: {formData.customer_id}
          </label>
        </div>

        {/* Bike Selection Row */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <select 
            name="bike_id" 
            onChange={handleInputChange} 
            value={formData.bike_id}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select Bike</option>
            {bikes.map((bike) => ( 
              <option key={bike.bike_id} value={bike.bike_id}>
                {bike.type}
              </option>
            ))}
          </select>
          <label 
            htmlFor="bike_id" 
            style={{ marginLeft: "10px", fontWeight: "bold", whiteSpace: "nowrap" }}
          >
            Bike ID: {formData.bike_id}
          </label>
        </div>

        <label htmlFor="rental_date" style={{ fontWeight: "bold", marginBottom: "5px" }}>Rental Date</label>
        <input
          type="date"
          name="rental_date"
          value={formData.rental_date}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label htmlFor="return_date" style={{ fontWeight: "bold", marginBottom: "5px" }}>Return Date</label>
        <input
          type="date"
          name="return_date"
          value={formData.return_date}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label htmlFor="total_cost" style={{ fontWeight: "bold", marginBottom: "5px" }}>Total Cost</label>
        <input
          type="number"
          name="total_cost"
          value={formData.total_cost}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

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
            Submit
          </button>

          <button 
            onClick={() => navigate("/rentals")}
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
    </>


  );
}

export default CreateRental;
