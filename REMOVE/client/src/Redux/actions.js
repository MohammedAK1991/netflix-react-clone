export const updateMovies = (data, list) => ({
  type: 'SET_MOVIES',
  data,
  list
});

export const updateMyList = (id) => ({
  type: 'ADD_MYLIST',
  id
});

export const setCategories = (data) => ({
  type: 'SET_CATEGORIES',
  data
});

export const updateFetchStatus = (bool) => ({
  type: 'FETCH_STATUS',
  bool
});
