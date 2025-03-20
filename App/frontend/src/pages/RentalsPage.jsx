import { Routes, Route, Link } from "react-router-dom";

import RentalsTable from "../components/rentals/RentalsTable";
import UpdateRental from "../components/rentals/UpdateRental";
import CreateRental from "../components/rentals/CreateRental";

function RentalsPage() {
  return (
    <div>
      <h1>Rentals</h1>
      <Routes>
        <Route path="/" element={<RentalsTable />} />
        <Route path="/add" element={<CreateRental />} />
        <Route path="/edit/:id" element={<UpdateRental />} />
      </Routes>
    </div>
  );
}

export default RentalsPage;
