import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./BikesTableRow";
import axios from "axios";
import { Link } from "react-router-dom";

const BikesTable = () => {
  const [bikes, setBikes] = useState([]);
  const [searchBox, setSearchBox] =  useState({ name: "" });
  const [originalBikes, setOriginalBikes] = useState([]);
  let bikeType = "";

  const fetchBikes = async () => {
    resetFormFields();
    try {
      const URL = import.meta.env.VITE_API_URL + "bikes";
      const response = await axios.get(URL);
      setBikes(response.data);
      setOriginalBikes(response.data);
    } catch (error) {
      alert("Error fetching bikes from the server.");
      console.error("Error fetching bikes:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Seachbox: ', searchBox)
    if (searchBox.name){
      bikeType = searchBox.name;
      const matchedType = bikes
      .filter((bike) => {
        const fullName = bike.type.toLowerCase();
        const searchTerms = searchBox.name.toLowerCase().trim().split(" ").filter(Boolean);
        if (searchTerms.length === 0) return true;
        return searchTerms.every((term) => fullName.includes(term));
      });
      setBikes(matchedType);
    
    console.log("Matching bikes:", matchedType); // Full objects

    }else{
       alert("Please, enter bike name!")
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


   
 const filterBike = (bikeStatus) =>{
   
    if (bikeStatus === "available") {
    setBikes(originalBikes);
    setBikes(originalBikes.filter(bike => bike.status === "available"));
  } else if (bikeStatus === "rented") {
    setBikes(originalBikes);
    setBikes(originalBikes.filter(bike => bike.status === "rented"));
  } else if (bikeStatus === "maintenance") {
    setBikes(originalBikes);
    setBikes(originalBikes.filter(bike => bike.status === "maintenance"));
  } else{
    setBikes(originalBikes);

  }


};


  useEffect(() => {
    fetchBikes();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      
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
    <label htmlFor="name" style={{ fontWeight: "bold", marginBottom: "5px" }}>Enter bike type</label>
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
            onClick={fetchBikes}
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

  <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0" }}>
  <label>
    <input onChange={() => filterBike("available")} type="radio" name="bikeStatus" value="available" /> Available
  </label>
  <label>
    <input onChange={() => filterBike("rented")} type="radio" name="bikeStatus" value="rented" /> Rented
  </label>
  <label>
    <input onChange={() => filterBike("maintenance")} type="radio" name="bikeStatus" value="maintenance" /> Maintenance
  </label>
  <label>
    <input onChange={() => filterBike("all")} type="radio" name="bikeStatus" value="all" defaultChecked /> Show All
  </label>
</div>





    {bikes.length === 0 ? (
      <div style={{ textAlign: "center", color: "#666" }}>
        <RiCreativeCommonsZeroFill size={70} color="#ccc" />
        <p>No bikes found.</p>
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
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Bike ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Type</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Hourly Rate</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Edit</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {console.log("Bikes (from db)", bikes)}
          {bikes.map((bike) => (
            <TableRow key={bike.bike_id} bike={bike} fetchBikes={fetchBikes} />
          ))}
        </tbody>
      </table>
    )}
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
      <Link
        to="/bikes/add"
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
          textAlign: "center",
        }}
      >
        Add Bike
      </Link>
    </div>
  </div>
  


  );
};

export default BikesTable;