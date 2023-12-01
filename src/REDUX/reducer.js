import { GET_USER, WARNING, SET_USER, SET_FAVORITES } from "./actions";

const initState = {
  user: { systemRole: "Guest" },
  favorites: [],
  blockAccess: false,
  warning: true,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case WARNING:
      return {
        ...state,
        warning: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;