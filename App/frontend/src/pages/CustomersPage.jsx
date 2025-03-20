import { Routes, Route, Link } from "react-router-dom";

import CustomersTable from "../components/customers/CustomersTable";
import UpdateCustomer from "../components/customers/UpdateCustomer";
import CreateCustomer from "../components/customers/CreateCustomer";

function CustomersPage() {
  return (
    <div>
      <h1>Customers</h1>
      
      <Routes>
        <Route path="/" element={<CustomersTable />} />
        <Route path="/add" element={<CreateCustomer/>}/>
        <Route path="/edit/:id" element={<UpdateCustomer />} /> 
      </Routes>
    </div>
  );
}

export default CustomersPage;
