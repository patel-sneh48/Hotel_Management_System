const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const users = await User.find({}).select('+password');
        console.log('Users in DB:');
        users.forEach(u => console.log(`- Email: ${u.email}, Name: ${u.name}, GoogleId: ${u.googleId}, Password Hash Length: ${u.password ? u.password.length : 0}`));
        process.exit(0);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
