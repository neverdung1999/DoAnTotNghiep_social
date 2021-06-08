import { combineReducers } from "redux";
import User from "./User";
import Personal from "./Personal";

const appReducers = combineReducers({
  User,
  Personal,
});

export default appReducers;
