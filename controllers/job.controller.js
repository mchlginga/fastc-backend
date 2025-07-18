const Job = require("../models/job");
const { statusCodes } = require("../utils/index");

// create job
exports.jobCreate = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const job = await Job.create({
            ...req.body,
            postedBy: userId
        });

        res.status(statusCodes.CREATED).json(job);
    } catch (error) {
        next(error);
    }
};