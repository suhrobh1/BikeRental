import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/NavBar";
import CustomersPage from "./pages/CustomersPage";
import BikesPage from "./pages/BikesPage";
import RentalsPage from "./pages/RentalsPage";
import PaymentsPage from "./pages/PaymentsPage";
import MaintenanceLogsPage from "./pages/MaintenanceLogs";
import BikeMaintenanceLogsPage from "./pages/BikeMaintenanceLogsPage";
import CustomerPaymentsPage from "./pages/CustomerPaymentsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers/*" element={<CustomersPage />} />
        <Route path="/bikes/*" element={<BikesPage />} />
        <Route path="/rentals/*" element={<RentalsPage />} />
        <Route path="/payments/*" element={<PaymentsPage />} />
        <Route path="/maintenance_logs/*" element={<MaintenanceLogsPage />} /> 
        <Route path="/bike_maintenance_logs/*" element={<BikeMaintenanceLogsPage />} /> 
        <Route path="/customer_payments/*" element = {<CustomerPaymentsPage />} />
      </Routes>
    </>
  );
}

export default App;
