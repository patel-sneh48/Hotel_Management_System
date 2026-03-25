const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { protect } = require('../middleware/auth');

// Create a new table reservation
router.post('/', protect, async (req, res) => {
    try {
        const { guestName, email, date, time, guests, tableNumber } = req.body;

        if (!guestName || !email || !date || !time || !guests || !tableNumber) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const reservation = new Reservation({
            userId: req.user._id,
            guestName,
            email,
            date,
            time,
            guests,
            tableNumber
        });

        const savedReservation = await reservation.save();
        res.status(201).json({ success: true, reservation: savedReservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all reservations for the logged-in user
router.get('/my-reservations', protect, async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.user._id }).sort({ date: -1, time: -1 });
        res.status(200).json({ success: true, reservations });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
