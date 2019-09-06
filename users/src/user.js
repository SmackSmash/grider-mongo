const mongoose = require('mongoose');

module.exports = User = mongoose.model(
  'user',
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      validate: {
        validator: name => {
          return name.length > 2;
        },
        message: 'Name must be longer than 2 characters'
      }
    },
    postCount: {
      type: Number,
      default: 0
    },
    posts: [
      new mongoose.Schema({
        title: String
      })
    ]
  })
);
