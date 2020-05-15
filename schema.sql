DROP TABLE locations;
DROP TABLE weather;
DROP TABLE trails;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  latitude NUMERIC,
  longitude NUMERIC,
  formatted_query VARCHAR(255)
);

CREATE TABLE weather (
  id SERIAL PRIMARY KEY,
  ts NUMERIC,
  forecast VARCHAR(255),
  time VARCHAR(255),
  latitude VARCHAR(255)
);

CREATE TABLE trails (
  id SERIAL PRIMARY KEY,
  ts NUMERIC,
  name VARCHAR(255),
  location VARCHAR(255),
  length VARCHAR(255),
  stars NUMERIC,
  star_votes NUMERIC,
  summary VARCHAR(255),
  trail_url VARCHAR(255),
  conditions VARCHAR(255),
  condition_date VARCHAR(255),
  condition_time VARCHAR(255)
);