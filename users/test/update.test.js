const assert = require('assert');
const User = require('../src/user');

describe('updating records', () => {
  let user;

  beforeEach(done => {
    user = new User({
      name: 'test'
    });
    user.save().then(() => done());
  });

  const assertName = (operation, done) => {
    operation.then(() => {
      User.find().then(result => {
        assert(result.length === 1);
        assert(result[0].name === 'testicles');
        done();
      });
    });
  };

  const assertPostCount = (operation, done) => {
    operation.then(() => {
      User.find().then(result => {
        assert(result.length === 1);
        assert(result[0].postCount === 1);
        done();
      });
    });
  };

  it('instance set and save', done => {
    user.name = 'testicles';
    assertName(user.save(), done);
  });

  it('updates mode instance', done => {
    assertName(user.updateOne({ name: 'testicles' }), done);
  });

  it('model class can update', done => {
    assertName(User.updateMany({ name: 'test' }, { name: 'testicles' }), done);
  });

  it('model class can update one record', done => {
    assertName(User.findOneAndUpdate({ name: 'test' }, { name: 'testicles' }), done);
  });

  it('model class can find by ID and update', done => {
    assertName(User.findByIdAndUpdate(user.id, { name: 'testicles' }), done);
  });

  it('a user can have their post count incremented', done => {
    assertPostCount(User.updateMany({ name: 'test' }, { $inc: { postCount: 1 } }), done);
  });
});
