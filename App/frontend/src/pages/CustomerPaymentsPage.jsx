import { Routes, Route } from "react-router-dom";
import CustomerPaymentsTable from "../components/customerPayments/CustomerPaymentsTable";
import CreateCustomerPayment from "../components/customerPayments/CreateCustomerPayment";
import UpdateCustomerPayment from "../components/customerPayments/UpdateCustomerPayment";

function CustomerPaymentsPage() {
  return (
    <div>
      <h1>Customer Payments</h1>
      <h4>(Intersection Table)</h4>
      
      <Routes>
        <Route path="/" element={<CustomerPaymentsTable />} />
        <Route path="/add" element={<CreateCustomerPayment/>} />
        <Route path="/edit/:id" element={<UpdateCustomerPayment />} /> 
      </Routes>
    </div>
  );
}

export default CustomerPaymentsPage;
