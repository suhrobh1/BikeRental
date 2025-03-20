import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import CustomerPaymentTableRow from "./CustomerPaymentTableRow"; 
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerPaymentsTable = () => {
  const [customerPayments, setCustomerPayments] = useState([]);

  // Fetch all customer payments
  const fetchCustomerPayments = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "customer_payments"; // API endpoint for customer payments
      const response = await axios.get(URL);
      setCustomerPayments(response.data);
    } catch (error) {
      alert("Error fetching customer payments from the server.");
      console.error("Error fetching customer payments:", error);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchCustomerPayments();
  }, []);

  return (
    <div>
      {/* If no customer payments found */}
      {customerPayments.length === 0 ? (
        <div style={{ textAlign: "center", color: "#666" }}>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No customer payments found.</p>
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Customer ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Payment ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {console.log("Customer Payments (from db):", customerPayments)}
            {customerPayments.map((customerPayment) => (
              <CustomerPaymentTableRow
                key={`${customerPayment.customer_id}-${customerPayment.payment_id}`}
                customerPayment={customerPayment}
                fetchCustomerPayments={fetchCustomerPayments}
              />
            ))}
          </tbody>
        </table>
      )}
      {/* Add Customer Payment Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <Link
          to="/customer_payments/add"
          style={{
            textDecoration: "none",
            color: "#fff",
            fontSize: "18px",
            backgroundColor: "#007bff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          Add Customer Payment
        </Link>
      </div>
    </div>
  );
};

export default CustomerPaymentsTable;
