import { RiEdit2Fill, RiDeleteBin2Fill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BikeMaintenanceLogTableRow = ({ log, fetchLogs }) => {
  const navigate = useNavigate();

  // Handle delete
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete maintenance log for bike ID: ${log.bike_id}?`
    );
    if (confirmed) {
      try {
        const URL = import.meta.env.VITE_API_URL + `bike_maintenance_logs/${log.maintenance_id}/${log.bike_id}`;
        await axios.delete(URL);
        fetchLogs(); // Refresh the list after deletion
        alert("Maintenance log deleted successfully.");
      } catch (error) {
        console.error("Error deleting maintenance log:", error);
        alert("Error deleting maintenance log.");
      }
    }
  };

  return (
    <tr
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #ddd",
        textAlign: "left",
      }}
    >
      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
        {log.maintenance_id}
      </td>
      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
        {log.bike_id}
      </td>
      {/* <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
        <button
          onClick={() => navigate(`/bike_maintenance_logs/edit/${log.maintenance_id}`, { state: { log } })}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <RiEdit2Fill />
        </button>
      </td> */}
      <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "red",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <RiDeleteBin2Fill />
        </button>
      </td>
    </tr>
  );
};

export default BikeMaintenanceLogTableRow;
