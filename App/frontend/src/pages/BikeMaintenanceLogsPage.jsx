import { Routes, Route, Link } from "react-router-dom";

import BikeMaintenanceLogsTable from "../components/bikeMaintenanceLogs/BikeMaintenanceLogsTable";
import CreateBikeMaintenanceLogs from "../components/bikeMaintenanceLogs/CreateBikeMaintenanceLogs";
import UpdateBikeMaintenanceLogs from "../components/bikeMaintenanceLogs/UpdateBikeMaintenanceLogs";


function BikeMaintenanceLogsPage() {
  return (
    <div>
      <h1>Maintenance Logs</h1>
      <h4>(Intersection Table)</h4>
      <Routes>
        <Route path="/" element={<BikeMaintenanceLogsTable />} />
        <Route path="/add" element={<CreateBikeMaintenanceLogs />} />
        <Route path="/edit/:id" element={<UpdateBikeMaintenanceLogs  />} /> 
      </Routes>
    </div>
  );
}

export default BikeMaintenanceLogsPage;
