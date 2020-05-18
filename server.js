'use strict';

// define packages
const express = require('express');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();

// Global variables
const PORT = process.env.PORT;
const app = express();

// Configs
app.use(cors());
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();

// Handlers
const getLocation = require('./modules/location.js');
const getWeather = require('./modules/weather.js');
const getTrails = require('./modules/trails.js');
const getMovies = require('./modules/movies.js');
const getYelp = require('./modules/yelp');

// Routes
app.get('/', (req, res) => {
  res.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/');
});
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/trails', getTrails);
app.get('/movies', getMovies);
app.get('/yelp', getYelp);

// Run the server
app.listen(PORT, console.log(`we are up on ${PORT}`));
