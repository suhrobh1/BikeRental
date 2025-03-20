const express = require("express");
const router = express.Router();
const {
  getRentals,
  getRentalByID,
  createRental,
  updateRental,
  deleteRental,
} = require("../controllers/rentalController");

router.get("/", getRentals);
router.get("/:id", getRentalByID);
router.post("/", createRental);
router.put("/:id", updateRental);
router.delete("/:id", deleteRental);

module.exports = router;
