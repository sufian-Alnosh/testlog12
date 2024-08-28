const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// اتصال بقاعدة البيانات MongoDB
mongoose.connect('mongodb://localhost/visitors', { useNewUrlParser: true, useUnifiedTopology: true });

const visitorSchema = new mongoose.Schema({
    ip: String,
    device: String,
    browser: String,
    time: Date
});

const Visitor = mongoose.model('Visitor', visitorSchema);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// عرض الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// عرض صفحة معلومات الزائر
app.get('/visitor-data', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'visitor-data.html'));
});

// حفظ بيانات الزائر في قاعدة البيانات
app.get('/visitor-info', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const response = await axios.get(`https://ipinfo.io/${ip}?token=YOUR_TOKEN`);

        const newVisitor = new Visitor({
            ip: response.data.ip,
            device: userAgent,  // يمكنك تحليل userAgent للحصول على تفاصيل محددة
            browser: userAgent,
            time: new Date()
        });

        await newVisitor.save();
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching visitor info' });
    }
});

// عرض جميع الزوار
app.get('/all-visitors', async (req, res) => {
    const visitors = await Visitor.find({});
    res.json(visitors);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
