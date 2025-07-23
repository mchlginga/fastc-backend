const express = require("express");
const router = express.Router();

const {
    createJob,
    getAllJobs,
    getJobById,
    updateJobById,
    deleteJobById
} = require("../controllers/job");

const { protect, checkRole } = require("../middlewares/index");

router.post("/", protect, checkRole(["admin", "company"]), createJob);
router.get("/", protect, getAllJobs);
router.get("/:id", protect, getJobById);
router.put("/:id", protect, checkRole(["admin", "company"]),  updateJobById);
router.delete("/:id", protect, checkRole(["admin", "company"]), deleteJobById);

module.exports = router;