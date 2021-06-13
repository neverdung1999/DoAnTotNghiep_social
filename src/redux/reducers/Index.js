import { combineReducers } from "redux";
import User from "./User";
import Personal from "./Personal";
import MyUser from "./myUser";

const appReducers = combineReducers({
  User,
  Personal,
  MyUser,
});

export default appReducers;
