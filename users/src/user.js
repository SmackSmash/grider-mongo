const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
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
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogpost'
    }
  ],
  posts: [
    new Schema({
      title: String
    })
  ]
});

// Make sure not to use arrow function so this is correctly bound
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('save', () => {
  console.log('Saving user');
});

UserSchema.pre('remove', async function(next) {
  // Import already registered mongoose model
  const BlogPost = mongoose.model('blogpost');
  // MAKE SURE TO USE _ID HERE AS IT WILL OTHERWISE NOT BE COESRCED!
  await BlogPost.deleteMany({ _id: { $in: this.blogPosts } });
  next();
});

module.exports = User = mongoose.model('user', UserSchema);
