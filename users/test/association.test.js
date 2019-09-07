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
    const user = await User.findOne({ name: 'test user' }).populate('blogPosts');
    assert(user.blogPosts[0].title === 'test title');
  });

  it('saves a full relation graph', async () => {
    //Recursive populating of fields
    const user = await User.findOne({ name: 'test user' }).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        populate: 'user'
      }
    });
    assert(user.blogPosts[0].comments[0].user.name === 'test user');
  });

  it("removes a user's blogPosts via middleware when a user is removed", async () => {
    const user = await User.findOne({ name: 'test user' });
    // MUST USE .REMOVE() ON THE INSTANCE RATHER THAN USING A CLASS METHOD, OTHERWISE PRE 'REMOVE' MIDDLEWARE WILL NOT RUN!
    await user.remove();
    const postCount = await BlogPost.countDocuments();
    assert(postCount === 0);
  });
});
