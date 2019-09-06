const mongoose = require('mongoose');

module.exports = User = mongoose.model(
  'user',
  new mongoose.Schema({
    name: String,
    postCount: {
      type: Number,
      default: 0
    }
  })
);
