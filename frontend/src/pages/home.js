import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";

export default function ReservationSystem() {
  const [reservations, setReservations] = useState([]);
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [editingReservationId, setEditingReservationId] = useState(null);
  
  useEffect(() => {
    fetchReservations();
  }, []);
 
  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:3001/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateReservation = async () => {
    try {
      await axios.post('http://localhost:3001/reservations', { roomNumber, checkInDate, checkOutDate });
      fetchReservations();
      setRoomNumber('');
      setCheckInDate('');
      setCheckOutDate('');
      alert('Reservation created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create reservation');
    }
  };

  const handleEditReservation = (reservationId) => {
    setEditingReservationId(reservationId);
    const reservationToEdit = reservations.find(reservation => reservation._id === reservationId);
    if (reservationToEdit) {
      setRoomNumber(reservationToEdit.roomNumber);
      setCheckInDate(reservationToEdit.checkInDate.split('T')[0]); // Format date properly
      setCheckOutDate(reservationToEdit.checkOutDate.split('T')[0]); // Format date properly
    }
  };

  const handleUpdateReservation = async () => {
    try {
      await axios.put(`http://localhost:3001/reservations/${editingReservationId}`, { roomNumber, checkInDate, checkOutDate });
      fetchReservations();
      setEditingReservationId(null);
      setRoomNumber('');
      setCheckInDate('');
      setCheckOutDate('');
      alert('Reservation updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update reservation');
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      console.log('Attempting to delete reservation with ID:', reservationId);
      await axios.delete(`http://localhost:3001/reservations/${reservationId}`);
      console.log('Reservation deleted successfully');
      fetchReservations(); // Update reservations after deletion
      alert('Reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete reservation');
    }
  };
  
  

  return (
    <div className='container'>
      <h1>Hotel Reservation System</h1> 
      <form>
        <div>
          <label>Room Number</label>
          <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} /><br />
        </div>
        <div>
          <label>Check-in Date</label>
          <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} /><br />
        </div>
        <div>
          <label>Check-out Date</label>
          <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} /><br />
          {editingReservationId ? (
            <button type="button" onClick={handleUpdateReservation}>Update Reservation</button>
          ) : (
            <button type="button" onClick={handleCreateReservation}>Create Reservation</button>
          )}
        </div>
      </form>
      <div>
        {reservations.map(reservation => (
          <div key={reservation._id}>
            <p>Room Number: {reservation.roomNumber}</p>
            <p>Check-in Date: {new Date(reservation.checkInDate).toLocaleDateString()}</p>
            <p>Check-out Date: {new Date(reservation.checkOutDate).toLocaleDateString()}</p>
            <button className='edit' onClick={() => handleEditReservation(reservation._id)}>Edit</button>
            <button className='delete' onClick={() => handleDeleteReservation(reservation._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
