import { combineReducers } from "redux";
import countiesReducers from "./countiesReducers"

const rootReducer = combineReducers({
  countries: countiesReducers,
});

export default rootReducer;
