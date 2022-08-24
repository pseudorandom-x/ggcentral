require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const dbName = 'person';
const dbPort = 27017;

// [1] connect to the 'alertsDB' database (make sure MongoDB is listening on specified port)
// creates one if it doesn't already exist
// mongoose.connect(`mongodb://localhost:${ dbPort }/animaldb`, () => {
//   console.log(`Connected to database. Listening on port ${ dbPort }`);
// });

// // [2] define the structure/schema of the new collection/table
// // to be inserted into the databse used when connecting to MongoDB
// const schema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// schema.methods.speak = function () {
//   console.log(`Hi, I am ${ this.name }`);
// }

// // [3] create a model/class off the schema
// const Animal = mongoose.model('Alert', schema);

// const bear = new Animal({
//   name: 'Rudra',
//   age: 12,
// });

// bear.speak();

// bear.save(); // if ran more than once, duplicates will be stored

async function mongoInit()
{
  // connect to db
  mongoose.connect(`mongodb://localhost:${ dbPort }/${ dbName }`, (err = null) => {
    if (err) {
      console.log('Failed to connect to database. Exiting...');

      return;
    }

    console.log(`Successfully connected to the ${ dbName } databse on port ${ dbPort }`);
  });

  // define table schema
  const personSchema = new mongoose.Schema({
    serverid: String,
    channelid: [String],
  });

  // define table with name and schema
  const Person = mongoose.model('Person', personSchema);

  // create new entry that adheres to the table and schema
  const person = new Person({
    serverid: '249520450432523',
    channelid: ['134235245', '32523523', '2352352'],
  });

  console.log(person);

  // add entry into the table
  await person.save();
}

mongoInit();