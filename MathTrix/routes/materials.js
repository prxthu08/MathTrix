const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { auth, isTeacher } = require('../middleware/auth');
const StudyMaterial = require('../models/StudyMaterial');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Upload new study material (teachers only)
router.post('/upload', auth, isTeacher, upload.single('file'), async (req, res) => {
  try {
    const { title, description, subject, tags } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;
    const fileType = path.extname(req.file.originalname);

    const material = new StudyMaterial({
      title,
      description,
      subject,
      fileUrl,
      fileType,
      uploadedBy: req.user._id,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all study materials
router.get('/', auth, async (req, res) => {
  try {
    const materials = await StudyMaterial.find()
      .populate('uploadedBy', 'username')
      .sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get study materials by subject
router.get('/subject/:subject', auth, async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ subject: req.params.subject })
      .populate('uploadedBy', 'username')
      .sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete study material (teachers only)
router.delete('/:id', auth, isTeacher, async (req, res) => {
  try {
    const material = await StudyMaterial.findOneAndDelete({
      _id: req.params.id,
      uploadedBy: req.user._id
    });

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 