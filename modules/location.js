'use strict';

const pg = require('pg');
const superagent = require('superagent');


const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();

function LocationCon(obj, city){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}
LocationCon.Query = function(city){
  this.key = process.env.GEOCODE_API_KEY;
  this.q = city;
  this.format = 'json';
};

// Handle the get function for location
function getLocation(req, res){
  const city = req.query.city;

  const sqlQuery = 'SELECT * FROM locations WHERE search_query=$1';
  const sqlVal = [city];
  client.query(sqlQuery, sqlVal)
    .then(result => handleSQLResult(result, city))
    .then(result => res.send(result))
    .catch(error => handleErrors(error,res));
}

function handleSQLResult(result, city) {
  const apiUrl = 'https://us1.locationiq.com/v1/search.php';

  const queryParams = (new LocationCon.Query(city)).params;
  if(result.rowCount > 0){
    return result.rows[0];
  }else {
    return superagent.get(apiUrl)
      .query(queryParams)
      .then(result => handleLocSuperAgent(result, city));
  }
}

function handleLocSuperAgent(result, city){
  const newLocation = new LocationCon(result.body[0], city);
  const sqlQuery = 'INSERT INTO locations (latitude, longitude, search_query, formatted_query) VALUES ($1, $2, $3, $4)';
  const valArr = [newLocation.latitude, newLocation.longitude, newLocation.search_query, newLocation.formatted_query];

  client.query(sqlQuery,valArr);

  return newLocation;
}

function handleErrors (error, res) {
  console.log(error);
  res.send(error).status(500);
}

module.exports = getLocation;
