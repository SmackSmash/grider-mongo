const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://sandbox-downstairs:sandbox-password@sandbox-downstairs-1zqpn.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useFindAndModify: false }
);

before(done => {
  mongoose.connection.once('open', () => done()).on('error', error => console.log(error.message));
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  const collectionsArray = collections.map(collection => collection.name);
  collectionsArray.forEach(collection => mongoose.connection.collection(collection).drop());
});
