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

// update trainee by id
exports.updateTrainee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password, role, ...updateData } = req.body;
        
        const updated = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updated || updated.role !== "trainee") {
            return res.status(statusCodes.NOT_FOUND).json({ message: "Trainee not found."});
        }

        res.status(statusCodes.OK).json(updated);
    } catch (error) {
        next(error);
    }
};

// delete trainee by id
exports.deleteTrainee = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await User.findOneAndDelete({ _id: id, role: "trainee" });

        if (!deleted) {
            return res.status(statusCodes.NOT_FOUND).json({ message: "Trainee not found." });
        }

        res.status(statusCodes.OK).json({ message: "Trainee deleted successfully." });
    } catch (error) {
        next(error);
    }
};