const { normalizeArray } = require("../utils/index");
const Job = require("../models/job");
const User = require("../models/user");

const calculateMatchScore = (trainee, job) => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    let matchDetails = {
        skillsMatched: [],
        skillsMissing: [],
        certsMatched: [],
        certsMissing: [],
        hasValidCerts: true
    };

    // skills matching 60%
    const skillWeight = 0.4;
    if (job.skillsRequired && job.skillsRequired.length > 0) {
        maxPossibleScore += skillWeight * 100; // 0 = 0 + (0.6 * 100) = 60

        const traineeSkills = normalizeArray(trainee.skills);
        const requiredSkills = normalizeArray(job.skillsRequired);

        requiredSkills.forEach(reqSkill => {
            if (traineeSkills.includes(reqSkill)) {
                matchDetails.skillsMatched.push(reqSkill);
            } else {
                matchDetails.skillsMissing.push(reqSkill);
            }
        });

        const skillMatchPercentage = matchDetails.skillsMatched.length / requiredSkills.length;
        totalScore += skillWeight *  100 * skillMatchPercentage;
    }

    // cert matching 40%
    const certWeight = 0.6;
    if (job.certsRequired && job.certsRequired.length > 0) {
        maxPossibleScore += certWeight * 100; // 60 = 60 + (0.4 * 100) = 100

        const traineeCerts = trainee.certificates
        .filter( cert => {
            if (cert.expiresAt && new Date(cert.expiresAt) < new Date()) {
                return false;
            }
            return true;
        })
        .map(cert => cert.name.toLowerCase().trim());

        const requiredCerts = normalizeArray(job.certsRequired);

        requiredCerts.forEach(reqCerts => {
            if (traineeCerts.includes(reqCerts)) {
                matchDetails.certsMatched.push(reqCerts);
            } else {
                matchDetails.certsMissing.push(reqCerts);
            }
        });

        const certMatchPercentage = matchDetails.certsMatched.length / requiredCerts.length;
        totalScore += certWeight * 100 * certMatchPercentage; 

        matchDetails.hasValidCerts = matchDetails.certsMissing.length === 0 || matchDetails.certsMatched.length > 0;
    }

    const finalScore = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

    return {
        score: Math.round(finalScore * 100) / 100,
        matchDetails,
        isQualified: finalScore >= 70
    };

 };

//  match trainees for job
 const findMatchingTraineesForJob = async (jobId) => {
    try {
        const job = await Job.findById(jobId).populate("postedBy", "name email");

        if (!job) {
            throw new Error ("Job not found");
        }

        const trainees = await User.find({ role: "trainee" });

        const traineeMatches = trainees.map(trainee => {
            const matchResult = calculateMatchScore(trainee, job);
            return {
                candidate: {
                    _id: trainee._id,
                    name: trainee.name,
                    email: trainee.email,
                    skills: trainee.skills,
                    certificates: trainee.certificates,
                    profilePic: trainee.profilePic
                },
                ...matchResult
            }
        });
        return traineeMatches
            .sort( (a, b) => b.score - a.score)
            .filter(match => match.score > 0);
    } catch (error) {
        throw(error);
    }
 };

//  matching job for trainees
/* const findMatchingJobsForTrainee = async (traineeId) => {
    try {
        const trainee = await User.findById(traineeId);
        if (!trainee || trainee.role !== "trainee") {
            throw new Error ("Trainee not found.");
        }

        const jobs = await Job.find({}).populate("postedBy", "name email");

        const jobMatches = jobs.map(job => {
            const matchResult = calculateMatchScore(trainee, job);
            return {
                job: {
                    _id: job._id,
                    title: job.title,
                    description: job.description,
                    skillsRequired: job.skillsRequired,
                    certRequired: job.certsRequired,
                    postedBy: job.postedBy,
                    createdAt: job.createdAt
                },
                ...matchResult
            };
        });

        return jobMatches
            .sort( (a, b) => b.score - a.score)
            .filter(match => match.score > 0)
    } catch (error) {
        throw (error);
    }
}; */

module.exports = {
    calculateMatchScore,
    findMatchingTraineesForJob
    // findMatchingJobsForTrainee
};