'use strict';

const pg = require('pg');
const superagent = require('superagent');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();


// Weather constuctor
function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
}
Weather.Info = function(req){
  this.apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  this.queryParam = {
    key : process.env.WEATHER_API_KEY,
    lat : req.query.latitude,
    lon : req.query.longitude,
    days : 7,
  };
  this.drill = 'data';
};

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

function getData(req, res, apiUrl, drill) {
  superagent.get(apiUrl)
    .query(queryParams(req)[drill])
    .then(result => handleData(result, drill, req))
    .then(result => res.send(result))
    .catch(error => handleErrors(error, res));
}

function handleData(result, drill, req){
  if(drill === 'data'){
    const newWeather = result.body[drill].map(obj => new Weather(obj));
    newWeather.forEach(val => {
      const sqlQuery = 'INSERT INTO weather (latitude, forecast, time, ts) VALUES ($1, $2, $3, $4)';
      const valArr = [req.query.latitude, val.forecast, val.time, Date.now()/3600000];
      client.query(sqlQuery,valArr);

    });
    return newWeather;
  } else if (drill === 'trails') {
    const newTrails = result.body[drill].map(obj => new Trail(obj));
    newTrails.forEach(val => {
      const sqlQuery = 'INSERT INTO trails (name, location, length, stars, star_votes, summary, trail_url, conditions, condition_date, condition)time, ts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
      const valArr = [val.name, val.location, val.length, val.stars, val.star_votes, val.summary, val.trail_url, val.conditions, val.condiiton_date, val.condition_time, Date.now()/3600000];
      client.query(sqlQuery,valArr);
    });
    return newTrails;
  }
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

function handleErrors (error, res) {
  console.log(error);
  res.send(error).status(500);
}

module.exports = getData;
