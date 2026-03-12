const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// Create a new booking (protected — requires login)
router.post('/', protect, async (req, res) => {
    try {
        const { guestName, email, phone, roomId, roomTitle, checkIn, checkOut, totalAmount, paymentMethod } = req.body;

        const booking = new Booking({
            userId: req.user._id,  // Link booking to logged-in user
            guestName,
            email,
            phone,
            roomId,
            roomTitle,
            checkIn,
            checkOut,
            totalAmount,
            paymentMethod,
            paymentStatus: 'success'
        });

        const savedBooking = await booking.save();
        res.status(201).json({ success: true, bookingId: savedBooking._id });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ success: false, message: 'Server error while creating booking' });
    }
});

// Get all bookings for the logged-in user
router.get('/my-bookings', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching bookings' });
    }
});

// Get booking details by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, booking });
    } catch (error) {
        console.error('Error fetching booking details:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching booking details' });
    }
});

module.exports = router;
