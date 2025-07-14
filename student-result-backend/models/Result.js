// backend/models/Result.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: String,
  marks: Number,
});

const resultSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  year: String, // FE/SE/TE/BE
  branch: String,
  subjects: [subjectSchema],
  password: String,
});

module.exports = mongoose.model('Result', resultSchema);
