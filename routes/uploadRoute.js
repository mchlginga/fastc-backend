const express = require("express");
const router = express.Router();

const { uploadProfilePic } = require("../controllers/uploadController");

// middlewares
const { protect, upload } = require("../middlewares/index");

router.post("/upload-profile-pic", protect, upload.single("profile"), uploadProfilePic);

module.exports = router;