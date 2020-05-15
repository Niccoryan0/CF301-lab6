'use strict';

function handleErrors (error, res) {
  console.log(error);
  res.send(error).status(500);
}

module.exports = handleErrors;
