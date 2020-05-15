'use strict';

const superagent = require('superagent');

// function Movie(obj){

// }
function getMovies(req,res){
  const city = req.query.search_query;
  const key = process.env.MOVIE_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${city}&page=1&include_adult=false&region=US`;
  superagent.get(apiUrl)
    .then(result => {
      const movieMap = result.body.results.map(current => {
        return new Movie(current);
      });
      res.send(movieMap);
    });
}

function Movie(obj){
  this.title = obj.title;
  this.overview = obj.overview;
  this.average_votes = obj.vote_average;
  this.total_votes = obj.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
  this.popularity = obj.popularity;
  this.released_on = obj.release_date;
}


module.exports = getMovies;
