const protect = require("./auth.middleware");
const errorHandling = require("./errorHandling");
const checkRole = require("./role.middleware");
const upload = require("./upload.middleware");

module.exports = {
    protect,
    errorHandling,
    checkRole,
    upload
};