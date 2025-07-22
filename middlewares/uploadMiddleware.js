const multer = require("multer");
const path = require("path");

const { PATHS, createDir } = require("../utils/index");

createDir(PATHS.profileDir);

const storage = multer.diskStorage({
    // path
    destination: (req, file, cb) => {
        cb(null, PATHS.profileDir);
    },

    // filename
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage});

module.exports = upload;