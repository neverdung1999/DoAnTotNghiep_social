import { combineReducers } from "redux";
import User from "./User";
import Personal from "./Personal";
import MyUser from "./myUser";
import Home from "./Home";
import Post from "./Post";
import PostById from "./PostById";
import DetailsPost from "./DetailsPost";
import Apartment from "./Apartment";
import CreatePayment from "./createPayment";

const appReducers = combineReducers({
  User,
  Personal,
  MyUser,
  Home,
  Post,
  PostById,
  DetailsPost,
  Apartment,
  CreatePayment,
});

export default appReducers;
