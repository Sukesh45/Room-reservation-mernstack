const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const reservationRoutes = require('./routes/ReservationRouter');

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log(err));

app.use('/reservations', reservationRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
