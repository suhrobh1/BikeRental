const { json } = require('express');
const db = require('../database/config');

// env variables load
require("dotenv").config();

// util deep-compare 
const lodash = require('lodash');

// Return all customers
const getCustomers = async (req, res) => {
    try{
        // select all rows
        const query = "SELECT * FROM Customers";
        const[rows] = await db.query(query);
        res.status(200).json(rows);
    }catch(error){
        console.log("Error fetching all customers from customers table:", error);
        res.status(500).json({error: "Error fetching customers"})
    }
};


const getCustomerByID = async (req, res) => {
    try {
        const customerID = req.params.id;
        console.log ("PARAMS", req.params);
        const query = "SELECT * FROM Customers WHERE customer_id = ?";
        const [result] = await db.query(query, [customerID]);
        //verify if result
        if (result.length == 0){
            return res.status(404).json({error: "Customers not found"});
        }
        const customer = result[0];
        res.json(person);
    }catch(error){
        console.error("Error retrieving customer from database", error);
        res.status(500).json({error: "Error fetching customer"});
    }
};

const createCustomer = async (req, res) => {
    try{
        const {name, email, phone} = req.body;
        const query = "INSERT INTO Customers (name, email, phone) VALUES (?, ?, ?)";

        const response = await db.query(query, [name, email, phone]);
        res.status(201).json(response);
    }catch(error){
        console.error("Error in creating new customer", error);
        res.status(500).json({error: "Error creating new customer"});
    }
};

const updateCustomer = async (req, res) =>{
    const customerId = req.params.id;
    console.log("In customerController,ln 57 | customerID", customerId)
    const newCustomer = req.body;

    try{
        const [data] = await db.query("SELECT * FROM Customers WHERE customer_id = ?", [customerId]);
        console.log("In customerController, ln 62 | data", data);
        const oldCustomer = data[0];

        if(!lodash.isEqual(newCustomer, oldCustomer)) {
            const query = "UPDATE Customers SET name=?, email=?, phone=? WHERE customer_id = ?";
            const values = [newCustomer.name, newCustomer.email, newCustomer.phone, customerId];
            await db.query(query, values);
            return res.json({message: "Customer update successfully."});
        }
        req.json({message: "Customer details are the same, no update!"});
    }catch(error){
        console.error("Error updating customer", error);
        res.status(500).json({error: `Erron when updating customer ${customerId}`});
    }
};




const deleteCustomer = async (req, res) => {
    console.log("customer_id from params", req.params.id);
    const customerId = req.params.id;

    try{

        const [isExisting] = await db.query(
            "SELECT * FROM Customers WHERE customer_id = ?", [customerId]);

        // If customer does not exist
        if (isExisting.length === 0){
            return res.status(404).send("Customer not found!");
        }
        
        // Delete the customer from interstection table CustomerPayments
        const [response] = await db.query(
            "DELETE FROM CustomerPayments WHERE customer_id = ?",
             [customerId]);
        console.log(
            "Deleted",
             response.affectedRows,
              'rows from CustomerPayments intersection table' );

        //Deleting customer from the Customers table
        await db.query("DELETE FROM Customers WHERE customer_id = ?", [customerId]);
        res.status(204).json({ message: "Customer deleted successfully" })        
    }catch(error){
        console.error(" Customer deletion error", error);
        res.status(500).json({error: error.message});
    }
};




// Export the functions as methods of an object
module.exports = {
    getCustomers,
    getCustomerByID,
    createCustomer,
    updateCustomer,
    deleteCustomer
  };
  
