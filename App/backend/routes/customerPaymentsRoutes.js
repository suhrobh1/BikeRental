
const express = require('express');
const router = express.Router();
const {
  getCustomerPayments,
  getCustomerPaymentByID,
  createCustomerPayment,
  updateCustomerPayment,
  deleteCustomerPayment,
} = require("../controllers/customerPaymentsController");

router.get("/", getCustomerPayments);
router.get("/:id", getCustomerPaymentByID);
router.post("/", createCustomerPayment);
router.put("/:id", updateCustomerPayment);
router.delete("/:customer_id/:payment_id", deleteCustomerPayment);

module.exports = router;
