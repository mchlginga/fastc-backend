const Job = require("../models/job");
const { statusCodes } = require("../utils/index");

// create job
exports.createJob = async (req, res, next) => {
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

// get all jobs
exports.getAllJobs = async (req, res, next) => {
    try {
        const job = await Job.find().populate("postedBy", "name");
        res.status(statusCodes.OK).json(job);
    } catch (error) {
        next(error);
    }
};

// get job by id
exports.getJobById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id).populate("postedBy", "name");

        if (!job) {
            return res.status(statusCodes.NOT_FOUND).json({ message: "Job not found." });
        }

        res.status(statusCodes.OK).json(job);
    } catch (error) {
        next(error);
    }
};

// update job by id
exports.updateJobById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Job.findByIdAndUpdate(
            id, 
            req.body,
            { new: true, runValidators: true }
        );

        res.status(statusCodes.OK).json(job);
    } catch (error) {
        next(error);
    }
};