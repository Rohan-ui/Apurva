const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');
const cron = require('node-cron');
const { exportAndBackupAllCollectionsmonthly } = require("./controller/Backup")
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
 
app.use(cookieParser());
 

cron.schedule('59 23 31 * *', () => {

    exportAndBackupAllCollectionsmonthly();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

// Static file serving
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.DATABASE_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Use routes
app.use('/api/product', require('./routes/product'));
app.use('/api/news', require('./routes/news'));
app.use('/api/pageHeading', require('./routes/pageHeading'));
app.use('/api/image', require('./routes/image'));
app.use('/api/staff', require('./routes/ourStaff'));
app.use('/api/banner', require('./routes/Banner'));
app.use('/api/aboutus', require('./routes/abotus'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/password', require('./routes/forgotpassword'));
app.use('/api/email', require('./routes/email'));
app.use('/api/logo', require('./routes/logo'));
app.use('/api/backup', require('./routes/backup'));
app.use('/api/counter', require('./routes/counter'));
app.use('/api/inquiries', require('./routes/inquiry'));
app.use('/api/mission', require('./routes/mission'));
app.use('/api/vision', require('./routes/vision'));
app.use('/api/footer', require('./routes/footer'));
app.use('/api/header', require('./routes/header'));
app.use('/api/googlesettings', require('./routes/googlesettings'));
app.use('/api/menulisting', require('./routes/menulisting'));
app.use('/api/sitemap', require('./routes/sitemap'));
app.use('/api/productDetail', require('./routes/productdetail'));
app.use('/api/productInquiry', require('./routes/productinquiry'));
app.use('/api/colors', require('./routes/managecolor'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/WhyChooseUs', require('./routes/whyChooseUs'));
app.use('/api/ourpeople', require('./routes/ourpeople'));
app.use('/api/packagingdetail', require('./routes/packagingdetail'));
app.use('/api/packagingtype', require('./routes/packagingtype'));
app.use('/api/dynamicSlug', require('./routes/dynamicSlug'));
app.use('/api/industry', require('./routes/industry'));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const port = process.env.PORT || 3006;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
