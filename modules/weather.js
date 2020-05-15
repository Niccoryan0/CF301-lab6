'use strict';

const getData = require('./modules/datahandle.js');

// Weather constuctor
function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
}

function getWeather(req, res){
  const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  getData(req, res, apiUrl, 'data');
}

module.exports = getWeather;


