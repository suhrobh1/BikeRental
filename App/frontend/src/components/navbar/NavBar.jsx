import { Link } from "react-router-dom";
import { MdLocalConvenienceStore } from "react-icons/md";

const Navbar = () => {
  return (
<header 
  style={{ 
    padding: "20px", 
    backgroundColor: "#f4f4f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}
>
  {/* Left: Title with extra margin-right for spacing */}
  <h1 style={{ 
    margin: 0, 
    fontSize: "24px", 
    color: "#333", 
    marginRight: "150px" /* Increased space */
  }}>
    Bike Rental System (BRS)
  </h1>

  {/* Right: Navigation Links */}
  <nav>
    <ul 
      style={{ 
        display: "flex", 
        listStyle: "none", 
        gap: "40px", /* Increased gap for more spacing */
        margin: 0, 
        padding: 0
      }}
    >
      <li>
        <Link to="/" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>Home</Link>
      </li>
      <li>
        <Link to="/customers" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>Customers</Link>
      </li>
      <li>
        <Link to="/bikes" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>Bikes</Link>
      </li>
      <li>
        <Link to="/rentals" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>Rentals</Link>
      </li>
      <li>
        <Link to="/payments" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>Payments</Link>
      </li>
      <li>
        <Link to="/maintenance_logs" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>Maintenance Logs</Link>
      </li>
      <li>
        <Link to="/bike_maintenance_logs" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>Bike Maintenance Logs</Link>
      </li>
      <li>
        <Link to="/customer_payments" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>Customer Payments</Link>
      </li>
    </ul>
  </nav>
</header>




  );
};

export default Navbar;
