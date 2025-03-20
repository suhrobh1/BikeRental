import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./PaymentTableRow"; // Updated import for payments
import axios from "axios";
import { Link } from "react-router-dom";

const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "payments"; // Updated API endpoint
      const response = await axios.get(URL);
      setPayments(response.data);
    } catch (error) {
      alert("Error fetching payments from the server.");
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div>
      {payments.length === 0 ? (
        <div style={{ textAlign: "center", color: "#666" }}>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No payments found.</p>
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
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Payment ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Rental ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Amount</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Payment Date</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Edit</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {console.log("Payments (from db)", payments)}
            {payments.map((payment) => (
              <TableRow key={payment.payment_id} payment={payment} fetchPayments={fetchPayments} />
            ))}
          </tbody>
        </table>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <Link 
          to="/payments/add" 
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
            textAlign: "center"
          }}
        >
          Add Payment
        </Link>
      </div>
    </div>
  );
};

export default PaymentsTable;
