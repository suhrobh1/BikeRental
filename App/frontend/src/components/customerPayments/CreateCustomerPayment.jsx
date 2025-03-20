import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateCustomerPayment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_id: "",
    payment_id: "",
  });

  const [customers, setCustomers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customersURL = import.meta.env.VITE_API_URL + "customers";
      const paymentsURL = import.meta.env.VITE_API_URL + "payments";
      const [customersResponse, paymentsResponse] = await Promise.all([
        axios.get(customersURL),
        axios.get(paymentsURL),
      ]);
      setCustomers(customersResponse.data);
      setPayments(paymentsResponse.data);
    } catch (error) {
      alert("Error fetching data from the server.");
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomerPayment = {
      customer_id: formData.customer_id,
      payment_id: formData.payment_id,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "customer_payments";
      console.log("Creating customer payment: ", newCustomerPayment);
      const response = await axios.post(URL, newCustomerPayment);
      if (response.status === 201) {
        navigate("/customer_payments");
      } else {
        alert("Error creating customer payment");
      }
    } catch (error) {
      alert("Error creating customer payment");
      console.error("Error creating customer payment:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      customer_id: "",
      payment_id: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Form Data: ", formData);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", color: "#333" }}>Add Customer Payment</h2>
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
        {/* Customer Selection */}
        <label htmlFor="customer_id" style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Select Customer
        </label>
        <select
          name="customer_id"
          value={formData.customer_id}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.customer_id} value={customer.customer_id}>
              Customer: ID: {customer.customer_id} | {customer.name}
            </option>
          ))}
        </select>

        {/* Payment Selection */}
        <label htmlFor="payment_id" style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Select Payment
        </label>
        <select
          name="payment_id"
          value={formData.payment_id}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #ccc" }}
          required
        >
          <option value="">Select Payment</option>
          {payments.map((payment) => (
            <option key={payment.payment_id} value={payment.payment_id}>
              Payment #{payment.payment_id} | Amount: {payment.amount}
            </option>
          ))}
        </select>

        {/* Buttons */}
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
      </form>
    </>
  );
}

export default CreateCustomerPayment;
