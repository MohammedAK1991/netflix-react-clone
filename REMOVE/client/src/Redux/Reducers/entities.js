const initial = {
  movies: {},
  categories: {},
};

const entities = (state = initial, actions) => {
  const { type, data, id } = actions;
  switch (type) {
  case 'SET_MOVIES':
    return {
      ...state,
      movies: data.reduce((acc,mov) => ({
        ...acc,
        [mov.id]: Object.assign(mov, { mylist: false})
      }), state.movies)
    };
  case 'SET_CATEGORIES':
    return {
      ...state,
      categories: data.reduce((acc,cat) => ({
        ...acc,
        [cat.id]: cat
      }), state.categories)
    };
  case 'ADD_MYLIST':
    return {
      ...state,
      movies: {
        ...state.movies,
        [id]: Object.assign(state.movies[id], { mylist: !state.movies[id].mylist })
      }
    };
  default:
    return state;
  }
};

export default entities;
