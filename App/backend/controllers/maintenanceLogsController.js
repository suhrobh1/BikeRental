const { json } = require('express');
const db = require('../database/config');

// env variables load
require("dotenv").config();

// util deep-compare 
const lodash = require('lodash');

// Return all maintenance logs
const getMaintenanceLogs = async (req, res) => {
    try {
        // select all rows
        const query = "SELECT * FROM MaintenanceLogs";
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.log("Error fetching all maintenance logs:", error);
        res.status(500).json({ error: "Error fetching maintenance logs" });
    }
};

// Get maintenance log by ID
const getMaintenanceLogByID = async (req, res) => {
    try {
        const maintenanceID = req.params.id;
        console.log("PARAMS", req.params);
        const query = "SELECT * FROM MaintenanceLogs WHERE maintenance_id = ?";
        const [result] = await db.query(query, [maintenanceID]);
        // Verify if result exists
        if (result.length === 0) {
            return res.status(404).json({ error: "Maintenance log not found" });
        }
        const log = result[0];
        res.json(log);
    } catch (error) {
        console.error("Error retrieving maintenance log from database", error);
        res.status(500).json({ error: "Error fetching maintenance log" });
    }
};

// Create a new maintenance log
const createMaintenanceLog = async (req, res) => {
    try {
        const { service_date, description, bike_id } = req.body;
        const query = "INSERT INTO MaintenanceLogs (service_date, description) VALUES (?, ?)";

        const response = await db.query(query, [service_date, description]);
        res.status(201).json(response);
    } catch (error) {
        console.error("Error in creating new maintenance log", error);
        res.status(500).json({ error: "Error creating new maintenance log" });
    }
};

// Update a maintenance log
const updateMaintenanceLog = async (req, res) => {
    const maintenanceID = req.params.id;
    console.log("In maintenanceLogController, maintenanceID:", maintenanceID);
    const newLog = req.body;

    try {
        const [data] = await db.query("SELECT * FROM MaintenanceLogs WHERE maintenance_id = ?", [maintenanceID]);
        console.log("Fetched maintenance log data:", data);
        const oldLog = data[0];

        if (!lodash.isEqual(newLog, oldLog)) {
            const query = "UPDATE MaintenanceLogs SET service_date=?, description=? WHERE maintenance_id = ?";
            const values = [newLog.service_date, newLog.description, maintenanceID];
            await db.query(query, values);
            return res.json({ message: "Maintenance log updated successfully." });
        }
        res.json({ message: "Maintenance log details are the same, no update needed." });
    } catch (error) {
        console.error("Error updating maintenance log", error);
        res.status(500).json({ error: `Error when updating maintenance log ${maintenanceID}` });
    }
};

// Delete a maintenance log
const deleteMaintenanceLog = async (req, res) => {
    console.log("maintenance_id from params", req.params.id);
    const maintenanceID = req.params.id;

    try {
        const [isExisting] = await db.query(
            "SELECT * FROM MaintenanceLogs WHERE maintenance_id = ?", [maintenanceID]);

        // If maintenance log does not exist
        if (isExisting.length === 0) {
            return res.status(404).send("Maintenance log not found!");
        }


        // Deleting maintenance log from MaintenanceLogs table
        await db.query("DELETE FROM MaintenanceLogs WHERE maintenance_id = ?", [maintenanceID]);
        res.status(204).json({ message: "Maintenance log deleted successfully" });
    } catch (error) {
        console.error("Maintenance log deletion error", error);
        res.status(500).json({ error: error.message });
    }
};

// Export the functions as methods of an object
module.exports = {
    getMaintenanceLogs,
    getMaintenanceLogByID,
    createMaintenanceLog,
    updateMaintenanceLog,
    deleteMaintenanceLog
};
