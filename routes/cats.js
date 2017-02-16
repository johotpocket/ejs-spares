var express = require("express");
var Cat = require("../models/cat");
var Router = new express.Router();

Router.get('/', function(req, res){
  Cat.find(function(err, data){
    if(err){
      console.log("can't find those cats")
    }else{
      res.json(data)
    }
  })
});

Router.post('/', function(req, res){
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

module.exports = Router
