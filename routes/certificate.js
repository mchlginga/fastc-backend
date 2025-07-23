const express = require("express");
const router = express.Router();

const { generateCertificate } = require("../controllers/certificate");

router.get("/:id", generateCertificate);

module.exports = router;