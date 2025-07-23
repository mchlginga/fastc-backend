const express = require("express");
const router = express.Router();

const {
    getTraineesMatchToJob,
    // getJobMatchToTrainee
} = require("../controllers/match");

const { protect, checkRole } = require("../middlewares/index");

router.get("/:jobId", protect, checkRole(["admin", "company"]), getTraineesMatchToJob);
// router.get("/trainee/:traineeId", protect, checkRole(["admin", "trainee"]), getJobMatchToTrainee);

module.exports = router;