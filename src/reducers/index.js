import { FETCH_WEATHER } from "../constants";

const reducer = (state = "91888417", action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return action.location;
    default:
      return state;
  }
};

export default reducer;
