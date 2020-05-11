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
  const 

  response.send({
    'search_query': 'Lynnwood',
    'formatted_query': 'Snohomish County, Washington, USA',
    'latitude': '47.8278656',
    'longitude': '-122.3053932'
  });
});


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
