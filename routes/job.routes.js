const express = require("express");
const router = express.Router();

const {
    createJob,
    getAllJobs
} = require("../controllers/job.controller");

const { protect, checkRole } = require("../middlewares/index");

router.post("/", protect, checkRole(["admin", "company"]), createJob);
router.get("/", protect, getAllJobs);

module.exports = router;