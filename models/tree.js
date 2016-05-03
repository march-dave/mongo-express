'use strict';

var mongoose = require('mongoose');

var treeSchema = new mongoose.Schema({
  // species: { type: String, required: true, default: pickAPet },
  // species: { type: String, required: true, enum: ['sequoia', 'ash', 'pine', 'cherry'] },
  // createdAt: { type:Date, default: Date.now },
  species: { type: String },
  createdAt: { type:Date },
  // age: { type: Number, required: true, min: 0, max: 1000 }
  // age: { type: Number, required: true, enum: [1,2,3,4,5] }
  // age: { type: Number, required: true },
  age: { type: Number },
  creatures: [{ type: String }] // , match: /^\w+/ an array of strings


});

var Tree = mongoose.model('Tree', treeSchema);

// function pickAPet() {
//   var pets = ['sequoia', 'ash', 'pine', 'cherry'];
//   var randIndex = Math.floor(Math.random() * pets.length);
//   return pets[randIndex];
// }

// var Tree = mongoose.model('Tree', {
//   species: String,
//   age: Number
// });

module.exports = Tree;
