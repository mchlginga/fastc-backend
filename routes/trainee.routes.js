const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const {
    getAllTrainees,
    getTraineeById
} = require("../controllers/trainee.controller");

router.get("/", protect, getAllTrainees);
router.get("/:id", protect, getTraineeById);

module.exports = router;