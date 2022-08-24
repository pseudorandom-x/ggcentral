require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');

const dbUri = `mongodb://localhost:${ process.env.MONGO_PORT }/${ process.env.MONGO_DBNAME }`;

const mongoInit = async function () {
  await mongoose.connect(dbUri)
    .then(() => {
      console.log('Connected to database on port.');
    })
    .catch(err => {
      console.log(err);
      return;
    });
};

module.exports = mongoInit;