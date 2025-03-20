import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ rental, fetchRentals }) => {
  const navigate = useNavigate();

  // Redirect to edit rentals page
  const handleEdit = () => {
    console.log("In TableRow, rental ID:", rental.rental_id);
    navigate("/rentals/edit/" + rental.rental_id, { state: { rental } });
  };

  const deleteRow = async () => {
    try {
      console.log("In TableRow, deleting rental ID:", rental.rental_id);
      const URL = import.meta.env.VITE_API_URL + "rentals/" + rental.rental_id;
      console.log("URL:", URL);
      const response = await axios.delete(URL);
      console.log("Response status:", response.status);
      if (response.status === 204) {
        alert("Rental deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting rental!");
      console.error(err);
    }
    fetchRentals();
  };

  return (
    <tr 
      key={rental.rental_id} 
      style={{ borderBottom: "1px solid #ddd", backgroundColor: "#fff", textAlign: "left" }}
    >
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{rental.rental_id}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{rental.customer_id}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{rental.bike_id}</td>
      {/* <td style={{ padding: "10px", border: "1px solid #ddd" }}>{rental.rental_date}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{rental.return_date}</td> */}
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
        {new Date(rental.rental_date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
        {new Date(rental.return_date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </td>



      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{rental.total_cost}</td>
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

export default TableRow;
