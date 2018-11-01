import React from 'react';

import MovieTile from '../MovieTile';

import './style.css';

export default ({movies, handleClick, title}) => (
  <div>
    {movies.length > 0 &&
      <div>
        <div className="list_title">{title === 'mylist' ? 'My List' : title}</div>
        <div className="list_scroll">
          {movies.map( movie =>
            <MovieTile
              onClick={handleClick.bind(this, movie)}
              key={movie.id}
              movie={movie}/>)}
        </div>
      </div>
    }
  </div>
);
