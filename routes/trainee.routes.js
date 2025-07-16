const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const {
    getAllTrainees,
    getTraineeById,
    updateTrainee,
    deleteTrainee
} = require("../controllers/trainee.controller");
const checkRole = require("../middlewares/role.middleware");

router.get("/", protect, checkRole("admin"), getAllTrainees);
router.get("/:id", protect, checkRole(["admin", "company"]), getTraineeById);
router.put("/:id", protect, checkRole(["admin", "trainee"]), updateTrainee);
router.delete("/:id", protect, checkRole("admin"), deleteTrainee);

module.exports = router;