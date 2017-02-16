var mongoose = require('mongoose');

var CatSchema = new mongoose.Schema({
  //define schema here
  name: String,
  talent: String,
  age: Number,
});

module.exports = mongoose.model('Cat', CatSchema);
