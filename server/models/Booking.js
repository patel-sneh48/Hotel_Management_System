const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // optional for backward compatibility
    },
    guestName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    roomTitle: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkInTime: {
        type: String,
        required: false // requested by user
    },
    checkOut: {
        type: Date,
        required: true
    },
    checkOutTime: {
        type: String,
        required: false // requested by user
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    roomNumber: {
        type: String,
        required: false // assigned by system
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
