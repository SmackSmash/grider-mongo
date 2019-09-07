const assert = require('assert');
const User = require('../src/user');

describe('virtual types', () => {
  it('postCount returns number of posts', async () => {
    const user = new User({
      name: 'test',
      posts: [{ title: 'testing' }]
    });
    await user.save();
    const result = await User.findOne({ name: 'test' });
    assert(result.postCount === 1);
  });
});
