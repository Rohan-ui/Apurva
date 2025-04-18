const Sitemap = require('../model/mysitemap');

// @desc    Get all sitemap entries
// @route   GET /api/mysitemap/get
// @access  Public
const getAllSitemaps = async (req, res) => {
    try {
      const sitemaps = await Sitemap.find(); // Should return an array
      res.json(sitemaps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sitemaps" });
    }
  }

module.exports = {
    getAllSitemaps,
};
