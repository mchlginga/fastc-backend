const express = require("express");
const router = express.Router();

const {
    createJob,
    getAllJobs,
    getJobById,
    updateJobById
} = require("../controllers/job.controller");

const { protect, checkRole } = require("../middlewares/index");

router.post("/", protect, checkRole(["admin", "company"]), createJob);
router.get("/", protect, getAllJobs);
router.get("/:id", protect, getJobById);
router.put("/:id", protect, checkRole(["admin", "company"]),  updateJobById);

module.exports = router;