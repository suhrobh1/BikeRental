const express = require("express");
const router = express.Router();
const {
  getBikeMaintenanceLogs,
  getBikeMaintenanceLogByID,
  createBikeMaintenanceLog,
  updateBikeMaintenanceLog,
  deleteBikeMaintenanceLog,
} = require("../controllers/bikeMaintenanceLogsController");

// Route to get all bike maintenance logs
router.get("/", getBikeMaintenanceLogs);

// Route to get a specific bike maintenance log by ID
router.get("/:id", getBikeMaintenanceLogByID);

// Route to create a new bike maintenance log
router.post("/", createBikeMaintenanceLog);

// Route to update a bike maintenance log by ID
router.put("/:id", updateBikeMaintenanceLog);

// Route to delete a bike maintenance log by ID
router.delete("/:maintenance_id/:bike_id", deleteBikeMaintenanceLog);

module.exports = router;
