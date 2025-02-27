import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ bike, fetchBikes }) => {
  //Hook that allows us to navigate programmatically
  const navigate = useNavigate();

  // Redirect to edit bikes page
  const handleEdit = () => {
    console.log("In TableRow, ln 11 | bike id", bike);
    navigate("/bikes/edit/" + bike.bike_id, { state: { bike } });
  };

  const deleteRow = async () => {
    try {
      console.log("In TableRow, ln 19 | bike", bike.bike_id);
      const URL = import.meta.env.VITE_API_URL + "bikes/" + bike.bike_id;
      console.log("URL", URL);
      const response = await axios.delete(URL);
      console.log("In BikeTableRow, ln 22 | Flag 3");
      console.log("In BikeTableRow, ln 24 | response.status", response.status);
      if (response.status === 204) {
        alert("Bike deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting bike!");
      console.log(err);
    }
    fetchBikes();
  };

  return (
    <tr key={bike.bike_id}>
      <td>{bike.bike_id}</td>
      <td>{bike.type}</td>
      <td>{bike.status}</td>
      <td>{bike.hourly_rate}</td>
      <td>
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
      </td>
      <td>
        <BsTrash onClick={deleteRow} size={25} style={{ cursor: "pointer" }} />
      </td>
    </tr>
  );
};

export default TableRow;