'use strict';

const superagent = require('superagent');
const handleErrors = require('./handleErrors');

function getData(res, apiUrl, queryParams, handle) {
  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => handle(result))
    .then(result => res.send(result))
    .catch(error => handleErrors(error, res));
}


module.exports = getData;
