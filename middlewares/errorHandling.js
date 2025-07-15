const { statusCodes } = require("../utils/index");

const errorHandling = (error, req, res, next) => {
    console.error("Error caught by middleware:", error.stack);

    res.status(error.statusCode || statusCodes.SERVER_ERROR).json({ message: `Caught an error: ${error.message}` });
};

module.exports = errorHandling;