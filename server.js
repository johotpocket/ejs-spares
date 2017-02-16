var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bearsRouter = require('./routes/bears')
var Cat = require('./models/cat');
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



app.post('/api/cats', function(req, res){
  var newCat = new Cat();
  newCat.name = req.body.name;
  newCat.talent = req.body.talent;
  newCat.age = req.body.age;

  newCat.save(function(err, data){
    if(err){
      console.log(err)
    }else{
      res.json(data)
    }
  })
});

app.use('/api/bears', bearsRouter)
