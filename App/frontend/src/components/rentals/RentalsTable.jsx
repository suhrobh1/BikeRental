import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./RentalTableRow"; // Updated import for rentals
import axios from "axios";
import { Link } from "react-router-dom";


const RentalsTable = () => {
  const [rentals, setRentals] = useState([]);

  const fetchRentals = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "rentals"; // Updated API endpoint
      const response = await axios.get(URL);
      setRentals(response.data);
    } catch (error) {
      alert("Error fetching rentals from the server.");
      console.error("Error fetching rentals:", error);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  return (
    <div>
      {rentals.length === 0 ? (
        <div style={{ textAlign: "center", color: "#666" }}>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No rentals found.</p>
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
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Rental ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Customer ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Bike ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Rental Date</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Return Date</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Total Cost</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Edit</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {console.log("Rentals (from db)", rentals)}
            {rentals.map((rental) => (
              <TableRow key={rental.rental_id} rental={rental} fetchRentals={fetchRentals} />
            ))}
          </tbody>
        </table>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
      <Link 
        to="/rentals/add" 
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
        Add Rental
      </Link>
      </div>
    </div>
    
  );
};

export default RentalsTable;
