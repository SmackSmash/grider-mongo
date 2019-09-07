const assert = require('assert');
const User = require('../src/user');

describe('create user', () => {
  it('creates a new user', done => {
    const user = new User({
      name: 'test'
    });
    user.save().then(() => {
      assert(!user.isNew);
      done();
    });
  });
});
