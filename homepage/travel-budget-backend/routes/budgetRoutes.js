// routes/budgetRoutes.js
const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// POST /api/budget/analyze
router.post("/analyze", async (req, res) => {
    const { budget, duration, type } = req.body;
    const maxDailyCost = budget / duration;

    try {
        // Query destinations within the daily cost and matching type
        const destinations = await Destination.find({
            averageCost: { $lte: maxDailyCost },
            type: type,
        });

        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
