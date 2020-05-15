'use strict';


// define packages
const express = require('express');
const cors = require('cors');
// const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();

// Global variables
const PORT = process.env.PORT;
const app = express();
const apiUrls = {
  weather : 'https://api.weatherbit.io/v2.0/forecast/daily',
  trails: 'https://www.hikingproject.com/data/get-trails'
};

// Configs
app.use(cors());
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();


// Handlers
const getLocation = require('./modules/location.js');
const getWeather = require('./modules/weather.js');
const getTrails = require('./modules/trails.js');
const getData = require('./modules/handleData.js');
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
app.get('/reset', (req, res) => {
  const sqlQuery = `DROP TABLE locations;
  DROP TABLE weather;
  DROP TABLE trails;
  
  CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    latitude NUMERIC,
    longitude NUMERIC,
    formatted_query VARCHAR(255)
  );
  
  CREATE TABLE weather (
    id SERIAL PRIMARY KEY,
    t1 TIMESTAMP,
    forecast VARCHAR(255),
    time VARCHAR(255),
    lat VARCHAR(255)
  );
  
  CREATE TABLE trails (
    id SERIAL PRIMARY KEY,
    t1 TIMESTAMP,
    name VARCHAR(255),
    location VARCHAR(255),
    length VARCHAR(255),
    stars NUMERIC,
    star_votes NUMERIC,
    summary VARCHAR(255),
    trail_url VARCHAR(255),
    conditions VARCHAR(255),
    condition_date VARCHAR(255),
    condition_time VARCHAR(255)
  );`;
  client.query(sqlQuery);
  res.redirect('/');
});

// Run the server
app.listen(PORT, console.log(`we are up on ${PORT}`));
