const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Result = require('../models/Result');

// ✅ ADD RESULT with hashed password
router.post('/add', async (req, res) => {
  const { name, rollNumber, year, branch, subjects, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 🔒 Hash the password

    const result = new Result({
      name,
      rollNumber,
      year,
      branch,
      subjects,
      password: hashedPassword, // store hashed password
    });

    await result.save();
    res.status(201).json({ message: 'Result added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ LOGIN with hashed password comparison
router.post('/login', async (req, res) => {
  const { rollNumber, password } = req.body;
  console.log('Login request received:', rollNumber); // Debug log

  try {
    const student = await Result.findOne({ rollNumber });

    if (!student) return res.status(404).json({ message: 'Student not found' });

    const isMatch = await bcrypt.compare(password, student.password); // compare hashed
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    res.json({ message: 'Login successful', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET result by roll number
router.get('/:rollNumber', async (req, res) => {
  try {
    const result = await Result.findOne({ rollNumber: req.params.rollNumber });
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
