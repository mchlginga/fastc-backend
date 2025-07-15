const jwt = require("jsonwebtoken");

const { statusCodes } = require("../utils/index");
const config = require("../config/config");
const User = require("../models/user");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = await jwt.verify(token, config.jwtSecret);

            req.user = await User.findById(decoded.id).select("-password");

            next();

        } catch (error) {
            next(error);
        }
    } else {
        res.status(statusCodes.UNAUTHORIZED).json({ message: "Not authorized, no token." });
    }
};

module.exports = protect;