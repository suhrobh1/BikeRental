import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateMaintenanceLog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service_date: "",
    description: "",
  });


  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      
      const URL = import.meta.env.VITE_API_URL + "bikes";
      const bikesResponse = await axios.get(URL)
      setBikes(bikesResponse.data);
    } catch (error) {
      alert("Error fetching data from the server.");
      console.error("Error fetching data:", error);
    }
  };






  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLog = { ...formData };

    try {
      const URL = import.meta.env.VITE_API_URL + "maintenance_logs";
      const response = await axios.post(URL, newLog);
      if (response.status === 201) {
        navigate("/maintenance_logs");
      } else {
        alert("Error creating maintenance log");
      }
    } catch (error) {
      alert("Error creating maintenance log");
      console.error("Error creating maintenance log:", error);
    }
    resetFormFields();
  };

  // Reset form fields
  const resetFormFields = () => {
    setFormData({
      service_date: "",
      description: "",
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Add Maintenance Log
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Service Date</label>
          <input
            type="date"
            name="service_date"
            value={formData.service_date}
            onChange={handleInputChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              resize: "vertical",
            }}
          />
        </div>

        {/* <div style={{ display: "flex", flexDirection: "column" }}>
        <select 
            name="bike_id" 
            onChange={handleInputChange} 
            value={formData.bike_id}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select Bike</option>
            {bikes.map((bike) => ( 
              <option key={bike.bike_id} value={bike.bike_id}>
               ID:  {bike.bike_id} <span> | </span> {bike.type}
              </option>
            ))}
          </select>
        </div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "48%",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/maintenance_logs")}
            style={{
              backgroundColor: "red",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "48%",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateMaintenanceLog;
