const mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log('Successfully connected to database');
}).catch(() => {
  console.log('Failed to connect to database');
});