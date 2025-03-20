
const express = require('express');
const router = express.Router();
const {
  getPayments,
  getPaymentByID,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentsController");

router.get("/", getPayments);
router.get("/:id", getPaymentByID);
router.post("/", createPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
