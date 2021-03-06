// run `npm run seed` to execute this file
// this will only work for single models with no associations but the concept can be applied to anything really.


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sparta-todo');
var Model = require('../models/Todo');

var records = [
  addRecord({
    title: 'Buy some milk',
    desc: '65p, bargin!',
    type: 'Personal',
    isComplete: false
  }),
  addRecord({
    title: 'Meeting',
    desc: 'Matt from Sparta Global',
    type: 'Work',
    isComplete: false
  })
];


function addRecord (data) {
  return new Promise(function (resolve, reject) {
    new Model(data).save(resolve);
  });
}

console.log('Seeding the database...');
Promise.all(records).then(process.exit);
