import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const PaymentTableRow = ({ payment, fetchPayments }) => {
  const navigate = useNavigate();

  // Redirect to edit payments page
  const handleEdit = () => {
    console.log("In TableRow, payment ID:", payment.payment_id);
    navigate("/payments/edit/" + payment.payment_id, { state: { payment } });
  };

  const deleteRow = async () => {
    try {
      console.log("In TableRow, deleting payment ID:", payment.payment_id);
      const URL = import.meta.env.VITE_API_URL + "payments/" + payment.payment_id;
      console.log("URL:", URL);
      const response = await axios.delete(URL);
      console.log("Response status:", response.status);
      if (response.status === 204) {
        alert("Payment deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting payment!");
      console.error(err);
    }
    fetchPayments();
  };

  return (
    <tr 
      key={payment.payment_id} 
      style={{ borderBottom: "1px solid #ddd", backgroundColor: "#fff", textAlign: "left" }}
    >
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{payment.payment_id}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{payment.rental_id}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>${payment.amount}</td>
      {/* <td style={{ padding: "10px", border: "1px solid #ddd" }}>{payment.payment_date}</td> */}
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
        {new Date(payment.payment_date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </td>


      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{payment.paid === 1 ? "Paid" : "Unpaid"}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
        <BiEditAlt 
          onClick={handleEdit} 
          size={25} 
          style={{ cursor: "pointer", color: "#007bff" }} 
        />
      </td>
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

export default PaymentTableRow;
