const mongoose = require('mongoose');
const { initGridFS } = require('../util/gridfs');

module.exports = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/deathnotices2';

  await mongoose.connect(MONGO_URI);
  initGridFS();

  console.log('*** CONNECTED TO MONGODB ***');
};

