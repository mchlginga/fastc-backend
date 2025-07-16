const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const {
    getAllTrainees,
    getTraineeById,
    updateTrainee,
    deleteTrainee
} = require("../controllers/trainee.controller");

router.get("/", protect, getAllTrainees);
router.get("/:id", protect, getTraineeById);
router.put("/:id", protect, updateTrainee);
router.delete("/:id", protect, deleteTrainee);

module.exports = router;