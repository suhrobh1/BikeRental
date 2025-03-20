import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBike() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    status: "",
    hourly_rate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBike = {
      type: formData.type,
      status: formData.status,
      hourly_rate: formData.hourly_rate,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "bikes";
      const response = await axios.post(URL, newBike);
      if (response.status === 201) {
        navigate("/bikes");
      } else {
        alert("Error creating bike");
      }
    } catch (error) {
      alert("Error creating bike");
      console.error("Error creating bike:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      type: "",
      status: "",
      hourly_rate: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("In CreateBike, ln 48 | formData:", formData);
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <>
    <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Add Bike</h2>
  
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
      <label htmlFor="type" style={{ fontWeight: "bold", marginBottom: "5px" }}>Type</label>
      <input
        type="text"
        name="type"
        defaultValue={formData.type}
        onChange={handleInputChange}
        style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
  
  <label htmlFor="status" style={{ fontWeight: "bold", marginBottom: "5px" }}>Status</label>
<select
  name="status"
  defaultValue={formData.status}
  onChange={handleInputChange}
  style={{ 
    padding: "10px", 
    marginBottom: "10px", 
    borderRadius: "5px", 
    border: "1px solid #ccc", 
    width: "100%" 
  }}
>
  <option value="">Select Status</option>
  <option value="available">Available</option>
  <option value="rented">Rented</option>
  <option value="maintenance">Maintenance</option>
</select>
  
      <label htmlFor="hourly_rate" style={{ fontWeight: "bold", marginBottom: "5px" }}>Hourly Rate</label>
      <input
        type="text"
        name="hourly_rate"
        value={formData.hourly_rate}
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
          Add Bike
        </button>
  
        <button 
          onClick={() => navigate("/bikes")}
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

export default CreateBike;