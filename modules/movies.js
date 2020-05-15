'use strict';

// const superagent = require('superagent');
const getData = require('./handleData.js');

function Movie(obj){
  this.title = obj.title;
  this.overview = obj.overview;
  this.average_votes = obj.vote_average;
  this.total_votes = obj.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
  this.popularity = obj.popularity;
  this.released_on = obj.release_date;
}

function getMovies(req,res){
  const apiUrl = `https://api.themoviedb.org/3/search/movie`;
  const queryParams = {
    query : req.query.search_query,
    api_key : process.env.MOVIE_API_KEY
  };
  getData(res, apiUrl, queryParams, handleData);

}

function handleData(result) {
  const newMovies = result.body.results.map(obj => new Movie(obj));
  return newMovies;
}



module.exports = getMovies;
