const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  getUserUrls,
  deleteUrl,
  getAnalytics
} = require("../controllers/urlController");

const protect = require("../middleware/authMiddleware");

// Create Short URL
router.post("/shorten", protect, createShortUrl);


// Get All URLs of Logged-in User
router.get("/myurls", protect, getUserUrls);
router.get("/analytics", protect, getAnalytics);

// Delete URL
router.delete("/:id", protect, deleteUrl);

module.exports = router;