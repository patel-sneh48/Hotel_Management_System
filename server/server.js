require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const roomServiceRoutes = require('./routes/roomService');
const reservationRoutes = require('./routes/reservations');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/room-service', roomServiceRoutes);
app.use('/api/reservations', reservationRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
