const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },

    description: String,

    skillsRequired: [String],

    certsRequired: [String],

    postedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }


}, {
    timestamps: true
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;