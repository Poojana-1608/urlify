const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { redirectUrl } = require("./controllers/urlController");


// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("URL Shortener API is Running");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server Only After DB Connection
(async () => {
  try {
    await connectDB();
    app.get("/:shortCode", redirectUrl);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
  }
})();