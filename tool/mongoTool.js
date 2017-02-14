const mogoose = require('mongoose');
const refreshMongo = require('./refreshMongo');

mogoose.connect('mongodb://localhost/supermarket', (err) => {
  if (err) {
    console.log('connect error');
  } else {
    console.log('connect success');
  }
});

refreshMongo(() => {
  process.exit(0);
});