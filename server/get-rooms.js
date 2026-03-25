const mongoose = require('mongoose');
require('dotenv').config();

const roomSchema = new mongoose.Schema({
    title: String,
    price: Number
});

const Room = mongoose.model('Room', roomSchema);

async function getRooms() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const rooms = await Room.find({}, 'title _id');
        console.log('ROOM_START');
        console.log(JSON.stringify(rooms));
        console.log('ROOM_END');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

getRooms();
