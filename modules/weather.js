'use strict';

const getData = require('./handleData.js');

// Weather constuctor
function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
}

function getWeather(req, res){
  const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams = {
    key : process.env.WEATHER_API_KEY,
    lat : req.query.latitude,
    lon : req.query.longitude,
    days : 7,
  };
  getData(res, apiUrl, queryParams, handleData);
}

function handleData(result) {
  const newWeather = result.body.data.map(obj => new Weather(obj));
  return newWeather;
}

module.exports = getWeather;


