const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if this is an admin token (allow legacy tokens without userType)
    if (decoded.userType && decoded.userType !== 'admin') {
      return res
        .status(401)
        .json({ error: 'Invalid token type for admin access.' });
    }

    const admin = await Admin.findById(decoded.adminId).select('-password');

    if (!admin) {
      return res.status(401).json({ error: 'Invalid token. Admin not found.' });
    }

    // Verify the admin has the correct role
    if (admin.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Access denied. Invalid admin role.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);

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

    res.status(401).json({ error: 'Authentication failed.' });
  }
};

module.exports = authMiddleware;
