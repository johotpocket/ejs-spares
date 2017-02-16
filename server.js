var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bear = require('./models/bear');
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

app.get('/api/bears', function(req, res){
  Bear.find(function(err, data){
    if(err){
      console.log("error finding your bear")
    } else {
      res.json(data)
    }
  })
});

app.post('/api/bears', function(req, res){
  var newBear = new Bear();
  newBear.name = req.body.name;
  newBear.species = req.body.species;
  newBear.gender = req.body.gender;
  newBear.color = req.body.color;

  newBear.save(function(err, data){
    if(err){
      console.log(err)
    } else {
      res.json(data);
    }
  })
});

//for example: /api/bears/58a5e47af4dd0202ff240a66
app.get('/api/bears/:bear_id', function(req, res){
  Bear.findById(req.params.bear_id, function(err, data){
    if(err){
      console.log(err)
    } else {
      res.json(data)
    }
  })
});

app.delete('/api/bears/:bear_id', function(req, res){
  Bear.remove({ _id: req.params.bear_id }, function(err){
    if(err){
      console.log(err)
    }else{
      res.json({ message: "successfully eradicated the bear" })
    }
  })
});

app.put('/api/bears/:bear_id', function(req, res){
  Bear.findById(req.params.bear_id, function(err, bear){
    if(err){
      console.log(err)
    } else {
      bear.name = req.body.name ? req.body.name : bear.name;
      bear.species = req.body.species ? req.body.species : bear.species;
      bear.color = req.body.color ? req.body.color : bear.color;

      bear.save(function(er, updatedBear){
        if(er){
          console.log(er)
        } else {
          res.json(updatedBear);
        }
      })
     }
    })
  })

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
