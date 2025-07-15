const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const {
    getAllTrainees
} = require("../controllers/trainee.controller");

router.get("/", protect, getAllTrainees);

module.exports = router;