const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  redirectUrl,
  getUserUrls,
  deleteUrl,
  getAnalytics,
} = require("../controllers/urlController");

const protect = require("../middleware/authMiddleware");

// Create Short URL
router.post("/shorten", protect, createShortUrl);

// Get User URLs
router.get("/myurls", protect, getUserUrls);

// Analytics
router.get("/analytics", protect, getAnalytics);

// Delete URL
router.delete("/:id", protect, deleteUrl);

// Redirect URL
router.get("/:shortCode", redirectUrl);

module.exports = router;