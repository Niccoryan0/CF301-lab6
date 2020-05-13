'use strict';

/* global require, process */

// define packages
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
// const postgres = require('pg');
require('dotenv').config();

// Global variables
const PORT = process.env.PORT;
const app = express();

//configs
app.use(cors());

// Routes
app.get('/', (request, response) => {
  response.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/');
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
function getLocation(request, response){
  const city = request.query.city;
  const apiUrl = 'https://us1.locationiq.com/v1/search.php';
  const queryParams = {
    key : process.env.GEOCODE_API_KEY,
    q: city,
    format: 'json'
  };
  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const newLocation = new LocationCon(result.body[0], city);
      response.send(newLocation);
    })
    .catch(error => handleErrors(error, response));
}


// Weather constuctor
function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
}

// Handle the get function for weather
function getWeather(request, response){
  // One way to do the API, from Chance, leaving it so I can reference it later, uses template literal in url:
  // const { latitude, longitude } = request.query;
  // const key = process.env.WEATHER_API_KEY;
  // const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${key}&days=7`;

  // Other way uses query instead of templated url
  const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams = {
    key : process.env.WEATHER_API_KEY,
    lat : request.query.latitude,
    lon : request.query.longitude,
    days : 7,
  };

  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const weatherDataMap = result.body.data.map(obj => new Weather(obj));
      response.send(weatherDataMap);
    })
    .catch(error => handleErrors(error, response));
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
function getTrails(request, response) {
  const apiUrl = 'https://www.hikingproject.com/data/get-trails';
  const queryParams = {
    key : process.env.TRAIL_API_KEY,
    lat : request.query.latitude,
    lon : request.query.longitude,
  };

  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const trailDataMap = result.body.trails.map(obj => new Trail(obj));
      response.send(trailDataMap);
    })
    .catch(error => handleErrors(error, response));
}

// function getStuff(request, response, apiUrl, queryParams) {
//   superagent.get(apiUrl)
//     .query(queryParams)
//     .then(result => {
//       const trailDataMap = result.body.trails.map(obj => new Trail(obj));
//       response.send(trailDataMap);
//     })
//     .catch(error => handleErrors(error, response));
// }


// Handle errors
const handleErrors = (error, response) => {
  console.log(error);
  response.send(error).status(500);
};


// We run the server
app.listen(PORT, console.log(`we are up on ${PORT}`));
