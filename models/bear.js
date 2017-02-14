var mongoose = require('mongoose');

var BearSchema = new mongoose.Schema({
  //define schema here
  name: String,
  color: String,
  species: String,
});

module.exports = mongoose.model('Bear', BearSchema);
