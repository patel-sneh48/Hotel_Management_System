const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'PLACEHOLDER_CLIENT_ID');

// Generate JWT Helper
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// @desc    Authenticate with Google
// @route   POST /api/auth/google
// @access  Public
router.post('/google', async (req, res) => {
    try {
        const { credential } = req.body;

        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            // audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        // Look for existing user
        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user if not exists
            // Using a ranom secure password for google users since they sign in via SSO
            const secureRandomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
            user = await User.create({
                name,
                email,
                password: secureRandomPassword,
                googleId: googleId
            });
        } else if (!user.googleId) {
            // Link google account to existing email user
            user.googleId = googleId;
            await user.save();
        }

        res.json({
            success: true,
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ success: false, message: 'Google authentication failed' });
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        // req.user is set in protect middleware
        res.status(200).json({
            success: true,
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching user profile' });
    }
});

module.exports = router;
