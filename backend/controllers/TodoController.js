const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new reservation
router.post('/', async (req, res) => {
  const reservation = new Reservation({
    roomNumber: req.body.roomNumber,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a reservation
router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.roomNumber = req.body.roomNumber;
    reservation.checkInDate = req.body.checkInDate;
    reservation.checkOutDate = req.body.checkOutDate;

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a reservation
// Existing imports and configuration...

// Delete a reservation
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting reservation with ID:', req.params.id);
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      console.log('Reservation not found');
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await reservation.remove();
    console.log('Reservation deleted successfully');
    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    console.error('Error deleting reservation:', err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
