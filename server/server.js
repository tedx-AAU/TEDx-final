const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const speakersRoutes = require('./routes/speakers');
const contactsRoutes = require('./routes/contacts');
const adminRoutes = require('./routes/admin');
const registrationRoutes = require('./routes/registration');

const app = express();
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use('/api/contacts', contactsRoutes);
app.use('/api/speakers', speakersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/registration', require('./routes/registration'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
