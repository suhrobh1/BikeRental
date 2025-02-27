import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/NavBar";
import CustomersPage from "./pages/CustomersPage";
import BikesPage from "./pages/BikesPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers/*" element={<CustomersPage />} />
       <Route path="/bikes/*" element={<BikesPage />} />
        {/* <Route path="/payments/*" element={<PaymentsPage />} /> */}
        {/* <Route path="/maitenance_logs/*" element={<MaintenanceLogsPage />} />  */}
      </Routes>
    </>
  );
}

export default App;
