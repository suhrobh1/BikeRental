const { json } = require('express'); 
const db = require('../database/config');

// env variables load
require("dotenv").config();

// util deep-compare 
const lodash = require('lodash');

// Return all bikes
const getBikes = async (req, res) => {
    try{
        // select all rows
        const query = "SELECT * FROM Bikes";
        const[rows] = await db.query(query);
        res.status(200).json(rows);
    }catch(error){
        console.log("Error fetching all bikes from bikes table:", error);
        res.status(500).json({error: "Error fetching bikes"})
    }
};

const getBikeByID = async (req, res) => {
    try {
        const bikeID = req.params.id;
        console.log ("PARAMS", req.params);
        const query = "SELECT * FROM Bikes WHERE bike_id = ?";
        const [result] = await db.query(query, [bikeID]);
        //verify if result
        if (result.length == 0){
            return res.status(404).json({error: "Bike not found"});
        }
        const bike = result[0];
        res.json(bike);
    }catch(error){
        console.error("Error retrieving bike from database", error);
        res.status(500).json({error: "Error fetching bike"});
    }
};

const createBike = async (req, res) => {
    try{
        const {type, status, hourly_rate} = req.body;
        const query = "INSERT INTO Bikes (type, status, hourly_rate) VALUES (?, ?, ?)";

        const response = await db.query(query, [type, status, hourly_rate]);
        res.status(201).json(response);
    }catch(error){
        console.error("Error in creating new bike", error);
        res.status(500).json({error: "Error creating new bike"});
    }
};

const updateBike = async (req, res) =>{
    const bikeId = req.params.id;
    console.log("In bikeController, bikeID", bikeId)
    const newBike = req.body;

    try{
        const [data] = await db.query("SELECT * FROM Bikes WHERE bike_id = ?", [bikeId]);
        console.log("In bikeController, data", data);
        const oldBike = data[0];

        if(!lodash.isEqual(newBike, oldBike)) {
            const query = "UPDATE Bikes SET type=?, status=?, hourly_rate=? WHERE bike_id = ?";
            const values = [newBike.type, newBike.status, newBike.hourly_rate, bikeId];
            await db.query(query, values);
            return res.json({message: "Bike updated successfully."});
        }
        res.json({message: "Bike details are the same, no update!"});
    }catch(error){
        console.error("Error updating bike", error);
        res.status(500).json({error: `Error when updating bike ${bikeId}`});
    }
};

const deleteBike = async (req, res) => {
    console.log("bike_id from params", req.params.id);
    const bikeId = req.params.id;

    try{
        const [isExisting] = await db.query(
            "SELECT * FROM Bikes WHERE bike_id = ?", [bikeId]);

        // If bike does not exist
        if (isExisting.length === 0){
            return res.status(404).send("Bike not found!");
        }
        
        // // Delete the bike from intersection table BikeRentals
        // const [response] = await db.query(
        //     "DELETE FROM Rentals WHERE bike_id = ?",
        //      [bikeId]);
        // console.log(
        //     "Deleted", response.affectedRows,
        //     'rows from BikeRentals intersection table' );

        // //Also need to delete from maintenancelogs
        // const [response] = await db.query(
        //     "DELETE FROM Rentals WHERE bike_id = ?",
        //      [bikeId]);
        // console.log(
        //     "Deleted", response.affectedRows,
        //     'rows from BikeRentals intersection table' );


        
        // Deleting bike from the Bikes table
        await db.query("DELETE FROM Bikes WHERE bike_id = ?", [bikeId]);
        res.status(204).json({ message: "Bike deleted successfully" })        
    }catch(error){
        console.error("Bike deletion error", error);
        res.status(500).json({error: error.message});
    }
};

// Export the functions as methods of an object
module.exports = {
    getBikes,
    getBikeByID,
    createBike,
    updateBike,
    deleteBike
};