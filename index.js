const express = require('express'),
morgan = require('morgan');

const app = express();

let topMovies = [
    {
        title: 'Lord of the Rings: The Fellowship of the Rings',
        director: 'Peter Jackson',
    },
    {
        title: 'A Star is Born',
        director: 'Bradly Copper'
    },
    {
        title: 'JoJo Rabbit',
        director: 'Taika Waititi'
    },
    {
        title: 'Grand Budapest Hotel',
        director: 'Wes Anderson'
    },
    {
        title: 'Rogue One: A Star Wars Story',
        director: 'Gareth Edwards'
    },
    {
        title: 'Dont Look Up',
        director: 'Adam McKay'
    },
    {
        title: 'Saving Private Ryan',
        director: 'Steven Spielberg'
    },
    {
        title: 'Black Hawk Down',
        director: 'Jerry Bruckheimer'
    },
    {
        title: '2 Guns',
        director: 'Baltasar Kormákur'
    },
    {
        title: 'flight',
        director: 'Robert Zemeckis'
    }
];

app.use(morgan('common'));
app.use(express.static('public'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.get('/', (req, res) => {
    res.send('Home page is working')
});

app.get('/movies', (req, res) =>{
    res.json(topMovies);
});

app.listen(8080, () => {
    console.log('App is listening on Port: 8080')
});