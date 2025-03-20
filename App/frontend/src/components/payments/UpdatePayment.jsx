import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdatePayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevPayment = location.state.payment;
  // console.log("prevPayment: ", prevPayment)
  // console.log("prevPayment.paid: ", prevPayment.paid)

  const [formData, setFormData] = useState({
    payment_id: prevPayment.payment_id || '',
    rental_id: prevPayment.rental_id || '',
    amount: prevPayment.amount || '',
    payment_date: prevPayment.payment_date ? prevPayment.payment_date.split('T')[0] : '', // Extract just the date part
    paid: prevPayment.paid || '',
  });


  const isUpdate = () => {
    // Check if formData is equal to old payment
    if (JSON.stringify(formData) === JSON.stringify({
      rental_id: prevPayment.rental_id || '',
      amount: prevPayment.amount || '',
      payment_date: prevPayment.payment_date || '',
      paid: parseInt(prevPayment.paid) || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isUpdate()) {
      try {
        const URL = import.meta.env.VITE_API_URL + "payments/" + id;
        console.log("id: ", id)
        console.log("formData: ", formData)
        const response = await axios.put(URL, formData);
        console.log("Update Payment 63 | response: ", response)
        if (response.status !== 200) {
          alert("Error updating payment!");
        } else {
          alert(response.data.message);
        }
        navigate("/payments");
      } catch (error) {
        console.log("Error updating payment!", error);
      }
    }
  };

  


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log("Ln64 formData", formData);
  };

  return (
    <div style={{
      maxWidth: "400px", 
      margin: "0 auto", 
      padding: "20px", 
      border: "1px solid #ddd", 
      borderRadius: "8px", 
      backgroundColor: "#f9f9f9", 
      textAlign: "center"
    }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Update Payment</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", padding: "0 20px" }}>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Rental ID:</label>
          <input
            type="text"
            name="rental_id"
            onChange={handleInputChange}
            required
            value={formData.rental_id} // Use value here
            style={{
              padding: "10px", 
              borderRadius: "5px", 
              border: "1px solid #ccc", 
              width: "100%"
            }}
          />
        </div>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Amount:</label>
          <input
            type="number"
            name="amount"
            onChange={handleInputChange}
            required
            value={formData.amount} // Use value here
            style={{
              padding: "10px", 
              borderRadius: "5px", 
              border: "1px solid #ccc", 
              width: "100%"
            }}
          />
        </div>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Payment Date:</label>
          <input
            type="date"
            name="payment_date"
            onChange={handleInputChange}
            required
            value={formData.payment_date} // Use value here
            style={{
              padding: "10px", 
              borderRadius: "5px", 
              border: "1px solid #ccc", 
              width: "100%"
            }}
          />
        </div>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
        <label htmlFor="paid" style={{ fontWeight: "bold", marginBottom: "5px" }}>Paid</label>
        <select
          name="paid"
          value={formData.paid}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >  
          <option value="" selected>{prevPayment.paid== 0 ? "No" : "Yes"}</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select> 
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
            Update Payment
          </button>
          <button
            type="button"
            onClick={() => navigate("/payments")}
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

export default UpdatePayment;