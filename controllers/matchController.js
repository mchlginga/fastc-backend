const {
    // findMatchingJobsForTrainee, 
    findMatchingTraineesForJob 
} = require("../services/match");

const { statusCodes } = require("../utils/index");

// get trainees that matched to job
exports.getTraineesMatchToJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        const matches = await findMatchingTraineesForJob(jobId);

        res.status(statusCodes.OK).json(matches);
    } catch (error) {
        next(error);
    }
};

// get job that matched to trainees
/* exports.getJobMatchToTrainee = async (req, res, next) => {
    try {
        const traineeId = req.params;

        const matches = await findMatchingJobsForTrainee(traineeId);

        res.status(statusCodes.OK).json(matches);
    } catch (error) {
        next(error);
    }
}; */