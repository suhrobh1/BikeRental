const {json} = require('express');
const db = require ('../database/config');


// dotenv load
require('dotenv').config();


const lodash = require('lodash');


//Return all payments
const getPayments = async (req, res) => {
    try{
        //select all rows
        const query = "SELECT * FROM Payments";
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    }catch(error){
        console.log("Error fetching all payments", error);
        res.status(500).json({error: "Error fetching payments"});                                                                      
    }
};

// Get payment by ID
const getPaymentByID = async (req, res) => {
    try {
        const payment_id = req.params.id;
        const query = 'SELECT * FROM Payments WHERE rental_id = ?';
        const [result] =  await db.query(query, [payment_id]);

         // Verify if result exists
         if (result.length == 0) {
            return res.status(404).json({ error: "Payment not found" });
        }
        const payment = result[0];
        res.json(payment);
    } catch (error) {
        console.error("Error retrieving payment from database", error);
        res.status(500).json({ error: "Error fetching payment" });
    }
    };


    const createPayment = async (req, res) => {
        try {
            const {rental_id, amount, payment_date, paid } = req.body;
            const query = "INSERT INTO Payments (rental_id, amount, payment_date, paid) VALUES (?, ?, ?, ?)";
    
            const response = await db.query(query, [rental_id, amount, payment_date, paid]);
            res.status(201).json(response);
        } catch (error) {
            console.error("Error in creating new payment", error);
            res.status(500).json({ error: "Error creating new payment" });
        }
    };
    
    const updatePayment = async (req, res) => {
        const payment_id = req.params.id;
        console.log("In paymentController, updating payment_id", payment_id);
        const newPayment = req.body;
    
        try {
            console.log("paymentController, ln64 | Flag 1! ")
            const [data] = await db.query("SELECT * FROM Payments WHERE payment_id = ?", [payment_id]);
            console.log("Fetched payment data", data);
            const oldPayment = data[0];
    
            if (!lodash.isEqual(newPayment, oldPayment)) {
                const query = "UPDATE Payments SET rental_id=?, amount=?, payment_date=?, paid=? WHERE payment_id = ?";
                const values = [newPayment.rental_id, newPayment.amount, newPayment.payment_date, newPayment.paid, payment_id];
                await db.query(query, values);
                return res.json({ message: "Payment updated successfully." });
            }
            res.json({ message: "Payment details are the same, no update!" });
        } catch (error) {
            console.error("Error updating payment", error);
            res.status(500).json({ error: `Error when updating payment ${payment_id}` });
        }
    };


    
    const deletePayment = async (req, res) => {
        console.log("payment_id from params", req.params.id);
        const payment_id = req.params.id;
    
        try {
            const [isExisting] = await db.query(
                "SELECT * FROM Payments WHERE payment_id = ?", [payment_id]
            );
    
            if (isExisting.length === 0) {
                return res.status(404).send("Payment not found!");
            }
    
            await db.query("DELETE FROM Payments WHERE payment_id = ?", [payment_id]);
            res.status(204).json({ message: "Payment deleted successfully" });
        } catch (error) {
            console.error("Payment deletion error", error);
            res.status(500).json({ error: error.message });
        }
    };
    
    module.exports = {
        getPayments,
        getPaymentByID,
        createPayment,
        updatePayment,
        deletePayment
    };
    