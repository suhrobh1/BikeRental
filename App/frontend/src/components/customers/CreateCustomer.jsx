import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateCustomer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newCustomer = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "customers";
      const response = await axios.post(URL, newCustomer);
      if (response.status === 201) {
        navigate("/customers");
      } else {
        alert("Error creating customer");
      }
    } catch (error) {
      alert("Error creating customer");
      console.error("Error creating customer:", error);
    }

    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Add Customer</h2>

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
        <label htmlFor="name" style={{ fontWeight: "bold", marginBottom: "5px" }}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label htmlFor="email" style={{ fontWeight: "bold", marginBottom: "5px" }}>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label htmlFor="phone" style={{ fontWeight: "bold", marginBottom: "5px" }}>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
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
              cursor: "pointer",
            }}
          >
            Submit
          </button>

          <button
            onClick={() => navigate("/customers")}
            style={{
              backgroundColor: "red",
              color: "#fff",
              fontSize: "18px",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateCustomer;
