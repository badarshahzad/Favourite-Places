import {
  ADD_FAVOURITE,
  GET_ALL_FAVOURITE,
  DELETE_FAVOURITE
} from "../actions/types";
const initialState = {
  favouriteObject: {},
  allFavourite: []
};

export default function(state = initialState, action) {
  console.log("Id of delete is: " + action.payload);
  switch (action.type) {
    case ADD_FAVOURITE:
      return {
        ...state,
        allFavourite: [...state.allFavourite, action.payload]
      };
    case GET_ALL_FAVOURITE:
      return {
        ...state,
        allFavourite: action.payload
      };
    case DELETE_FAVOURITE:
      return {
        ...state,
        allFavourite: state.allFavourite.filter(e => {
          return e.id !== action.payload;
        })
      };

    default:
      return state;
  }
}
