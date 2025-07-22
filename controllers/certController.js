const User = require("../models/user");
const { statusCodes, generateCertificate } = require("../utils/index");


exports.generateCertificate = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(statusCodes.NOT_FOUND).json({ message: "User not found."});
        }

        const pdf = await generateCertificate({
            name: user.name,
            date: new Date().toLocaleDateString()
        });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${user.name}-certificate.pdf"`
        });

        res.send(pdf);

    } catch (error) {
        next(error);
    }
};