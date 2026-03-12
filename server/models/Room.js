const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  amenities: [String],
  maxGuests: { type: Number, default: 2 }
});

module.exports = mongoose.model('Room', roomSchema);
