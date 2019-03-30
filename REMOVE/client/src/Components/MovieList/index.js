import React from 'react';

import MovieTile from '../MovieTile';

import './style.css';

export default ({movies, title}) => (
  <div>
    {movies.length > 0 &&
      <div>
        <div className="list_title">
          {title === 'mylist' 
            ? 'My List' 
            : title.charAt(0).toUpperCase() + title.slice(1)}
        </div>
        <div className="list_scroll">
          {movies.map( movie =>
            <MovieTile
              key={movie.id}
              movie={movie}/>)}
        </div>
      </div>
    }
  </div>
);
