#### EJS Bears

#### Description
we are going to build an application which uses EJS (Embedded JavaScript: allows us to view javascript in our html pages) to render different pages. The pages will be displaying 'bears'.
For example:

UI Routes:
/ => Home route, renders index.ejs
/viewBears => This will render an EJS page that displays all bears.
/post => This will render a form, capable of creating a new bear.

#### Introducing MongoDB

1) pre-req: install MongoDB

`brew install mongodb`

don't have homebrew?(https://brew.sh/)

2) Make the database

`'mkdir -p /data/db'` or `'sudo mkdir -p /data/db'`

3) run MongoDB locally

`mongod` or `sudo mongod`

Mongodb is a non-relational database. It is really nice for javascript developers because it stores data in formats that we are used to working with. A single piece of data is known as a document. In our application here is what a document will look like:

```
  var someBear = {
    "name": "Winnie the Pooh"
    "species": "Honey Bear"
    "color": "golden brown"
```

The above is a single document, a bunch of these documents, or bears, is known as a collection. A collection is just an array full of obects.
```
var allBears = [someBear, anotherBear, moarBear]
```

When the EJS page show all bears is rendered, it will be displaying actual data from our bears collection.

In order to be interactive with our database we will design a ___RESTful___ API

The types of interactions we have with our database are described by ___HTTP___ verbs.

####GET
This verb is used for retrieving data.

####POST
This verb is used to `create` a new piece of data.

(when testing `POST` on Postman, go to body and then x-form-url-encoded, and fill out the forms there. make sure the parameters match your bear attributes.)

####PUT
This verb is used to edit.

####DELETE
An API that implements all of these methods is known as a ### C.R.U.D. API. Because you have the ability to Create, Read, Update, and Delete.

----
#### Mongoose
We will be implementing routes using express `app.get` to apply our HTTP verbs that interact with our database. Mongoose is a tool layered on top of Mongo, that makes these routes much easier to implement. It is known as an ORM (Object Relational Mapper).

A route that goes to our database, retrieves, all bears, and sends these bears back in JSON would look like so:
```
app.get('/bears', function(req, res){
  Bear.find(function(err, bear){
  if(err){
  return("error getting all bears from database")
  }else{
  res.json(bear)
  }
 });
 ```

 ----

 #### Implementation

 #### Step 0: Project Setup

 We Will begin by creating a basic server configured with express, ejs, and body parser.

 `touch server.js`

 `npm init` -> hit enter to accept defaults

 `echo "node_modules" >> .gitignore`

 `npm install --save express body-parser ejs`

 Make sure you look at `package.json` to see if your dependencies were updated.

 Configure your server to create a basic express server, tell it to use the view engine EJS, and supply the body-parser middleware to your application.

 Configure your server like so:

 ```
 //TODO

 ```


Our database will be formatted very similar to an array full of objects.

Our resources will be Bears.

----
#### Step one: EJS pages
in this step we will make the appropriate EJS files, and make routes to server these files.
Remembering that EJS pages must live in the views folder, create pages for index, view, and post.

`mkdir views`

`touch views/index.ejs views/view.ejs views/post.ejs`

update each EJS page to have a basic HTML implementation. In `view.ejs` add some HTML for an unordered list of bears. This is where our bears will eventaully go. In `post.ejs` add a basic HTML form with input fields for bear name, species, and color.

Next we will define our routes that are responsible for serving each one of our `EJS` pages.

```
// server.js

app.get('/', function(req, res) {
  res.render('index');
  });

app.get('/view', function(req, res) {
  res.render('view');
  });

app.get('/post', function(req, res) {
  res.render('post');
  });

```

----
#### Step Two: Designing our api

Before we can create and save any database in our database we need to define what our data will look like. We are going to use something called a `Schema`, which will be used as a blueprint when creating new bears.

`npm instal --save mongoose`

`mkdir models`

touch models/bear.js

```
//models/bear.js

var BearSchema = new mongoose.Schema({
  //define schema here
  name: String,
  color: String,
  species: String,
});

module.exports = mongoose.model('Bear', BearSchema);


```

Lastly, import this file into `server.js`

`var Bear = require('./models/bear');`

The last thing we need to do before designing our API, is to require and configure our database
in `server.js`

```
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mis-ejs-bears');
```

We now need to design our API as a way to interact with our Database.
API implementation will follow this table.

| HTTP Verb     | Path          | Response  |
| ------------- |:-------------:| -----:|
| `GET`         | /api/bears    | responds with all bears in a our database |
| `POST`        | /api/bears    |   creates a new bear, responds with JSON of this bear |
| `GET`          | /api/bears/:bear_id      |    responds with JSON for the specific bear|
| `PUT`          | /api/bears/:bear_id      |    edit ability for specific bear|
| `DELETE`          | /api/bears/:bear_id      |    deletes a specific bear |

Let's implement the first two routes on this table:
```
//server.js

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
```

Next we will use ___Postman___ to test these two endpoints.
Test your `GET` method first, it will break if you have an error in your code, otherwise it will return an empty array.

Then test the POST route. (don't forget to select the URL encoded option.)

After you create a couple of items, test your GET method again.

When your endpoints are working, commit your code.

----

### Step 3: Finish API endpoints that use 'bear_id'

When you create a new object Mongo gives that object a unique id.

For example:
```
var teddy = new Bear({name: "Teddy"});
console.log(teddy._id);
```

These unique IDs are extremely important generally in programming. When we do actions such as edit, or delete, they are being imposed on exactly one item. We need to make sure we are changing the item of intention.

The `GET` and `DELETE` methods are pretty straightforward.

```

app.get('/api/bears/:bear_id', function(req, res){
  bear.findById(req.params.bear_id, function(err, data){
    if(err){
      console.log(err)
      } else {
        res.json(data)
      }
    })
  });

app.delete('/api/bears/:bear_id', function(req, res){
  bear.remove({ _id: req.params.bear_id }, function(err){
    if(err){
      console.log(err)
    }else{
      res.json({ message: "successfully eradicated the bear" })
    }
    })
  });

```

The `PUT` route will be slightly more complicated. We will need to first find the specific bear we are looking for.
Once we have our bear, we only want to update the properties that receive new data. If there is no new data, it just uses the old data. Hence the ternaries:

```
app.put('/api/bears/:bear_id', function(req, res){
  Bear.findById(req.params.bear_id, function(err, bear){
    if(err){
      console.log(err)
    } else {
      bear.name = bear req.body.name ? req.body.name : bear.name;
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

```

Make sure you test all of your routes before committing your code.

####Steps to implement a new resource:

1)make a new schema(don't forget to include your scehma in your routes file)
Example of a schema:
`var Bear = require("./models/bear")`

2)implement API (CRUD) routes to expose our resource to our application

3)test these routes with postman

4)after that's working, do EJS stuff

#### tools

#### commit our changes over time.

___Learning Node, Mongo, Mongoose, Express, and EJS___
