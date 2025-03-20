import { Routes, Route } from "react-router-dom";

import PaymentsTable from "../components/payments/PaymentsTable";
import UpdatePayment from "../components/payments/UpdatePayment";
import CreatePayment from "../components/payments/CreatePayment";

function PaymentsPage() {
  return (
    <div>
      <h1>Payments</h1>
      
      <Routes>
        <Route path="/" element={<PaymentsTable />} />
        <Route path="/add" element={<CreatePayment />} />
        <Route path="/edit/:id" element={<UpdatePayment />} /> 
      </Routes>
    </div>
  );
}

export default PaymentsPage;
