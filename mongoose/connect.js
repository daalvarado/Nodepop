'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
  console.log('Connection error:', err);
  process.exit(1);
});

conn.once('open', () => {
  console.log('Connected to Mongoose on', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost/nodepop');

module.exports = {mongoose};