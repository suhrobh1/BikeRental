import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateMaintenanceLog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevLog = location.state.log;

  const [formData, setFormData] = useState({
    maintenance_id: prevLog.maintenance_id || "",
    service_date: prevLog.service_date ? prevLog.service_date.split('T')[0] : '', // Extract just the date part
    description: prevLog.description || "",
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

  // Check if any updates are made
  const isUpdate = () => {
    const currentData = {
      maintenance_id: prevLog.maintenance_id || "",
      service_date: prevLog.service_date || "",
      description: prevLog.description || "",
      bike_id: prevLog.bike_id || "",
    };
    if (JSON.stringify(formData) === JSON.stringify(currentData)) {
      alert("No changes made.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdate()) {
      try {
        const URL = import.meta.env.VITE_API_URL + "maintenance_logs/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating maintenance log!");
        } else {
          alert(response.data.message);
        }
        navigate("/maintenance_logs");
      } catch (error) {
        console.error("Error updating maintenance log!", error);
        alert("Error updating maintenance log!");
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
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Service Date</label>
          <input
            type="date"
            name="service_date"
            value={formData.service_date}
            onChange={handleInputChange}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Description */}
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
              borderRadius: "5px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        {/* Bike ID */}
        {/* <div style={{ display: "flex", flexDirection: "column" }}>
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
        </div> */}

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
};

export default UpdateMaintenanceLog;

