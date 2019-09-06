const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  likes: {
    type: Number,
    default: 0
  },
  posts: [
    new mongoose.Schema({
      title: String
    })
  ]
});

// Make sure not to use arrow function so this is correctly bound
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

module.exports = User = mongoose.model('user', UserSchema);
