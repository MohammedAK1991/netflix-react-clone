const BASE_URL = 'https://movied.herokuapp.com'

export default { 
  getDiscoverMovies: () => {
    return fetchRequest(`discover`);
  },
  getCategories: () => {
    return fetchRequest(`categories`);
  },
  getMoviesFromCategory: (id) => {
    return fetchRequest(`categories/${id}`);
  }
};

const fetchRequest = (url) => {
  return fetch(`${BASE_URL}/${url}`)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    });
};