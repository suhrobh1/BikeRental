import { Routes, Route, Link } from "react-router-dom";

import MaintenanceLogsTable from "../components/maintenanceLogs/MaintenanceLogsTable";
import UpdateMaintenanceLog from "../components/maintenanceLogs/UpdateMaintenanceLog";
import CreateMaintenanceLog from "../components/maintenanceLogs/CreateMaintenanceLog";

function MaintenanceLogsPage() {
  return (
    <div>
      <h1>Maintenance Logs</h1>

      <Routes>
        <Route path="/" element={<MaintenanceLogsTable />} />
        <Route path="/add" element={<CreateMaintenanceLog />} />
        <Route path="/edit/:id" element={<UpdateMaintenanceLog />} />
      </Routes>
    </div>
  );
}

export default MaintenanceLogsPage;
