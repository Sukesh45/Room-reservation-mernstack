const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);
