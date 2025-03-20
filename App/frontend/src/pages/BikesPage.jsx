import { Routes, Route, Link } from "react-router-dom";

import BikesTable from "../components/bikes/BikesTable";
import UpdateBikes from "../components/bikes/UpdateBikes";
import CreateBike from "../components/bikes/CreateBike";

function BikesPage() {
  return (
    <div>
      <h1>Bikes</h1>
      <Routes>
        <Route path="/" element={<BikesTable />} />
        <Route path="/add" element={<CreateBike />} />
        <Route path="/edit/:id" element={<UpdateBikes />} /> 
      </Routes>
    </div>
  );
}

export default BikesPage;
