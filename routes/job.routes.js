const express = require("express");
const router = express.Router();

const {
    createJob,
    getAllJobs,
    getJobById
} = require("../controllers/job.controller");

const { protect, checkRole } = require("../middlewares/index");

router.post("/", protect, checkRole(["admin", "company"]), createJob);
router.get("/", protect, getAllJobs);
router.get("/:id", protect, getJobById);

module.exports = router;