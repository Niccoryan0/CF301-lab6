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

//configs
app.use(cors());
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();

// Routes
app.get('/', (req, res) => {
  res.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/');
});
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/trails', getTrails);

// Location constructor
function LocationCon(obj, city){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
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
  // superagent.get(apiUrl)
  //   .query(queryParams)
  //   .then(result => {
  //     const newLocation = new LocationCon(result.body[0], city);
  //     const sqlQuery = 'INSERT INTO locations (latitude, longitude, search_query, formatted_query) VALUES ($1, $2, $3, $4)';
  //     const valArr = [newLocation.latitude, newLocation.longitude, newLocation.search_query, newLocation.formatted_query];

  //     client.query(sqlQuery,valArr);

  //     res.send(newLocation);
  //   })
  //   .catch(error => handleErrors(error, res));
}


// Weather constuctor
function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
}

// Handle the get function for weather
function getWeather(req, res){
  // One way to do the API, from Chance, leaving it so I can reference it later, uses template literal in url:
  // const { latitude, longitude } = req.query;
  // const key = process.env.WEATHER_API_KEY;
  // const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${key}&days=7`;

  // Other way uses query instead of templated url
  const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams = {
    key : process.env.WEATHER_API_KEY,
    lat : req.query.latitude,
    lon : req.query.longitude,
    days : 7,
  };

  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const weatherDataMap = result.body.data.map(obj => new Weather(obj));
      res.send(weatherDataMap);
    })
    .catch(error => handleErrors(error, res));
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

// Handle the get function for trails
function getTrails(req, res) {
  const apiUrl = 'https://www.hikingproject.com/data/get-trails';
  const queryParams = {
    key : process.env.TRAIL_API_KEY,
    lat : req.query.latitude,
    lon : req.query.longitude,
  };

  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const trailDataMap = result.body.trails.map(obj => new Trail(obj));
      res.send(trailDataMap);
    })
    .catch(error => handleErrors(error, res));
}

// function getStuff(req, res, apiUrl, queryParams) {
//   superagent.get(apiUrl)
//     .query(queryParams)
//     .then(result => {
//       const trailDataMap = result.body.trails.map(obj => new Trail(obj));
//       res.send(trailDataMap);
//     })
//     .catch(error => handleErrors(error, res));
// }


// Handle errors
const handleErrors = (error, res) => {
  console.log(error);
  res.send(error).status(500);
};


// We run the server
app.listen(PORT, console.log(`we are up on ${PORT}`));
