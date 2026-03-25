const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// Check availability for a room type and date range
router.get('/check-availability', async (req, res) => {
    try {
        const { roomTitle, checkIn, checkOut } = req.query;

        if (!roomTitle || !checkIn || !checkOut) {
            return res.status(400).json({ success: false, message: 'Missing required parameters' });
        }

        const ROOM_NUMBERS = {
            'Deluxe Ocean View': ['101', '102', '103', '104', '105'],
            'Executive Suite': ['201', '202', '203', '204', '205'],
            'Cozy Family Room': ['301', '302', '303', '304', '305']
        };

        const availableRoomNumbers = ROOM_NUMBERS[roomTitle] || ['501', '502', '503'];

        const overlappingBookings = await Booking.find({
            roomTitle,
            checkIn: { $lt: new Date(checkOut) },
            checkOut: { $gt: new Date(checkIn) }
        });

        const takenRooms = overlappingBookings.map(b => b.roomNumber);
        const freeRoom = availableRoomNumbers.find(num => !takenRooms.includes(num));

        res.status(200).json({ 
            success: true, 
            available: !!freeRoom,
            message: freeRoom ? 'Room is available' : `All rooms of type "${roomTitle}" are booked for these dates.`
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Create a new booking (protected — requires login)
router.post('/', protect, async (req, res) => {
    try {
        const { guestName, email, phone, roomId, roomTitle, checkIn, checkOut, checkInTime, checkOutTime, totalAmount, paymentMethod } = req.body;

        // Define room numbers for each type
        const ROOM_NUMBERS = {
            'Deluxe Ocean View': ['101', '102', '103', '104', '105'],
            'Executive Suite': ['201', '202', '203', '204', '205'],
            'Cozy Family Room': ['301', '302', '303', '304', '305']
        };

        const availableRoomNumbers = ROOM_NUMBERS[roomTitle] || ['501', '502', '503']; // Fallback

        // Check for overlapping bookings for this room title
        // A booking overlaps if: requestedCheckIn < existingCheckOut AND requestedCheckOut > existingCheckIn
        const overlappingBookings = await Booking.find({
            roomTitle,
            checkIn: { $lt: new Date(checkOut) },
            checkOut: { $gt: new Date(checkIn) }
        });

        // Find which room numbers are already taken
        const takenRooms = overlappingBookings.map(b => b.roomNumber);
        
        // Find the first available room number
        const roomNumber = availableRoomNumbers.find(num => !takenRooms.includes(num));

        if (!roomNumber) {
            return res.status(400).json({ 
                success: false, 
                message: `Sorry, all rooms of type "${roomTitle}" are already booked for these dates.` 
            });
        }

        const booking = new Booking({
            userId: req.user._id,  // Link booking to logged-in user
            guestName,
            email,
            phone,
            roomId,
            roomTitle,
            checkIn,
            checkInTime,
            checkOut,
            checkOutTime,
            totalAmount,
            paymentMethod,
            roomNumber,
            paymentStatus: 'success'
        });

        const savedBooking = await booking.save();
        res.status(201).json({ success: true, bookingId: savedBooking._id, roomNumber: savedBooking.roomNumber });
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
