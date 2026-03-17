const express = require('express');
const router = express.Router();
const Speaker = require('../models/Speaker');
const authMiddleware = require('../middleware/auth');

// GET /api/speakers - Get all speakers (filter by isVisible if public=true query param)
router.get('/', async (req, res) => {
  try {
    const isPublic = req.query.public === 'true';
    const query = isPublic ? { isVisible: true } : {};
    const speakers = await Speaker.find(query).sort({ order: 1 });
    res.json(speakers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/speakers - Create a new speaker
router.post('/', authMiddleware, async (req, res) => {
  try {
    const speaker = new Speaker(req.body);
    await speaker.save();
    res.status(201).json(speaker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/speakers/:id - Update a speaker
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!speaker) {
      return res.status(404).json({ error: 'Speaker not found' });
    }
    res.json(speaker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/speakers/:id - Delete a speaker
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!speaker) {
      return res.status(404).json({ error: 'Speaker not found' });
    }
    res.json({ message: 'Speaker deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
