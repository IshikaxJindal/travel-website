// server.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const budgetRoutes = require("./routes/budgetRoutes");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/budget", budgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
