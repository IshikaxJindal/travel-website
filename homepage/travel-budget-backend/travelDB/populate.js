// populate.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Destination = require("./models/Destination");

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const sampleDestinations = [
    { name: "Hawaii", averageCost: 200, type: "beach" },
    { name: "Bali", averageCost: 100, type: "beach" },
    { name: "Swiss Alps", averageCost: 250, type: "mountain" },
    { name: "Rocky Mountains", averageCost: 150, type: "mountain" },
    { name: "Paris", averageCost: 220, type: "city" },
    { name: "New York", averageCost: 180, type: "city" },
];

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to MongoDB. Populating database...");
        await Destination.insertMany(sampleDestinations);
        console.log("Database populated successfully");
        mongoose.disconnect();
    })
    .catch((error) => console.log("Database connection error:", error));
