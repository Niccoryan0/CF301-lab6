'use strict';

/* global require, process */

// define packages
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
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

// Routes
app.get('/', (req, res) => {
  res.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/');
});
app.get('/location', getLocation);
app.get('/weather', (req,res) => getData(req, res, apiUrls.weather, 'data'));
app.get('/trails', (req,res) => getData(req, res, apiUrls.trails, 'trails'));

// Location constructor
function LocationCon(obj, city){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

// Weather constuctor
function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
}

// Trail constructor
function Trail(obj){
  this.name = obj.name;
  this.location = obj.location;
  this.length = obj.length;
  this.stars = obj.stars;
  this.star_votes = obj.starVotes;
  this.summary = obj.summary;
  this.trail_url = obj.url;
  this.conditions = obj.conditionStatus;
  // Split because the conditionDate comes back with both date and time
  this.condition_date = obj.conditionDate.split(' ')[0];
  this.condition_time = obj.conditionDate.split(' ')[1];
}

// Handle the get function for location
function getLocation(req, res){
  const city = req.query.city;
  const apiUrl = 'https://us1.locationiq.com/v1/search.php';
  const queryParams = {
    key : process.env.GEOCODE_API_KEY,
    q: city,
    format: 'json'
  };

  const sqlQuery = 'SELECT * FROM locations WHERE search_query=$1';
  const sqlVal = [city];
  client.query(sqlQuery, sqlVal)
    .then(result => {
      if(result.rowCount > 0){
        // If there's info in sql, send that
        res.send(result.rows[0]);
      }else {
        superagent.get(apiUrl)
          .query(queryParams)
          .then(result => {
            const newLocation = new LocationCon(result.body[0], city);
            const sqlQuery = 'INSERT INTO locations (latitude, longitude, search_query, formatted_query) VALUES ($1, $2, $3, $4)';
            const valArr = [newLocation.latitude, newLocation.longitude, newLocation.search_query, newLocation.formatted_query];

            client.query(sqlQuery,valArr);

            res.send(newLocation);
          })
          .catch(error => handleErrors(error, res));
      }
    }).catch(error => handleErrors(error,res));
}

// One function for getting Trails & Weather data
function getData(req, res, apiUrl, drill) {
  superagent.get(apiUrl)
    .query(queryParams(req)[drill])
    .then(result => {
      if(drill === 'data'){
        res.send(result.body[drill].map(obj => new Weather(obj)));
      } else {
        res.send(result.body[drill].map(obj => new Trail(obj)));
      }
    })
    .catch(error => handleErrors(error, res));
}

// Handle errors
function handleErrors (error, res) {
  console.log(error);
  res.send(error).status(500);
}

function queryParams(req) {
  const weather = {
    key : process.env.WEATHER_API_KEY,
    lat : req.query.latitude,
    lon : req.query.longitude,
    days : 7,
  };
  const trails = {
    key : process.env.TRAIL_API_KEY,
    lat : req.query.latitude,
    lon : req.query.longitude,
  };
  return { 'data' : weather, 'trails' : trails};
}


// Run the server
app.listen(PORT, console.log(`we are up on ${PORT}`));
