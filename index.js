const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js')

const Movies = Models.Movie;
const Users = Models.User;


mongoose.connect('mongodb://localhost:27017/test', { 
    useNewUrlParser: true, useUnifiedTopology: true });


const app = express();



app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Create new user to Users Collection


app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
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

// view all users in the Users Collection


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


app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
  

// update user


app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
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

// user to add favorite movies


app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params.MovieID }
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

// user to delete favorite movie


app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $pull: { FavoriteMovies: req.params.MovieID }
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


// delete user from Users Collection


app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


// homepage 


app.get('/', (req, res) => {
    res.send('Home page is working')
});


// Create a movie and add it to the Movies Collection


app.post('/movies', (req, res) => {
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

//   Add an actor to a movie and Update to Movies Collection

app.put('/movies/:Title', (req, res) => {
    Movies.findOneAndUpdate({ Title: req.params.Title }, { $push:
      {
        Actors: req.body.Actors
      }
    },
    { new: true }, 
    (err, updatedMovie) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedMovie);
      }
    });
  });

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


app.delete('/movies/:Title', (req, res) => {
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


app.get('/movies/genre/:Name', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name}) // Find one movie with the genre by genre name
      .then((movie) => {
        if(movie){ // If a movie with the genre was found, return json of genre info, else throw error
          res.status(200).json(movie.Genre);
        } else {
          res.status(400).send('Genre not found');
        };
      })
      .catch((err) => {
        res.status(500).send('Error: '+ err);
      });
  });


// get director info from the Movies Collection


app.get('/movies/director/:Name', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name}) // Find one movie with the genre by genre name
      .then((movie) => {
        if(movie){ // If a movie with the genre was found, return json of genre info, else throw error
          res.status(200).json(movie.Director);
        } else {
          res.status(400).send('Genre not found');
        };
      })
      .catch((err) => {
        res.status(500).send('Error: '+ err);
      });
  });



app.listen(8080, () => {
    console.log('App is listening on Port: 8080')
});