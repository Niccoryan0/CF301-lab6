# City Explorer API

**Author**: Nicholas Ryan
**Version**: 1.0.0

// routes
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/trails', getTrails);

app.get('/', (request, response) => {
  response.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/');
});

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

## Getting Started
- Run NPM install from the root of this directory
- Get keys for required APIs:
  - Locationiq
  - Weatherbit.io API
  - REI Trails API
- Add a .env file with the following varibles:
  - PORT=3000
  - GEOCODE_API_KEY=89324218957hafdshjqbf
  - WEATHER_API_KEY=18295712jfsahbgrew2342
  - TRAILS_API_KEY=12376432hfarewfh123321

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->



## Features
### 5/11/2020
Number and name of feature: #1 Repository Set Up

Estimate of time needed to complete: 15 min.

Start time: 3:30 p.m.

Finish time: 3:50 p.m.

Actual time needed to complete: 20 min


Number and name of feature: #2 Locations

Estimate of time needed to complete: 1 hour

Start time: 4:00 p.m.

Finish time: 5:15 p.m.

Actual time needed to complete: 75 min


Number and name of feature: #3 Weather

Estimate of time needed to complete: ~ 75 min

Start time: 5:20 p.m.

Finish time: ~7 p.m. w/ 30 min break

Actual time needed to complete: ~70-75 min


Number and name of feature: #4 Errors

Estimate of time needed to complete: 5 min

Start time: 12:45 p.m. (5/12/20)

Finish time: 12:50 p.m.

Actual time needed to complete: 5 min.


### 5/12/2020
Number and name of feature: #1 Data Formatting

Estimate of time needed to complete: 20 min.

Start time: 12:50 p.m.

Finish time: 1:10 p.m.

Actual time needed to complete: 20 min


Number and name of feature: #2 Locations

Estimate of time needed to complete: 30 min.

Start time: 1:10 p.m.

Finish time: 1:30 p.m.

Actual time needed to complete: 20 min


Number and name of feature: #3 Weather

Estimate of time needed to complete: 30 min.

Start time: 2:10 p.m.

Finish time: 2:30 p.m.

Actual time needed to complete: 20 min


Number and name of feature: #4 Trails

Estimate of time needed to complete: 30 min.

Start time: 2:40 p.m.

Finish time: 3:15 p.m.

Actual time needed to complete: 35 min

### 5/13/2020
Number and name of feature: #1 Database

Estimate of time needed to complete: 15 min.

Start time: 1:30 p.m.

Finish time: 1:50 p.m.

Actual time needed to complete: 20 min


Number and name of feature: #2 Server

Estimate of time needed to complete: 25 min

Start time: 1:50 p.m.

Finish time: 3:10 p.m. (~45 min break for code challenge)

Actual time needed to complete: 35-40 min


Number and name of feature: #3 Deploy

Estimate of time needed to complete: 10 min

Start time: 3:15 p.m.

Finish time: 3:30 p.m.

Actual time needed to complete: 15 min.


Number and name of feature: #4 Errors

Estimate of time needed to complete: 45 min - 1 hr.

Start time: 3:45 p.m.

Finish time: _______ p.m.

Actual time needed to complete: ________ min.