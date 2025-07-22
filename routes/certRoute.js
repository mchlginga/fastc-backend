const express = require("express");
const router = express.Router();

const { generateCertificate } = require("../controllers/certController");

router.get("/:id", generateCertificate);

module.exports = router;