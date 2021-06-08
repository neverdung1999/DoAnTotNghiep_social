import * as Types from "../constants/ActionTypes";

let initalState = {};

const Personal = (state = initalState, action) => {
  switch (action.type) {
    case Types.PERSONAL_USER:
      const data = action.data.data;
      state = data;
      return state;
    default:
      return state;
  }
};

export default Personal;
