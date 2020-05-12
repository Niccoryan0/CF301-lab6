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

const getLocation = (request, response) => {
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
    .catch(error => response.send(error).status(500));
};


app.get('/location', getLocation);

function LocationCon(obj, city){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

app.get('/weather', (request, response) => {
  const weatherData = require('./data/weather.json');
  const weatherDataReal = weatherData.data;


  const apiUrl = 'https://api.weatherbit.io/v2.0/current';
  const queryParams = {
    key : process.env.WEATHER_API_KEY,
    lat : request.query.latitude,
    lon : request.query.longitude,
  };
  const newWeather = [];

  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      console.log(result);
      // result.forEach(current => {
      //   newWeather.push(new Weather(current));
      // });
      // response.send(newWeather);

    })
    .catch(error => response.send(error).status(500));


  // const outputMap = newWeather.map();
});

function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
}


// We run the server
app.listen(PORT, console.log(`we are up on ${PORT}`));
