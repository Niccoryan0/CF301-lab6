'use strict';

/* global require, process */

// define packages
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

// Global variables
const PORT = process.env.PORT;
const app = express();

//configs
app.use(cors());

app.get('/', (request, response) => {
  response.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/');
});

app.get('/location', (request, response) => {
  // const locationData = require('./data/location.json');
  // console.log(locationData);
  // let location = new LocationCon(locationData[0], city);
  // response.send(location);

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
    });
});

function LocationCon(obj, city){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

app.get('/weather', (request, response) => {

  const weatherData = require('./data/weather.json');
  const weatherDataReal = weatherData.data;
  const newWeather = [];

  weatherDataReal.forEach(current => {
    newWeather.push(new Weather(current));
  });
  // const outputMap = newWeather.map();
  response.send(newWeather);
});

function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
}


// We run the server
app.listen(PORT, console.log(`we are up on ${PORT}`));
