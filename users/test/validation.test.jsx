const assert = require('assert');
const User = require('../src/user');

describe('validating records', () => {
  it('requires a username', () => {
    const user = new User();
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required');
  });

  it('requires username to be at least 2 characters long', () => {
    const user = new User({
      name: 'te'
    });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('disallows invalid records from being saved', done => {
    const user = new User({
      name: 'te'
    });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 characters');
      done();
    });
  });
});
