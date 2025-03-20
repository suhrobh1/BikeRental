import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const CustomerPaymentRow = ({ customerPayment, fetchCustomerPayments }) => {
  const navigate = useNavigate();

  // // Redirect to edit customer payment page
  // const handleEdit = () => {
  //   console.log("In TableRow, customer ID:", customerPayment.customer_id, "Payment ID:", customerPayment.payment_id);
  //   navigate(
  //     `/customer_payments/edit/${customerPayment.customer_id}/${customerPayment.payment_id}`,
  //     { state: { customerPayment } }
  //   );
  // };


  
  // Delete customer payment relation
  const deleteRow = async () => {
    
    try {
      console.log("Deleting customer payment----->>:", customerPayment);
      const URL =
        import.meta.env.VITE_API_URL +
        `customer_payments/${customerPayment.customer_id}/${customerPayment.payment_id}`;
      console.log("DELETE URL:", URL);
      const response = await axios.delete(URL);
      console.log("Response status:", response.status);
      if (response.status === 204) {
        alert("Customer payment relation deleted successfully.");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting customer payment!");
      console.error(err);
    }
    fetchCustomerPayments();
  };

  return (
    <tr
      key={`${customerPayment.customer_id}-${customerPayment.payment_id}`}
      style={{
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
        textAlign: "left",
      }}
    >
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{customerPayment.customer_id}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{customerPayment.payment_id}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
        <BsTrash
          onClick={deleteRow}
          size={25}
          style={{ cursor: "pointer", color: "red" }}
        />
      </td>
    </tr>
  );
};

export default CustomerPaymentRow;
