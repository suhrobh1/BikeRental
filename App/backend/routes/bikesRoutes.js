const express = require("express");
const router = express.Router();
const {
  getBikes,
  getBikeByID,
  createBike,
  updateBike,
  deleteBike,
} = require("../controllers/bikesController");

router.get("/", getBikes);
router.get("/:id", getBikeByID);
router.post("/", createBike);
router.put("/:id", updateBike);
router.delete("/:id", deleteBike);

module.exports = router;
