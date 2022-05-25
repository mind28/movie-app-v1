const express = require('express');
const app = express();
const colors = require('colors')
const dotenv = require('dotenv').config()

const morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose'),
    Models = require('./models.js'),
    Movies = Models.Movie;
    Users = Models.User;

const cors = require('cors');
app.use(cors());

const { check, validationResult } = require('express-validator');

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

const connectDB = require('./config/db')

connectDB()

// mongoose.connect('mongodb://localhost:27017/test', { 
//     useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect('mongodb+srv://mind28:Black-Mamba24@movie-app.xixo1.mongodb.net/movie-app?retryWrites=true&w=majority', { 
    // useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('common'));
app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Create new user

app.post('/users', 
// Validation logic
[
  check('username', 'Username is required (min 3 characters).').isLength({min: 5}),
  check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('password', 'Password is required.').not().isEmpty(),
  check('email', 'Email does not appear to be valid.').isEmail()
], (req, res) => {

  // Check validation object for errors

  let errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()});
  }

    let hashedPassword = Users.hashPassword(req.body.password);
    
    Users.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.username + 'already exists');
        } else {
          Users
            .create({
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email,
              birthday: req.body.birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

// View all users 

app.get('/users', (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  // Get a user by username

app.get('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ username: req.params.username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
  
// Update a single user

app.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, 
{ $set:
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthday: req.body.birthday
    }
  },
  { new: true }, 
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// User to add favorite movies

app.post('/users/:username/favoriteMovies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, {
     $push: { favoriteMovies: req.params.MovieID }
   },
   { new: true }, 
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// User to delete favorite movie

app.delete('/users/:username/favoriteMovies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username }, {
       $pull: { favoriteMovies: req.params.MovieID }
     },
     { new: true }, 
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

// Delete user 

app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// homepage 

app.get('/', (req, res) => {
    res.send('Home page is working heroku test')
});


// Create a movie and add it to the Movies Collection

app.post('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.body.Title })
      .then((movie) => {
        if (movie) {
          return res.status(400).send(req.body.Title + 'already exists');
        } else {
          Movies
            .create({
              Title: req.body.Title,
              Description: req.body.Description,
              Genre: req.body.Genre,
              Director: req.body.Director,
              Actors: req.body.Actors,
              ImagePath: req.body.ImagePath,
              Featured: req.body.Featured
            })
            .then((movie) =>{res.status(201).json(movie) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

// GET a single movie

app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({Title: req.params.title})
  .then((movie) => {
    res.json(movie)
})
.catch((err)=>{
  console.error(err);
  res.status(500).send('Error: ' + err);
});
})

// View all movies in the Movies Collection

app.get('/movies', (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// delete a movie from the Movies Collection

app.delete('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOneAndRemove({ Title: req.params.Title })
      .then((movie) => {
        if (!movie) {
          res.status(400).send(req.params.Title + ' was not found');
        } else {
          res.status(200).send(req.params.Title + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// get movie by title from the Movies Collection 

app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// get genre info from the Movies Collection

app.get('/genres/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({'Genre.Name': req.params.name })
  .then((movie) => {
    res.json(movie.Genre)
})
.catch((err)=>{
  console.error(err);
  res.status(500).send('Error: ' + err);
});
});

// get director info from the Movies Collection

app.get('/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({'Director.Name': req.params.name })
  .then((movie) => {
    res.json(movie.Director)
})
.catch((err)=>{
  console.error(err);
  res.status(500).send('Error: ' + err);
});
});

app.get('/actors/:name',  (req, res) => {
  Movies.findOne({'Actors.Name': req.params.name })
  .then((movie) => {
    res.json(movie.Actors)
})
.catch((err)=>{
  console.error(err);
  res.status(500).send('Error: ' + err);
});
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
});