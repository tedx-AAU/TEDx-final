const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); 
const jwt = require('jsonwebtoken');


router.get('/tickets-verify', async (req, res) => {
  try {
    res.json({ message: 'Token is valid' });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
// (Login)
router.post('/tickets-login', async (req, res) => {
  const { username, password } = req.body;
  console.log("login by ticket name", username);

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log("user not found");
      return res.status(401).json({ error: 'User not found' });
    }

    
    const token = jwt.sign(
      { id: admin._id, role: admin.role }, 
      process.env.JWT_SECRET || 'secret123', 
      { expiresIn: '1d' }
    );

    console.log("suc", username);
    
    return res.json({
      success: true,
      token,
      admin: { id: admin._id, username: admin.username, role: admin.role }
    });

  } catch (err) {
    console.error("error", err.message);
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
});

module.exports = router;