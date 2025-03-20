import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePayment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    paid: "",
    rental_id: "",
    amount: "",
    payment_date: "",
  });

  const [rentals, setRentals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const rentalsURL = import.meta.env.VITE_API_URL + "rentals";
      const customersURL = import.meta.env.VITE_API_URL + "customers";
      const bikesURL = import.meta.env.VITE_API_URL + "bikes";
      const [customersResponse, rentalsResponse, bikesResponse] = await Promise.all ([axios.get(customersURL), axios.get(rentalsURL), axios.get(bikesURL)]);
      console.log("In Create Payment, ln 29 | customersResponse.data: ", customersResponse.data) ;
      console.log("In Create Payment, ln 30 | rentalsResponse.data: ", rentalsResponse.data) ;
      setCustomers(customersResponse.data);
      setRentals(rentalsResponse.data);
      setBikes(bikesResponse.data);
    } catch (error) {
      alert("Error fetching data from the server.");
      console.error("Error fetching data:", error);
    }
  };





  const customerInfo = (rent_id) => {
    const rental = rentals.find(rental => rental.rental_id == rent_id);
    if (!rental) return undefined; // If no rental is found, return undefined

    const customer = customers.find(customer => customer.customer_id == rental.customer_id);
    const bike = bikes.find(bike => bike.bike_id == rental.bike_id);
    const amount = rental.total_cost;

    // Make sure bikes is accessible and not undefined
    console.log("Line 63 - Bikes Data: ", bikes);

    // Log the amount for debugging
    console.log("Amount: ", amount);

    return {
        customer: customer ? customer.name : undefined,
        bike: bike ? bike.type : undefined,
        amount
    };
};





  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPayment = {
      rental_id: formData.rental_id,
      amount: formData.amount,
      payment_date: formData.payment_date,
      paid: formData.paid,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "payments";
      console.log("In CreatePayment, ln50 | newPayment", newPayment);
      const response = await axios.post(URL, newPayment);
      if (response.status === 201) {
        navigate("/payments");
      } else {
        alert("Error creating payment");
      }
    } catch (error) {
      alert("Error creating payment");
      console.error("Error creating payment:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      rental_id: "",
      amount: "",
      payment_date: "",
      paid: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
    console.log ("In CreatePayment, ln 79 | formData", formData)
    
  };

  return (
    <>
      <h2 style={{ textAlign: "center", color: "#333" }}>Add Payment</h2>
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
        
        
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <select 
            name="rental_id" 
            onChange={handleInputChange} 
            value={formData.rental_id}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select Rental</option>
            {rentals.map((rental) => ( 
              <option key={rental.rental_id} value={rental.rental_id}>
                {rental.rental_id} <span> | </span>  {(customerInfo(rental.rental_id)).bike}
              </option>
              // {(customerInfo( rental.rental_id)).customer}  in case customer name is needed. 
            ))}
          </select>
          <label 
            htmlFor="rental_id" 
            style={{ marginLeft: "10px", fontWeight: "bold", whiteSpace: "nowrap" }}
          >
            Rental ID: {formData.rental_id} 
          </label>
        </div>

        <label htmlFor="amount" style={{ fontWeight: "bold", marginBottom: "5px" }}> Amount | <span style={{ color: "red" }}> Balance: {customerInfo(formData.rental_id)?.amount}
          </span>
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label htmlFor="payment_date" style={{ fontWeight: "bold", marginBottom: "5px" }}>Payment Date</label>
        <input
          type="date"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleInputChange}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label htmlFor="paid" style={{ fontWeight: "bold", marginBottom: "5px" }}>Paid</label>
        <select
          name="paid"
          onChange={handleInputChange}
          value={formData.paid}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="">Select</option>
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>

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
            onClick={() => navigate("/payments")}
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

export default CreatePayment;