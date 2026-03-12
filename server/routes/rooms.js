const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get room by ID
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed rooms (temporary endpoint for setup)
router.post('/seed', async (req, res) => {
    try {
        const seedRooms = [
            {
                title: 'Deluxe Ocean View',
                description: 'Spectacular views of the ocean with modern amenities.',
                price: 250,
                imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
                amenities: ['Wifi', 'AC', 'Ocean View', 'Mini Bar'],
                maxGuests: 2
            },
            {
                title: 'Executive Suite',
                description: 'Spacious suite with private balcony and premium service.',
                price: 450,
                imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000',
                amenities: ['Wifi', 'AC', 'Living Area', 'Jacuzzi'],
                maxGuests: 4
            },
            {
                title: 'Cozy Family Room',
                description: 'Perfect for families, with two beds and kids area.',
                price: 300,
                imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1000',
                amenities: ['Wifi', 'AC', 'TV', 'Kids Corner'],
                maxGuests: 4
            }
        ];
        await Room.deleteMany({});
        const createdRooms = await Room.insertMany(seedRooms);
        res.json(createdRooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
