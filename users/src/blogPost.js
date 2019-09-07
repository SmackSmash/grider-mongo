const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const BlogPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: String,
  content: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
});

module.exports = BlogPost = mongoose.model('blogpost', BlogPostSchema);
