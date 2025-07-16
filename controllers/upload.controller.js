const User = require("../models/user");
const { statusCodes } = require("../utils/index");

exports.uploadProfilePic = async (req, res, next) => {
    try {
        const userId = req.user.id;

        if (!req.file) {
            return res.status(statusCodes.NOT_FOUND).json({ message: "No file uploaded."});
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { profilePic: req.file.filename },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(statusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};