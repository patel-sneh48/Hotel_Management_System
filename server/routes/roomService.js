const express = require('express');
const router = express.Router();
const RoomServiceOrder = require('../models/RoomServiceOrder');
const { protect } = require('../middleware/auth');

// Create a new room service order
router.post('/', protect, async (req, res) => {
    try {
        const { guestName, roomNumber, items, totalAmount } = req.body;

        const newOrder = new RoomServiceOrder({
            userId: req.user._id,
            guestName,
            roomNumber,
            items,
            totalAmount
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        console.error('Error creating room service order:', error);
        res.status(500).json({ success: false, message: 'Server error creating order' });
    }
});

// Get user's room service order history
router.get('/my-history', protect, async (req, res) => {
    try {
        const history = await RoomServiceOrder.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, history });
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ success: false, message: 'Server error fetching history' });
    }
});

// Cancel a room service order (within 5 minutes)
router.delete('/:id', protect, async (req, res) => {
    try {
        const order = await RoomServiceOrder.findOne({ _id: req.params.id, userId: req.user._id });
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        const fiveMinutes = 5 * 60 * 1000;
        if (Date.now() - new Date(order.createdAt).getTime() > fiveMinutes) {
            return res.status(400).json({ success: false, message: 'Cancellation window has expired' });
        }

        await RoomServiceOrder.deleteOne({ _id: req.params.id });
        res.json({ success: true, message: 'Order cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ success: false, message: 'Server error cancelling order' });
    }
});

module.exports = router;
