import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateBikeMaintenanceLog = () => {
  const { id } = useParams(); // Retrieve the maintenance log id from the URL
  const navigate = useNavigate();
  const location = useLocation();
  const prevLog = location.state.log; // Previous log data passed via routing

  // Initialize form state with existing log data or empty fields
  const [formData, setFormData] = useState({
    maintenance_id: prevLog.maintenance_id || "",
    bike_id: prevLog.bike_id || "",  
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Check if any updates are made to the form
  const isUpdate = () => {
    const currentData = {
      maintenance_id: prevLog.maintenance_id || "",
      bike_id: prevLog.bike_id || "",
    };
    // Compare current form data to the original log data
    if (JSON.stringify(formData) === JSON.stringify(currentData)) {
      alert("No changes made.");
      return false;
    }
    return true;
  };

  // Handle form submission for updating the log
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdate()) {
      try {
        const URL = import.meta.env.VITE_API_URL + "bike_maintenance_logs/" + id; // API URL for updating
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating maintenance log!");
        } else {
          alert(response.data.message); // Show success message from backend
        }
        navigate("/maintenance_logs"); // Redirect to the maintenance logs list
      } catch (error) {
        console.error("Error updating maintenance log!", error);
        alert("Error updating maintenance log!"); // Error handling
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Update Maintenance Log
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* Service Date */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Maintenance Log ID</label>
          <input
            type="number"
            name="maintenance_id"
            value={formData.maintenance_id}
            onChange={handleInputChange}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>


        {/* Bike ID */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Bike ID</label>
          <input
            type="number"
            name="bike_id"
            value={formData.bike_id}
            onChange={handleInputChange}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
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
            Update Log
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
};

export default UpdateBikeMaintenanceLog;
