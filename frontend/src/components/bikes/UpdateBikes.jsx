import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateBike = () => {
    const { id } = useParams();
    console.log("id in ln 10 in UpdateBike", id);
    const navigate = useNavigate();
    const location = useLocation();
    const prevBike = location.state.bike;

    const [formData, setFormData] = useState({
        bike_id: prevBike.id || '',
        type: prevBike.type || '',
        status: prevBike.status || '',
        hourly_rate: prevBike.hourly_rate || '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    function isUpdate() {
        // Check if formData is equal to old bike
        if (JSON.stringify(formData) === JSON.stringify({
            type: prevBike.type || '',
            status: prevBike.status || '',
            hourly_rate: prevBike.hourly_rate || '',
        })) {
            alert("No changes made.");
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isUpdate()) {
            try {
                console.log("In UpdateBike, ln 47 | id", id);
                const URL = import.meta.env.VITE_API_URL + "bikes/" + id;
                const response = await axios.put(URL, formData);
                if (response.status !== 200) {
                    alert("Error updating bike!");
                } else {
                    alert(response.data.message);
                }
                navigate("/bikes");
            } catch (error) {
                console.log("Error updating bike!", error);
            }
        }
    };

    return (
        <div>
            <h2>Update Bike</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type: </label>
                    <input
                        type="text"
                        name="type"
                        onChange={handleInputChange}
                        required
                        defaultValue={prevBike.type}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        onChange={handleInputChange}
                        required
                        defaultValue={prevBike.status}
                    />
                </div>
                <div>
                    <label>Hourly Rate:</label>
                    <input
                        type="text"
                        name="hourly_rate"
                        onChange={handleInputChange}
                        required
                        defaultValue={prevBike.hourly_rate}
                    />
                </div>
                <button type="button" onClick={() => navigate("/bikes")}>
                    Cancel
                </button>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateBike;
