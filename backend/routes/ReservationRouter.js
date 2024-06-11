const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Authentication middleware function
const authenticateUser = (req, res, next) => {
  // Implement your authentication logic here
  // For example, you can check if the user is logged in or if they have a valid token
  // If authentication fails, you can send an error response or redirect them to the login page
  // If authentication succeeds, call next() to proceed to the next middleware
  next();
};

// Authorization middleware function
const authorizeUser = (req, res, next) => {
  // Implement your authorization logic here
  // Check if the user is authorized to perform the requested action
  // For example, you can check if the user is the owner of the reservation or has admin privileges
  // If authorized, call next() to proceed to the next middleware
  // If not authorized, send an error response
  next();
};

// Get all reservations
router.get('/', authenticateUser, async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new reservation
router.post('/', authenticateUser, async (req, res) => {
  // Add authorization middleware to restrict access to authenticated users
  // Optionally, you can also add additional authorization logic to check if the user has permission to create a reservation
  try {
    const reservation = new Reservation({
      roomNumber: req.body.roomNumber,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
    });
  
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a reservation
router.put('/:id', authenticateUser, authorizeUser, async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a reservation
router.delete('/:id', authenticateUser, authorizeUser, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    await reservation.remove();
    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
