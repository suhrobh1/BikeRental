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
      <h2>Add Bike</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          name="type"
          defaultValue={formData.type}
          onChange={handleInputChange}
        />
        <label htmlFor="status">Status</label>
        <input
          type="text"
          name="status"
          defaultValue={formData.status}
          onChange={handleInputChange}
        />
        <label htmlFor="hourly_rate">Hourly Rate</label>
        <input
          type="text"
          name="hourly_rate"
          value={formData.hourly_rate}
          onChange={handleInputChange}
        />
        <button type="submit">Add Bike</button>
      </form>
    </>
  );
}

export default CreateBike;