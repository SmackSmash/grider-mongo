const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {
  it('creates a post subdocument', done => {
    const user = new User({
      name: 'test',
      posts: [{ title: 'testing' }]
    });
    user.save().then(() => {
      User.findOne({ name: 'test' }).then(result => {
        assert(result.posts.length === 1);
        assert(result.posts[0].title === 'testing');
        done();
      });
    });
  });

  it('can add subdocuments to an existing record', done => {
    const user = new User({
      name: 'test',
      posts: []
    });
    user.save().then(() => {
      User.findOne({ name: 'test' }).then(result => {
        result.posts.push({ title: 'testing' });
        result.save().then(() => {
          User.findOne({ name: 'test' }).then(result => {
            assert(result.posts.length === 1);
            assert(result.posts[0].title === 'testing');
            done();
          });
        });
      });
    });
  });

  it('can remove an existing subdocument', done => {
    const user = new User({
      name: 'test',
      posts: [{ title: 'testing' }]
    });
    user.save().then(() => {
      User.findOne({ name: 'test' }).then(result => {
        const postIndex = result.posts.findIndex(post => post.title === 'testing');
        result.posts[postIndex].remove();
        result.save().then(() => {
          User.findOne({ name: 'test' }).then(result => {
            assert(result.posts.length === 0);
            done();
          });
        });
      });
    });
  });
});
