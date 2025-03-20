const { json } = require('express');
const db = require('../database/config');

// Load environment variables
require("dotenv").config();

// Utility for deep comparison
const lodash = require('lodash');


// Return all bike maintenance logs
const getBikeMaintenanceLogs = async (req, res) => {
    try {
        // Select all rows from BikeMaintenanceLogs
        const query = "SELECT * FROM BikeMaintenanceLogs";
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.log("Error fetching all bike maintenance logs:", error);
        res.status(500).json({ error: "Error fetching bike maintenance logs" });
    }
};

// Get bike maintenance log by ID
const getBikeMaintenanceLogByID = async (req, res) => {
    try {
        const maintenanceID = req.params.id;
        console.log("PARAMS", req.params);
        const query = "SELECT * FROM BikeMaintenanceLogs WHERE maintenance_id = ?";
        const [result] = await db.query(query, [maintenanceID]);
        // Verify if result exists
        if (result.length === 0) {
            return res.status(404).json({ error: "Bike maintenance log not found" });
        }
        const log = result[0];
        res.json(log);
    } catch (error) {
        console.error("Error retrieving bike maintenance log from database", error);
        res.status(500).json({ error: "Error fetching bike maintenance log" });
    }
};

// Create a new bike maintenance log
const createBikeMaintenanceLog = async (req, res) => {
    try {
        const { maintenance_id,  bike_id } = req.body;
        const query = "INSERT INTO BikeMaintenanceLogs (maintenance_id, bike_id) VALUES (?, ?)";

        const response = await db.query(query, [maintenance_id, bike_id]);
        res.status(201).json(response);
    } catch (error) {
        console.error("Error in creating new bike maintenance log", error);
        res.status(500).json({ error: "Error creating new bike maintenance log" });
    }
};

// Update a bike maintenance log
const updateBikeMaintenanceLog = async (req, res) => {
    const bikeMaintenanceLogID = req.params.id;
    console.log("In bikeMaintenanceLogsController, maintenanceID:", bikeMaintenanceLogID);
    const newLog = req.body;

    try {
        const [data] = await db.query("SELECT * FROM BikeMaintenanceLogs WHERE bike_maintenance_id = ?", [bikeMaintenanceLogID]);
        console.log("Fetched bike maintenance log data:", data);
        const oldLog = data[0];

        if (!oldLog) {
            return res.status(404).json({ error: "Bike maintenance log not found" });
        }

        // Only update if data has changed
        if (!lodash.isEqual(newLog, oldLog)) {
            const query = "UPDATE BikeMaintenanceLogs SET maintenance_id=?, bike_id=? WHERE bike_maintenance_id = ?";
            const values = [newLog.maintenance_id, newLog.bike_id, bikeMaintenanceLogID];
            await db.query(query, values);
            return res.json({ message: "Bike maintenance log updated successfully." });
        }

        res.json({ message: "Bike maintenance log details are the same, no update needed." });
    } catch (error) {
        console.error("Error updating bike maintenance log", error);
        res.status(500).json({ error: `Error when updating bike maintenance log ${bikeMaintenanceLogID}` });
    }
};

// Delete a bike maintenance log
const deleteBikeMaintenanceLog = async (req, res) => {
    console.log("maintenance_id from params", req.params.id);
    const {maintenance_id, bike_id} = req.params;

    try {
        const [isExisting] = await db.query(
            "SELECT * FROM BikeMaintenanceLogs WHERE maintenance_id = ? and bike_id=?", [maintenance_id, bike_id]);

        // If bike maintenance log does not exist
        if (isExisting.length === 0) {
            return res.status(404).send("Bike maintenance log not found!");
        }

        // Deleting bike maintenance log from BikeMaintenanceLogs table
        await db.query("DELETE FROM BikeMaintenanceLogs WHERE maintenance_id = ? and bike_id= ?",  [maintenance_id, bike_id]);
        res.status(204).json({ message: "Bike maintenance log deleted successfully" });
    } catch (error) {
        console.error("Bike maintenance log deletion error", error);
        res.status(500).json({ error: error.message });
    }
};

// Export the functions as methods of an object
module.exports = {
    getBikeMaintenanceLogs,
    getBikeMaintenanceLogByID,
    createBikeMaintenanceLog,
    updateBikeMaintenanceLog,
    deleteBikeMaintenanceLog
};
