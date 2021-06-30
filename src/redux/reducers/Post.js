import * as Types from "../constants/ActionTypes";

let initialState = [];

const Post = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_POST:
      const data = action.data;
      state = data;
      return state;
    default:
      return state;
  }
};

export default Post;
