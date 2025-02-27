import { Routes, Route, Link } from "react-router-dom";

import BikesTable from "../components/bikes/BikesTable";
import UpdateBikes from "../components/bikes/UpdateBikes";
import CreateBike from "../components/bikes/CreateBike";

function BikesPage() {
  return (
    <div>
      <h1>Bike Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/bikes">Bike table</Link>
          </li>
          <li>
            <Link to="/bikes/add">Add Bike</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<BikesTable />} />
        <Route path="/add" element={<CreateBike />} />
        <Route path="/edit/:id" element={<UpdateBikes />} /> 
      </Routes>
    </div>
  );
}

export default BikesPage;
