const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Contact Form Message from ${name}`,
            text: `From: ${name} ${email} ${message}`,
        });

        res.json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;