const express = require("express");
const router = express.Router();

const {
    jobCreate
} = require("../controllers/job.controller");

const { protect, checkRole } = require("../middlewares/index");

router.post("/", protect, checkRole(["admin", "company"]), jobCreate);

module.exports = router;