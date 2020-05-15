'use strict';

const getData = require('./handleData.js');


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

function getTrail(req, res){
  const apiUrl = 'https://www.hikingproject.com/data/get-trails';
  const queryParams = {
    key : process.env.TRAIL_API_KEY,
    lat : req.query.latitude,
    lon : req.query.longitude,
  };
  getData(res, apiUrl, queryParams, handleData);
}

function handleData(result) {
  const newTrails = result.body.trails.map(obj => new Trail(obj));
  return newTrails;
}


module.exports = getTrail;


