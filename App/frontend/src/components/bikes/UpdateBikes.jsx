import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateBike = () => {
    const { id } = useParams();
    console.log("id in ln 10 in UpdateBike", id);
    const navigate = useNavigate();
    const location = useLocation();
    const prevBike = location.state.bike;

    const [formData, setFormData] = useState({
        bike_id: prevBike.id || '',
        type: prevBike.type || '',
        status: prevBike.status || '',
        hourly_rate: prevBike.hourly_rate || '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    function isUpdate() {
        // Check if formData is equal to old bike
        if (JSON.stringify(formData) === JSON.stringify({
            type: prevBike.type || '',
            status: prevBike.status || '',
            hourly_rate: prevBike.hourly_rate || '',
        })) {
            alert("No changes made.");
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isUpdate()) {
            try {
                console.log("In UpdateBike, ln 47 | id", id);
                const URL = import.meta.env.VITE_API_URL + "bikes/" + id;
                const response = await axios.put(URL, formData);
                if (response.status !== 200) {
                    alert("Error updating bike!");
                } else {
                    alert(response.data.message);
                }
                navigate("/bikes");
            } catch (error) {
                console.log("Error updating bike!", error);
            }
        }
    };

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
  <h2 style={{ color: "#333", marginBottom: "20px" }}>Update Bike</h2>
  
  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
    
    <div style={{ marginBottom: "10px", textAlign: "left" }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Type:</label>
      <input
        type="text"
        name="type"
        onChange={handleInputChange}
        required
        defaultValue={prevBike.type}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
      />
    </div>

    <div style={{ marginBottom: "10px", textAlign: "left" }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Status:</label>
       <select
          name="status"
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >  
          <option value="" selected>{prevBike.status}</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select> 
    </div>

    <div style={{ marginBottom: "10px", textAlign: "left" }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Hourly Rate:</label>
      <input
        type="text"
        name="hourly_rate"
        onChange={handleInputChange}
        required
        defaultValue={prevBike.hourly_rate}
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
        Update Bike
      </button>
      <button
        type="button"
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
</div>

    );
};

export default UpdateBike;
