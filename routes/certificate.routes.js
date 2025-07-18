const express = require("express");
const router = express.Router();

const { generateCertificate } = require("../controllers/certificate.controller");

router.get("/:id", generateCertificate);

module.exports = router;