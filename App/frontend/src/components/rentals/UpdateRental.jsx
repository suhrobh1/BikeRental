import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateRental = () => {
  const { id } = useParams();
  console.log("id in ln 10 in UpdateRental", id);
  const navigate = useNavigate();
  const location = useLocation();
  const prevRental = location.state.rental;

  const [formData, setFormData] = useState({
    rental_id: prevRental.rental_id || "",
    customer_id: prevRental.customer_id || "",
    bike_id: prevRental.bike_id || "",
    rental_date: prevRental.rental_date ? prevRental.rental_date.split('T')[0] : '',
    return_date: prevRental.return_date ? prevRental.return_date.split('T')[0] : '',
    total_cost: prevRental.total_cost || "",
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
      const [customerResponse, bikesResponse] = await Promise.all([
        axios.get(customerURL),
        axios.get(bikesURL),
      ]);

      setCustomers(customerResponse.data);
      setBikes(bikesResponse.data);
    } catch (error) {
      alert("Error fetching data from the server.");
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function isUpdate() {
    if (
      JSON.stringify(formData) ===
      JSON.stringify({
        rental_id: prevRental.rental_id || "",
        customer_id: prevRental.customer_id || "",
        bike_id: prevRental.bike_id || "",
        rental_date: prevRental.rental_date || "",
        return_date: prevRental.return_date || "",
        total_cost: prevRental.total_cost || "",
      })
    ) {
      alert("No changes made.");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUpdate()) return;

    try {
      const URL = import.meta.env.VITE_API_URL + "rentals/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating rental!");
      } else {
        alert(response.data.message);
        navigate("/rentals");
      }
    } catch (error) {
      console.error("Error updating rental!", error);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", color: "#333" }}>Update Rental</h2>
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
          backgroundColor: "#f9f9f9",
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
          <label htmlFor="customer_id" style={{ marginLeft: "10px", fontWeight: "bold", whiteSpace: "nowrap" }}>
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
          <label htmlFor="bike_id" style={{ marginLeft: "10px", fontWeight: "bold", whiteSpace: "nowrap" }}>
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
            Update Rental
          </button>
          <button
            type="button"
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
};

export default UpdateRental;