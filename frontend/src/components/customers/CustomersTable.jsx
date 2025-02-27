import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./CustomerTableRow";
import axios from "axios";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "customers";
      const response = await axios.get(URL);
      setCustomers(response.data);
    } catch (error) {
      alert("Error fetching customers from the server.");
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customer Table</h2>
      {customers.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No customers found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer_id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody >
            {console.log("Customers (from db)", customers)}
            {customers.map((customer) => (
              <TableRow key={customer.customer_id} customer={customer} fetchCustomers={fetchCustomers} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomersTable;
