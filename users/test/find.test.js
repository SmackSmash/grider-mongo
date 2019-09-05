const assert = require('assert');
const User = require('../src/user');

describe('find user', () => {
  let user;

  beforeEach(done => {
    user = new User({
      name: 'test'
    });
    user.save().then(() => done());
  });

  it('finds a user by name', done => {
    User.findOne({ name: 'test' }).then(result => {
      assert(result.name === 'test');
      done();
    });
  });

  it('finds a user by id', done => {
    User.findById(user.id).then(result => {
      assert(result.id === user.id);
      done();
    });
  });
});
