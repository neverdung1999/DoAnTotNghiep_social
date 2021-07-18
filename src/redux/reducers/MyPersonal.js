import * as Types from "../constants/ActionTypes";
import Cookies from "universal-cookie";

const cookies = new Cookies();
let initialState = [];

const MyUser = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_MY_PERSONAL:
      const data = action.data;
      if (data.id === cookies.get("user")) {
        cookies.set("data", data);
        cookies.set("username", data?.username);
      }
      state = data;
      return state;
    case Types.PERSONAL_USER_BY_ID:
      const dataById = action.data.data;
      state = dataById;
      return state;
    default:
      return state;
  }
};

export default MyUser;
