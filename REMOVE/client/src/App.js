import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateMovies, setCategories, updateMyList, updateFetchStatus } from './Redux/actions';

import Navbar from './Components/Navbar';
import MovieList from './Components/MovieList';
import Spinner from './Components/Spinner';

import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.fetchMovies();
    this.fetchCategories();
  }

  fetchCategories () {
    this.props.updateFetchStatus(false);
    fetch('https://movied.herokuapp.com/categories')
      .then(data => data.json())
      .then(movies => this.props.setCategories(movies))
      .then(() => Promise.all(Object.keys(this.props.categories).map(id => {
        return fetch(`https://movied.herokuapp.com/categories/${id}`)
          .then(data => data.json())
          .then(movies => this.props.updateMovies(movies, this.props.categories[id].name));
      })).then(()=>this.props.updateFetchStatus(true)));
  }

  fetchMovies () {
    fetch('https://movied.herokuapp.com/discover')
      .then(data => data.json())
      .then(movies => this.props.updateMovies(movies, 'Discover'));
  }

  render () {
    const { categoriesLists, movies, fetchStatus } = this.props;
    return (
      <div className="App">
        <Navbar/>
        {fetchStatus
          ? <div className="App_dashboard">
            {Object.keys(categoriesLists).map(cat =>
              <MovieList
                key={cat}
                handleClick={(movie) => this.props.updateMyList(movie.id)}
                movies={categoriesLists[cat].map(id => movies[id])}
                title={cat}/>
            )}
          </div>
          : <div className="App_loader">
            <Spinner/>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoriesLists: state.pages.boxOffice.categoriesLists,
  fetchStatus: state.pages.boxOffice.fetching,
  movies: state.entities.movies,
  categories: state.entities.categories,
});

const mapDispatchToProps = (dispatch) => ({
  updateMovies: (data, list) => dispatch(updateMovies(data, list)),
  updateMyList: (data) => dispatch(updateMyList(data)),
  setCategories: (data) => dispatch(setCategories(data)),
  updateFetchStatus: (data) => dispatch(updateFetchStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
