
const errorHandling = (error, req, res, next) => {
    console.error("Error caught by middleware:", error.stack);

    res.status(error.statusCode || 500).json({ message: `Caught an error: ${error.message}` });
};

module.exports = errorHandling;