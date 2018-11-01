import React from 'react';

import './style.css';

export default ({movie, onClick}) => (
  <div className="movie_container">
    <img className="movie_img" alt="movie cover" src={
      movie.backdrop_path
        ? 'https://image.tmdb.org/t/p/w300/' + movie.backdrop_path
        : 'https://dz7u9q3vpd4eo.cloudfront.net/wp-content/legacy/posts/4462a9f8-6c2e-404d-bc09-951ee33f4750.jpg'} />
    <div className="movie_headline">
      <h3 className="movie_headline_title">{movie.title}</h3>
      <button className="movie_headline_btn" onClick={onClick}> {movie.mylist ? '✓' : '+'}</button>
    </div>
  </div>
);
