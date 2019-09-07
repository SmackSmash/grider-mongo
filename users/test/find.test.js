const assert = require('assert');
const User = require('../src/user');

describe('find user', () => {
  let user1, user2, user3, user4;

  beforeEach(async () => {
    user1 = new User({ name: 'user 1' });
    user2 = new User({ name: 'user 2' });
    user3 = new User({ name: 'user 3' });
    user4 = new User({ name: 'user 4' });
    await Promise.all([user1.save(), user2.save(), user3.save(), user4.save()]);
  });

  it('finds a user by name', async () => {
    const fetchedUser = await User.findOne({ name: 'user 1' });
    assert(fetchedUser.name === 'user 1');
  });

  it('finds a user by id', async () => {
    const fetchedUser = await User.findById(user1.id);
    assert(fetchedUser.id === user1.id);
  });

  it('can skip and limit the result set', async () => {
    const users = await User.find()
      .sort({ name: 'asc' })
      .skip(1)
      .limit(2);
    console.log(users);
    assert(users.length === 2);
  });
});
