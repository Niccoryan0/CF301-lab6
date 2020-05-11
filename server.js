'use strict';

// define packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Global variables
const PORT = process.env.PORT || 3000;
const app = express();

//configs
app.use(cors());

app.get('./data/location', (request, response) => {
  const dataFromlocationJson = require('./data/location.json');
  // response.send(dataFromlocationJson);

  const locationData = require('./data/location.json');
  console.log(locationData);
  const newLocations = [];

  locationData.forEach(current => {
    newLocations.push(new Location(current));
  });

  response.send(newLocations);
});

function Location(obj){
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

// app.get('/data/weather', (r, res) => {
//   res.send([
//     {
//       'forecast': 'Partly cloudy until afternoon.',
//       'time': 'Mon Jan 01 2001'
//     },
//     {
//       'forecast': 'Mostly cloudy in the morning.',
//       'time': 'Tue Jan 02 2001'
//     },
//   ]);
// });




// We run the server
app.listen(PORT, console.log(`we are up on ${PORT}`));
