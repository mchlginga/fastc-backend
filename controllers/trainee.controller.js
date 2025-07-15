const User = require("../models/user");
const { statusCodes } = require("../utils/index");

// get trainees
exports.getAllTrainees = async (req, res, next) => {
    try {
        const trainees = await User.find({ role: "trainee" }).select("-password");
        
        res.status(statusCodes.OK).json(trainees);
    } catch (error) {
        next(error);
    }
};

// get trainee by id
exports.getTraineeById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const trainee = await User.findById(id).select("-password");

        if (!trainee || trainee.role !== "trainee") {
            return res.status(statusCodes.NOT_FOUND).json({ message: "Trainee not found."});
        }

        res.status(statusCodes.OK).json(trainee);
    } catch (error) {
        next(error);
    }
};