const { json } = require('express');
const db = require('../database/config');
require('dotenv').config();
const lodash = require('lodash');

// Return all customer payments
const getCustomerPayments = async (req, res) => {
    try {
        console.log("In cust.paymentcontoller! ln")
        const query = "SELECT * FROM CustomerPayments";
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.log("Error fetching all customer payments", error);
        res.status(500).json({ error: "Error fetching customer payments !" });
    }
};

// Get customer payment by ID
const getCustomerPaymentByID = async (req, res) => {
    try {
        const customer_payment_id = req.params.id;
        const query = 'SELECT * FROM CustomerPayments WHERE customer_payment_id = ?';
        const [result] = await db.query(query, [customer_payment_id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Customer payment not found" });
        }

        const payment = result[0];
        res.json(payment);
    } catch (error) {
        console.error("Error retrieving customer payment from database", error);
        res.status(500).json({ error: "Error fetching customer payment" });
    }
};

// Create a new customer payment
const createCustomerPayment = async (req, res) => {
    try {
        const { customer_id, payment_id } = req.body;
        const query = "INSERT INTO CustomerPayments (customer_id, payment_id) VALUES (?, ?)";

        const response = await db.query(query, [customer_id, payment_id]);
        res.status(201).json(response);
    } catch (error) {
        console.error("Error in creating new customer payment", error);
        res.status(500).json({ error: "Error creating new customer payment" });
    }
};

// Update a customer payment
const updateCustomerPayment = async (req, res) => {
    const customer_payment_id = req.params.id;
    console.log("Updating customer customer_payment_id", customer_payment_id);
    const newPayment = req.body;

    try {
        const [data] = await db.query("SELECT * FROM CustomerPayments WHERE customer_payment_id = ?", [customer_payment_id]);
        console.log("Fetched customer payment data", data);
        const oldPayment = data[0];

        if (!oldPayment) {
            return res.status(404).json({ error: "Customer payment not found" });
        }

        if (!lodash.isEqual(newPayment, oldPayment)) {
            const query = "UPDATE CustomerPayments SET customer_id=?, payment_id=? WHERE customer_payment_id = ?";
            const values = [newPayment.customer_id, newPayment.payment_id, customer_payment_id];
            await db.query(query, values);
            return res.json({ message: "Customer payment updated successfully." });
        }

        res.json({ message: "Customer payment details are the same, no update!" });
    } catch (error) {
        console.error("Error updating customer payment", error);
        res.status(500).json({ error: `Error when updating customer payment ${customer_payment_id}` });
    }
};

// Delete a customer payment
const deleteCustomerPayment = async (req, res) => {
    console.log("Flag ln 84npm !")

    const { customer_id, payment_id } = req.params;


    try {
        // Check if the payment entry exists in the CustomerPayments table
        console.log("Flag ln 87npm !")
        const [isExisting] = await db.query(
            "SELECT * FROM CustomerPayments WHERE customer_id = ? AND payment_id = ?",  [customer_id, payment_id]
        );
        console.log("Flag ln 90 !")
        if (isExisting.length === 0) {
            return res.status(404).send("Customer payment not found!");
        }

        // If found, proceed to delete it
        await db.query("DELETE FROM CustomerPayments WHERE customer_id = ? AND payment_id = ?", [customer_id, payment_id]);
        res.status(204).json({ message: "Customer payment deleted successfully" });
    } catch (error) {
        console.error("Customer payment deletion error", error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getCustomerPayments,
    getCustomerPaymentByID,
    createCustomerPayment,
    updateCustomerPayment,
    deleteCustomerPayment
};
