const Url = require("../models/Url");
const shortid = require("shortid");

// Create Short URL
const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortCode = shortid.generate();

    await Url.create({
      originalUrl,
      shortCode,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Short URL Created Successfully",
      shortCode,
      shortUrl: `https://urlify-backend-poojana.onrender.com/${shortCode}`,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Redirect URL
const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "URL Not Found",
      });
    }

    // Update Analytics
    url.clicks += 1;
    url.lastVisited = new Date();

    await url.save();

    return res.redirect(url.originalUrl);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User URLs
const getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(urls);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete URL
const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        message: "URL Not Found",
      });
    }

    if (url.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await url.deleteOne();

    res.status(200).json({
      message: "URL Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// URL Analytics
const getAnalytics = async (req, res) => {
  try {
    const urls = await Url.find({
      user: req.user.id,
    });

    const totalUrls = urls.length;

    const totalClicks = urls.reduce(
      (sum, url) => sum + url.clicks,
      0
    );

    res.status(200).json({
      totalUrls,
      totalClicks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getUserUrls,
  deleteUrl,
  getAnalytics,
};