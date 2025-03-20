import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateCustomerPayment = () => {
  const { customerId, paymentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevCustomerPayment = location.state.customerPayment;

  const [formData, setFormData] = useState({
    customer_id: prevCustomerPayment.customer_id || '',
    payment_id: prevCustomerPayment.payment_id || '',
  });

  const isUpdate = () => {
    // Check if formData is equal to previous data
    if (
      formData.customer_id === prevCustomerPayment.customer_id &&
      formData.payment_id === prevCustomerPayment.payment_id
    ) {
      alert("No changes made.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isUpdate()) {
      try {
        const URL = import.meta.env.VITE_API_URL + `customerPayments/${customerId}/${paymentId}`;
        console.log("Updating relation at URL:", URL);
        console.log("Updated formData:", formData);
        const response = await axios.put(URL, formData);
        console.log("Update Response:", response);
        if (response.status !== 200) {
          alert("Error updating customer payment relation!");
        } else {
          alert(response.data.message || "Customer payment relation updated.");
        }
        navigate("/customerPayments");
      } catch (error) {
        console.error("Error updating customer payment relation!", error);
        alert(error.response?.data?.error || "Error updating customer payment relation!");
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Update Customer Payment</h2>
      {/* <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", padding: "0 20px" }}
      >
        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label
            style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}
          >
            Customer ID:
          </label>
          <input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleInputChange}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label
            style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}
          >
            Payment ID:
          </label>
          <input
            type="text"
            name="payment_id"
            value={formData.payment_id}
            onChange={handleInputChange}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
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
              cursor: "pointer",
            }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate("/customer_payments")}
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
      </form> */}
    </div>
  );
};

export default UpdateCustomerPayment;
