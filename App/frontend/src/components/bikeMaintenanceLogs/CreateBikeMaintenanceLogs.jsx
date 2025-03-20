import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBikeMaintenanceLogs() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    maintenance_id: "",
    bike_id: "",
  });


  
  const [bikes, setBikes] = useState([]);
  const [maintenance_logs, setMaintenance_logs] = useState([])

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const maintenance_logsURL = import.meta.env.VITE_API_URL + "maintenance_logs";
      const bikesURL = import.meta.env.VITE_API_URL + "bikes";
      const [maintenance_logsResponse, bikesResponse] = await Promise.all ([axios.get(maintenance_logsURL), axios.get(bikesURL)]);
      console.log("In CreateBikeMaintenanceLogs, ln 30 | bikesResponse.data: ", bikesResponse.data) ;
      setMaintenance_logs(maintenance_logsResponse.data);
      setBikes(bikesResponse.data);
    } catch (error) {
      alert("Error fetching data from the server.");
      console.error("Error fetching data:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      console.log("CreateBikeMaintLog, ln 44 | formData", formData)
      const URL = import.meta.env.VITE_API_URL + "bike_maintenance_logs";
      const response = await axios.post(URL, formData);
      if (response.status === 201) {
        navigate("/bike_maintenance_logs");
      } else {
        alert("Error creating bike maintenance log");
      }
    } catch (error) {
      alert("Error creating bike maintenance log");
      console.error("Error creating bike maintenance log:", error);
    }
    resetFormFields();
  };



  // Reset form fields
  const resetFormFields = () => {
    setFormData({
     maintenance_id: "",
      bike_id: "",
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value),
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
        Add Bike Maintenance Log
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
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Maintenance Log</label>
          <select 
            name="maintenance_id" 
            onChange={handleInputChange} 
            value={formData.maintenance_id}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select Maint. Log</option>
            {maintenance_logs.map((log) => ( 
              <option key={log.maintenance_id} value={log.maintenance_id}>
               ID:  {log.maintenance_id} | {log.description} 
              </option>
            ))}
          </select>
        </div>


        <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Bike</label>
        <select 
            name="bike_id" 
            onChange={handleInputChange} 
            value={parseInt(formData.bike_id)}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select Bike</option>
            {bikes.map((bike) => ( 
              <option key={bike.bike_id} value={bike.bike_id}>
               ID:  {bike.bike_id} <span> | </span> {bike.type}
              </option>
            ))}
          </select>
        </div>

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
            onClick={() => navigate("/bike_maintenance_logs")}
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

export default CreateBikeMaintenanceLogs;
