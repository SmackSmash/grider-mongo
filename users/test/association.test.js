const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('associating records', () => {
  let user, blogPost, comment;

  beforeEach(done => {
    // Set up documents
    user = new User({
      name: 'test user'
    });
    blogPost = new BlogPost({
      title: 'test title',
      content: 'test post content'
    });
    comment = new Comment({
      content: 'test comment content'
    });

    // Set up associations
    user.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = user;

    // Save to DB
    Promise.all([user.save(), blogPost.save(), comment.save()]).then(() => done());
  });

  it('saves a relation between a user and a blog post', async () => {
    const result = await User.findOne({ name: 'test user' }).populate('blogPosts');
    console.log(result.blogPosts[0]);
    assert(result.blogPosts[0].title === 'test title');
  });
});
