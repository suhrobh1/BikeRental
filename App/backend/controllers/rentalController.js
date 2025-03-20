const { json } = require('express');
const db = require('../database/config');

// env variables load
require("dotenv").config();

// util deep-compare 
const lodash = require('lodash');

// Return all rentals
const getRentals = async (req, res) => {
    try {
        // select all rows
        const query = "SELECT * FROM Rentals";
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.log("Error fetching all rentals from rentals table:", error);
        res.status(500).json({ error: "Error fetching rentals" });
    }
};

const getRentalByID = async (req, res) => {
    try {
        const rental_id = req.params.id;
        console.log("PARAMS", req.params);
        const query = "SELECT * FROM Rentals WHERE rental_id = ?";
        const [result] = await db.query(query, [rental_id]);

        // Verify if result exists
        if (result.length == 0) {
            return res.status(404).json({ error: "Rental not found" });
        }
        const rental = result[0];
        res.json(rental);
    } catch (error) {
        console.error("Error retrieving rental from database", error);
        res.status(500).json({ error: "Error fetching rental" });
    }
};

const createRental = async (req, res) => {
    try {
        const { customer_id, bike_id, rental_date, return_date, total_cost } = req.body;
        const query = "INSERT INTO Rentals (customer_id, bike_id, rental_date, return_date, total_cost) VALUES (?, ?, ?, ?, ?)";

        const response = await db.query(query, [customer_id, bike_id, rental_date, return_date, total_cost]);
        res.status(201).json(response);
    } catch (error) {
        console.error("Error in creating new rental", error);
        res.status(500).json({ error: "Error creating new rental" });
    }
};

const updateRental = async (req, res) => {
    const rental_id = req.params.id;
    console.log("In rentalController, ln 57 | rental_id", rental_id);
    const newRental = req.body;

    try {
        const [data] = await db.query("SELECT * FROM Rentals WHERE rental_id = ?", [rental_id]);
        console.log("In rentalController, ln 62 | data", data);
        const oldRental = data[0];

        if (!lodash.isEqual(newRental, oldRental)) {
            const query = "UPDATE Rentals SET customer_id=?, bike_id=?, rental_date=?, return_date=?, total_cost=? WHERE rental_id = ?";
            const values = [newRental.customer_id, newRental.bike_id, newRental.rental_date, newRental.return_date, newRental.total_cost, rental_id];
            await db.query(query, values);
            return res.json({ message: "Rental updated successfully." });
        }
        res.json({ message: "Rental details are the same, no update!" });
    } catch (error) {
        console.error("Error updating rental", error);
        res.status(500).json({ error: `Error when updating rental ${rental_id}` });
    }
};

const deleteRental = async (req, res) => {
    console.log("rental_id from params", req.params.id);
    const rental_id = req.params.id;

    try {
        const [isExisting] = await db.query(
            "SELECT * FROM Rentals WHERE rental_id = ?", [rental_id]
        );

        // If rental does not exist
        if (isExisting.length === 0) {
            return res.status(404).send("Rental not found!");
        }

        // Deleting rental from the Rentals table
        await db.query("DELETE FROM Rentals WHERE rental_id = ?", [rental_id]);
        res.status(204).json({ message: "Rental deleted successfully" });
    } catch (error) {
        console.error("Rental deletion error", error);
        res.status(500).json({ error: error.message });
    }
};

// Export the functions as methods of an object
module.exports = {
    getRentals,
    getRentalByID,
    createRental,
    updateRental,
    deleteRental
};
