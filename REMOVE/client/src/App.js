import React, { useState, useEffect } from 'react';

import Navbar from './Components/Navbar';
import MovieList from './Components/MovieList';
import Spinner from './Components/Spinner';

import ApiClient from './Services/ApiClient';

import './App.css';

export const MovieContext = React.createContext(null);

const App = () => {
  const [status, setStatus] = useState(true);
  const [movies, setMovies] = useState({});
  const [lists, setLists] = useState({myList:[]});

  const updateState = (name, list) => {
    setMovies(movies => list.reduce((acc,mov) => ({
      ...acc,
      [mov.id]: Object.assign(mov, { mylist: false })
    }), movies));
    setLists(lists => ({...lists, [name]: list.map(mov => mov.id)}));
  }

  const addMyList = (id) => {
    setLists((lists) => ({
      ...lists,
      myList: lists.myList.includes(id)
      ? lists.myList.filter(myId=> myId !== id)
      : [...lists.myList, id]
    }))
    setMovies(movies => ({
      ...movies,
      [id]: Object.assign(movies[id], { mylist: !movies[id].mylist })
    }))
  }

  useEffect(() => {
    ApiClient.getDiscoverMovies()
      .then(newMovies => updateState('discover', newMovies));

    ApiClient.getCategories()
      .then(categories => Promise.all(categories.map(({ id, name }) =>
        ApiClient.getMoviesFromCategory(id)
          .then(newMovies => updateState(name, newMovies)))))
          .then(()=> setStatus(false));
  }, []);

  return (
    <div className="App_dashboard">
      <div className="App">
        <MovieContext.Provider value={{addMyList}}>
          <Navbar/>
          { !status
            ? Object.keys(lists).map(cat =>
              <MovieList
                key={cat}
                movies={lists[cat].map(id => movies[id])}
                title={cat}/> )
            : <div className="App_loader">
              <Spinner/>
            </div> }
        </MovieContext.Provider>
      </div>
    </div>
  )
}

export default App;
