import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import favReducer from "./favReducer";

export default combineReducers({
  auth: authReducer,
  favourite: favReducer,
  errors: errorReducer
});
