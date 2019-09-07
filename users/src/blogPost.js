const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: String,
  content: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
});

module.exports = BlogPost = mongoose.model('blogpost', BlogPostSchema);
