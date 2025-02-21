// models/Destination.js
const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    averageCost: { type: Number, required: true },
    type: { type: String, required: true }, // e.g., "beach", "mountain", "city"
});

module.exports = mongoose.model("Destination", DestinationSchema);
