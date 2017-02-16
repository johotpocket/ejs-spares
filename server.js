var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bearsRouter = require('./routes/bears')
var catsRouter = require('./routes/cats')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mis-ejs-bears');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var server = app.listen(3000, function(){
  console.log('Server is LIT on PORT 3000')
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/view', function(req, res) {
  res.render('view');
});

app.get('/post', function(req, res) {
  res.render('post');
});


app.use('/api/bears', bearsRouter)
app.use('/api/cats', catsRouter)
