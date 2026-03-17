const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config();

// POST /api/admin/register - Register a new admin
// router.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Validate input
//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ error: 'Username and password are required' });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ error: 'Password must be at least 6 characters long' });
//     }

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ username });
//     if (existingAdmin) {
//       return res
//         .status(400)
//         .json({ error: 'Admin with this username already exists' });
//     }

//     // Hash password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create new admin
//     const admin = new Admin({
//       username,
//       password: hashedPassword,
//     });

//     await admin.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { adminId: admin._id, username: admin.username },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '24h' }
//     );

//     res.status(201).json({
//       message: 'Admin registered successfully',
//       token,
//       admin: {
//         id: admin._id,
//         username: admin.username,
//       },
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res
//       .status(500)
//       .json({ error: 'Internal server error during registration' });
//   }
// });

// POST /api/admin/login - Login admin
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if admin has the correct role
    if (admin.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Access denied. This account is not authorized for admin access.' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin._id, username: admin.username, userType: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// GET /api/admin/verify - Verify token (protected route)
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userType !== 'admin') {
      return res.status(401).json({ error: 'Invalid token type' });
    }

    const admin = await Admin.findById(decoded.adminId).select('-password');

    if (!admin) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Verify the admin has the correct role
    if (admin.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Access denied. Invalid admin role.' 
      });
    }

    res.json({
      message: 'Token is valid',
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token format.',
        code: 'INVALID_TOKEN',
      });
    }

    res.status(401).json({ error: 'Token verification failed.' });
  }
});

// POST /api/admin/tickets-login - Login ticket admin
router.post('/tickets-login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }

    const ticketsAdmin = await Admin.findOne({ username });
    if (!ticketsAdmin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if admin has the correct role
    if (ticketsAdmin.role !== 'ticketsAdmin') {
      return res.status(403).json({ 
        error: 'Access denied. This account is not authorized for ticket admin access.' 
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      ticketsAdmin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        ticketsAdminId: ticketsAdmin._id,
        username: ticketsAdmin.username,
        userType: 'ticketsAdmin',
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      ticketsAdmin: {
        id: ticketsAdmin._id,
        username: ticketsAdmin.username,
      },
    });
  } catch (error) {
    console.error('Ticket login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// GET /api/admin/tickets-verify - Verify ticket admin token (protected route)
router.get('/tickets-verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userType !== 'ticketsAdmin') {
      return res.status(401).json({ error: 'Invalid token type' });
    }

    const ticketsAdmin = await Admin.findById(decoded.ticketsAdminId).select(
      '-password'
    );

    if (!ticketsAdmin) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Verify the admin has the correct role
    if (ticketsAdmin.role !== 'ticketsAdmin') {
      return res.status(403).json({ 
        error: 'Access denied. Invalid ticket admin role.' 
      });
    }

    res.json({
      message: 'Token is valid',
      ticketsAdmin: {
        id: ticketsAdmin._id,
        username: ticketsAdmin.username,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token format.',
        code: 'INVALID_TOKEN',
      });
    }

    res.status(401).json({ error: 'Token verification failed.' });
  }
});

module.exports = router;
