const assert = require('assert');
const User = require('../src/user');

describe('delete user', () => {
  let user;

  beforeEach(done => {
    user = new User({
      name: 'test'
    });
    user.save().then(() => done());
  });

  it('deletes a user by ID', done => {
    User.findByIdAndDelete(user.id).then(() => {
      User.findById(user.id).then(result => {
        assert(result === null);
        done();
      });
    });
  });
  // Can also use findAndRemove to delete a set of data
  // Can also use findOneAndRemove to delete a single record according to certain criterea
  // Can also use user.remove() to a specific instance of the User class
});
