import * as Types from "../constants/ActionTypes";
import Cookies from "universal-cookie";

const initialState = {
  status: false,
};
const cookies = new Cookies();

const myUser = (state = initialState, action) => {
  switch (action.type) {
    case Types.MY_USER:
      const data = action.data.data;
      cookies.set("data", data);
      return state;
    default:
      return state;
  }
};

export default myUser;
