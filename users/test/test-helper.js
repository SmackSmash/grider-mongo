const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://sandbox-downstairs:sandbox-password@sandbox-downstairs-1zqpn.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

before(done => {
  mongoose.connection.once('open', () => done()).on('error', error => console.log(error.message));
});

beforeEach(done => {
  mongoose.connection.collection('users').drop(() => done());
});

afterEach(done => {
  mongoose.connection.collection('users').drop(() => done());
});
