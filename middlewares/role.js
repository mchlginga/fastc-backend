const { statusCodes } = require("../utils/index");

const checkRole = (roles) => {
    return (req, res, next) => {
        // if it's not registered user
        if (!req.user) {
            return res.status(statusCodes.UNAUTHORIZED).json({ message: "Note authenticated"});
        }

        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(statusCodes.FORBIDDEN).json({ message: "Access denied."});
        }

        next();
    };
};

module.exports = checkRole;