const initialState = {
  movies: [],
  searchLine: "",
  listMovFavorites: [],
  postId: ""
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case 'SEARCH_MOVIES':
      return{
        ...state,
        searchLine: action.payload.searchLine
      };
    
    case 'ADD_TO-LIST':
      const listArr = [...state.listMovFavorites];
      const movie = state.listMovFavorites.find(item =>
                    item.id === action.payload.id);
      if(movie) {
        return state;
      } else {
        listArr.push(action.payload);
      }
      return{
        ...state,
        listMovFavorites: listArr
      };

    case 'DELETE_MOV-FROM_LIST':
      const newListArr = state.listMovFavorites.filter(( item ) => item.id !== action.payload.id)
      return{
        ...state,
        listMovFavorites: newListArr
      };

    case 'GET_ID':
      return {
        ...state,
        postId: action.payload.postId
      };
 
    default:
      return state;
  }
}