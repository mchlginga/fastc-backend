const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.post("/test", async (req, res) => {
    try {
        const newUser = new User ({
            name: "kel",
            email: "kel@gmail.com",
            password: "123456",
            skills: ["welder"]
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error creating user account:", error);
    }
});


module.exports = router;