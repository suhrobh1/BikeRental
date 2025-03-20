import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ log, fetchLogs }) => {
  const navigate = useNavigate();

  // Redirect to edit maintenance log page
  const handleEdit = () => {
    navigate("/maintenance_logs/edit/" + log.maintenance_id, { state: { log } });
  };

  // Delete maintenance log row
  const deleteRow = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete maintenance log?`
    );
    if (confirmed) {

    try {
      const URL = import.meta.env.VITE_API_URL + "maintenance_logs/" + log.maintenance_id;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Maintenance log deleted successfully");
      }
    } catch (err) {
      alert(err?.response?.data?.error || "Error deleting maintenance log!");
      console.log(err);
    }
    fetchLogs();
  }
  };

  return (
    <tr 
      key={log.maintenance_id} 
      style={{ borderBottom: "1px solid #ddd", backgroundColor: "#fff", textAlign: "left" }}
    >
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{log.maintenance_id}</td>
      {/* <td style={{ padding: "10px", border: "1px solid #ddd" }}>{log.service_date}</td> */}
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
        {new Date(log.service_date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{log.description}</td>
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
