const express = require('express');
const router = express.Router();
const path = require('path');

// Route to download images
router.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../images', filename);

    res.download(filePath, (err) => {
        if (err) {
            console.error('File download failed:', err);

            // Check if headers are already sent before sending a response
            if (!res.headersSent) {
                res.status(500).json({ message: 'File download failed' });
            }
        }
    });
});

// Route to download videos
router.get('/video/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../videos', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('File streaming failed:', err);

            if (!res.headersSent) {
                res.status(500).json({ message: 'File streaming failed' });
            }
        }
    });
});

module.exports = router;
