// The code below was adapted from CS 340 React Starter Guide on Canvas. 



const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// API Routes for backend CRUD:
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/bikes", require("./routes/bikesRoutes"));
app.use("/api/rentals", require("./routes/rentalRoutes"));
app.use("/api/payments", require("./routes/paymentsRoutes"));
app.use("/api/maintenance_logs", require("./routes/maintenanceLogsRoutes"));
app.use("/api/bike_maintenance_logs", require("./routes/bikeMaintenanceLogsRoutes"));
app.use("/api/customer_payments", require("./routes/customerPaymentsRoutes"));
app.delete('/api/customer_payments/:customer_id/:payment_id');


// Match to your database config route
const db = require('./database/config');

// define a new GET request with express:
app.get('/api/diagnostic', async (req, res) => {
  try {
    const connection = db.pool.promise();
    console.log("Flag 1!");

    await connection.query('DROP TABLE IF EXISTS diagnostic;');
    await connection.query(
      'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);'
    );
    await connection.query('INSERT INTO diagnostic (text) VALUES ("MySQL is working!")');

    const [results] = await connection.query('SELECT * FROM diagnostic;');

    res.json(results); // Return the actual results array

  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).send('Server error');
  }
});

// ...
// End Connect DB Activity Code.


const os = require("os");
const hostname = os.hostname();

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
