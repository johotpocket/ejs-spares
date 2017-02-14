var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var server = app.listen(3000, function(){
  console.log('Server is LIT on PORT 3000')
});
