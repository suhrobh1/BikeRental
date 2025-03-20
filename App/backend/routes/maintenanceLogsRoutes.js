const express = require("express");
const router = express.Router();
const {
  getMaintenanceLogs,
  getMaintenanceLogByID,
  createMaintenanceLog,
  updateMaintenanceLog,
  deleteMaintenanceLog,
} = require("../controllers/maintenanceLogsController");

// Route to get all maintenance logs
router.get("/", getMaintenanceLogs);

// Route to get a specific maintenance log by ID
router.get("/:id", getMaintenanceLogByID);

// Route to create a new maintenance log
router.post("/", createMaintenanceLog);

// Route to update a maintenance log by ID
router.put("/:id", updateMaintenanceLog);

// Route to delete a maintenance log by ID
router.delete("/:id", deleteMaintenanceLog);

module.exports = router;
