const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("📥 Login attempt:", email, password); // Add this log

  const admin = await Admin.findOne({ email });

  if (!admin) {
    console.log("❌ Admin not found");
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (admin.password !== password) {
    console.log("❌ Password mismatch");
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  console.log("✅ Admin login successful:", email);
  res.json({ message: 'Admin login successful' });
});

module.exports = router;
