import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./CustomerTableRow";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [searchBox, setSearchBox] =  useState({ name: "" });
  let customerName = "";
  
  const fetchCustomers = async () => {
    resetFormFields();  
    try {
      const URL = import.meta.env.VITE_API_URL + "customers";
      const response = await axios.get(URL);
      setCustomers(response.data);
      console.log("Bam!");
    } catch (error) {
      alert("Error fetching customers from the server.");
      console.error("Error fetching customers:", error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Seachbox: ', searchBox)
    if (searchBox.name){
      customerName = searchBox.name;
      const matchedCustomers = customers
      .filter((customer) => {
        const fullName = customer.name.toLowerCase();
        const searchTerms = searchBox.name.toLowerCase().trim().split(" ").filter(Boolean);
        if (searchTerms.length === 0) return true;
        return searchTerms.every((term) => fullName.includes(term));
      });
      setCustomers(matchedCustomers);
    
    console.log("Matching customers:", matchedCustomers); // Full objects

    }else{
       alert("Please, enter customer name!")
    }
     
  };

  const resetFormFields = () => {
    setSearchBox({ name: "" });
  };

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    console.log("In createCustomer, ln 48 | formData:", searchBox.name);
    setSearchBox((searchBox) => ({
      ...searchBox,
      [name]: value,
    }));
  };


  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
       <form 
    onSubmit={handleSubmit} 
    style={{ 
      display: "flex", 
      flexDirection: "column", 
      maxWidth: "400px", 
      margin: "0 auto", 
      padding: "20px", 
      border: "1px solid #ddd", 
      borderRadius: "8px", 
      backgroundColor: "#f9f9f9" 
    }}
  >
    <label htmlFor="name" style={{ fontWeight: "bold", marginBottom: "5px" }}>Enter first or last name</label>
    <input
  type="text"
  name="name"
  value={searchBox.name}
  onChange={handleInputChange}
  style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
/>

   

<div style={{ display: "flex", justifyContent: "space-between" }}>
          <button 
            type="submit" 
            style={{ 
              backgroundColor: "#007bff", 
              color: "#fff", 
              fontSize: "18px", 
              padding: "10px 20px", 
              borderRadius: "5px", 
              border: "none", 
              cursor: "pointer"
            }}
          >
           Search
          </button>
          <button 
            type="button"
            onClick={fetchCustomers}
            style={{ 
              backgroundColor: "#007bff", 
              color: "#fff", 
              fontSize: "18px", 
              padding: "10px 20px", 
              borderRadius: "5px", 
              border: "none", 
              cursor: "pointer"
            }}
          >
           Clear
          </button>

        
        </div>
  </form> 




  {customers.length === 0 ? (
    <div style={{ textAlign: "center", color: "#666" }}>
      <RiCreativeCommonsZeroFill size={70} color="#ccc" />
      <p>No customers found.</p>
    </div>
  ) : (

    
      

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        textAlign: "left",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ddd" }}>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Customer ID</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Phone Number</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Edit</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {console.log("Customers (from db)", customers)}
        {customers.map((customer) => (
          <TableRow key={customer.customer_id} customer={customer} fetchCustomers={fetchCustomers} />
        ))}
      </tbody>




    </table>
  )}
  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <Link 
          to="/customers/add" 
          style={{ 
            textDecoration: "none", 
            color: "#fff", 
            fontSize: "18px", 
            backgroundColor: "#007bff", 
            padding: "10px 20px", 
            borderRadius: "5px", 
            border: "none", 
            cursor: "pointer", 
            display: "inline-block",
            textAlign: "center"
          }}
        >
          Add Customer
        </Link>
        </div>
</div>

  );
};

export default CustomersTable;
