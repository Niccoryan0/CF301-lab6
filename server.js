'use strict';

// define packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Global variables
const PORT = process.env.PORT;
const app = express();

//configs
app.use(cors());

app.get('/', (request, response) => {
  response.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/')
}

app.get('/location', (request, response) => {

  const locationData = require('./data/location.json');
  const city = request.query.city;
  console.log(locationData);
  // const newLocations = [];
  // locationData.forEach(current => {
  //   console.log(current);
  //   newLocations.push(new Location(current, city));
  // });
  let location = new Location(locationData[0], city);
  response.send(location);
});

function Location(obj, city){
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
  const outputMap = newWeather.map();
  response.send(outputMap);
});

function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
}


// We run the server
app.listen(PORT, console.log(`we are up on ${PORT}`));
