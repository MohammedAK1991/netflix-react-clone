const initial = {
  boxOffice: {
    fetching: false,
    categoriesLists: {
      mylist: [],
    }
  }
};

const pages = (state = initial, actions) => {
  const { type, data, list, id, bool } = actions;
  const { mylist } = state.boxOffice.categoriesLists;
  switch (type) {
  case 'SET_MOVIES':
    return {
      ...state,
      boxOffice:{
        ...state.boxOffice,
        categoriesLists:{
          ...state.boxOffice.categoriesLists,
          [list]: data.map(mov => mov.id),
        }
      }
    };
  case 'ADD_MYLIST':
    return {
      ...state,
      boxOffice:{
        ...state.boxOffice,
        categoriesLists:{
          ...state.boxOffice.categoriesLists,
          mylist: mylist.includes(id)
            ? mylist.filter(myId=> myId !== id)
            : [...mylist, id],
        }
      }
    };
  case 'FETCH_STATUS':
    return {
      ...state,
      boxOffice:{
        ...state.boxOffice,
        fetching: bool
      }
    };
  default:
    return state;
  }
};

export default pages;
