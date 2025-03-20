import { useState, useEffect } from 'react';  // import the hooks you are going to use
import axios from 'axios';

// Define the HomePage component
function HomePage() {
  // useState hook to initialize the diagnosticData state variable to store the fetched data
  const [diagnosticData, setDiagnosticData] = useState([]);

  // Define a function to fetch diagnostic data from the API
  const fetchDiagnosticData = async () => {
    try {
      // Construct the URL for the API call
      const URL = import.meta.env.VITE_API_URL + 'diagnostic';
      // Use Axios to make the GET request
      const response = await axios.get(URL);
      // Update state with the response data
      setDiagnosticData(response.data);
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching diagnostic data:', error);
      alert('Error fetching diagnostic data from the server.');
    }
  };

  // useEffect hook to trigger the fetchDiagnosticData function when the component mounts
  useEffect(() => {
    fetchDiagnosticData();
  }, []);

  // Determine content based on diagnosticData length from the fetch action
  let content;
  if (diagnosticData === null) {
    content = <p>Loading diagnostic data...</p>; // Show while data is null
  } else if (diagnosticData.length === 0) {
    content = <p>No diagnostic data found.</p>; // Show if data is an empty array
  } else {
    content = <pre>{JSON.stringify(diagnosticData, null, 2)}</pre>;
  }

  // display the content and anything else
  return (
    <>
     {/* <h2>Diagnostic Data</h2>
      {content} */}



<h4>Manage customer registration to track renters.</h4>
<h4>Track bike inventory to monitor availability and status.</h4>
<h4>Manage rental transactions to link customers with bikes and rental duration.</h4>
<h4>Handle payments for clear financial records.</h4>
<h4>Track maintenance logs to monitor bike repairs and servicing.</h4>
<h4>Reduce operational overhead like double bookings and payment tracking.</h4>
<h4>Scope: Support for 200 bikes, 5,000 customers, and 10,000 rentals.</h4>
<h4>Key benefit: Improve efficiency and reduce maintenance/admin costs (estimated at 16.67% of gross revenue).</h4>
<h4>Market growth: Bike rental industry projected to grow 20.5% annually from 2023 to 2030.</h4>
    </>
  );
}
export default HomePage;