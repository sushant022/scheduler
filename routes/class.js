const express = require('express');
const Class = require('../models/Class');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create Class (Admin/Teacher only)
router.post('/create', authMiddleware, async (req, res) => {
  const { title, description, teacher, timeSlot } = req.body;

  try {
    const newClass = new Class({ title, description, teacher, timeSlot });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all Classes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher students');
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in a class (Student)
router.post('/:classId/enroll', authMiddleware, async (req, res) => {
  const { classId } = req.params;
  const userId = req.user.userId;

  try {
    const classData = await Class.findById(classId);
    if (!classData) return res.status(404).json({ message: 'Class not found' });

    // Check if already enrolled
    if (classData.students.includes(userId)) return res.status(400).json({ message: 'Already enrolled' });

    classData.students.push(userId);
    await classData.save();
    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
