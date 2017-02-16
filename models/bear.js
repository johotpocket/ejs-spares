//this is where new bears get made and sent to the mongo database
var mongoose = require('mongoose');

var BearSchema = new mongoose.Schema({
  //define schema here
  name: String,
  color: String,
  species: String,
});

module.exports = mongoose.model('Bear', BearSchema);
