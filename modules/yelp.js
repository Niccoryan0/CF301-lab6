'use strict';

const superagent = require('superagent');

function getYelp(req,res){
  const apiUrl = `https://api.yelp.com/v3/businesses/search`;
  const key = 'Bearer ' + process.env.YELP_API_KEY;
  const city = req.query.search_query;
  const queryParams = {
    term: 'restaurant',
    location: city
    // latitude: req.query.latitude,
  };
  superagent.get(apiUrl)
    .set('Authorization', key)
    .query(queryParams)
    .then(result => {
      const yelpMap = result.body.businesses.map(current => {
        return new Yelp(current);
      });
      res.send(yelpMap);
    });
}
function Yelp(obj){
  this.name = obj.name;
  this.image_url = obj.overview;
  this.price = obj.price;
  this.rating = obj.rating;
  this.url = obj.url;
}


module.exports = getYelp;
