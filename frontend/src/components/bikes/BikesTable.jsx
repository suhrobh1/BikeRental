import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./BikesTableRow";
import axios from "axios";

const BikesTable = () => {
  const [bikes, setBikes] = useState([]);

  const fetchBikes = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "bikes";
      const response = await axios.get(URL);
      setBikes(response.data);
    } catch (error) {
      alert("Error fetching bikes from the server.");
      console.error("Error fetching bikes:", error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  return (
    <div>
      <h2>Bike Table</h2>
      {bikes.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No bikes found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Bike ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Hourly Rate</th>
              <th>Edit</th>
              <th>Delete</th>
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
    </div>
  );
};

export default BikesTable;