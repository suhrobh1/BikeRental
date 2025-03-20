import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./BikeMaintenanceLogsTableRow";
import axios from "axios";
import { Link } from "react-router-dom";

const BikeMaintenanceLogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState([]);

  // Fetch bike maintenance logs
  const fetchLogs = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "bike_maintenance_logs";
      const response = await axios.get(URL);
      console.log("BikeMaintenanceLogsTable, ln 15 | response", response)
      setLogs(response.data);
    } catch (error) {
      alert("Error fetching bike maintenance logs from the server.");
      console.error("Error fetching bike maintenance logs:", error);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {logs.length === 0 ? (
        <div style={{ textAlign: "center", color: "#666", marginTop: "50px" }}>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No bike maintenance logs found.</p>
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Maintenance ID</th>
              <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Bike ID</th>
              {/* <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>Edit</th> */}
              <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <TableRow key={log.maintenance_id} log={log} fetchLogs={fetchLogs} />
            ))}
          </tbody>
        </table>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Link
          to="/bike_maintenance_logs/add"
          style={{
            textDecoration: "none",
            color: "#fff",
            backgroundColor: "#007bff",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Add Bike Maintenance Log
        </Link>
      </div>
    </div>
  );
};

export default BikeMaintenanceLogsTable;
