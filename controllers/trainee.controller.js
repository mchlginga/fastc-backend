const User = require("../models/user");
const { statusCodes } = require("../utils/index");

exports.getAllTrainees = async (req, res, next) => {
    try {
        const trainees = await User.find({ role: "trainee" }).select("-password");
        
        res.status(statusCodes.OK).json(trainees);
    } catch (error) {
        next(error);
    }
};