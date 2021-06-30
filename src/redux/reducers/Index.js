import { combineReducers } from "redux";
import User from "./User";
import Personal from "./Personal";
import MyUser from "./myUser";
import Home from "./Home";
import Post from "./Post";
import DetailsPost from "./DetailsPost";

const appReducers = combineReducers({
  User,
  Personal,
  MyUser,
  Home,
  Post,
  DetailsPost,
});

export default appReducers;
