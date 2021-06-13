import * as Types from "../constants/ActionTypes";
import CallApi from "../../utils/apiCaller";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const idUser = cookies.get("user");
const username = cookies.get("username");

// ------------------------------------------------------ LOGIN USER ------------------------------------------------------

export const loginUserRequest = (
  valueInputEmail,
  valueInputPassword,
  history,
  setShowLoading
) => {
  return (dispatch) => {
    return CallApi("POST", "/user/signIn", {
      email: valueInputEmail,
      password: valueInputPassword,
    })
      .then((res) => {
        setShowLoading(false);
        dispatch(loginUser(res, history));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const loginUser = (data, history) => {
  return {
    type: Types.LOGIN_USER,
    data,
    history,
  };
};

export const removeState = () => {
  return {
    type: Types.REMOVE_STATE,
  };
};

// ------------------------------------------------------ END LOGIN USER ------------------------------------------------------

// ------------------------------------------------------  REGISTER USER ------------------------------------------------------

export const registerUserRequest = (
  valueInputName,
  valueInputUsername,
  valueInputEmail,
  valueInputPassword,
  history,
  setShowLoading
) => {
  return (dispatch) => {
    return CallApi("POST", "/user/signUp", {
      email: valueInputEmail,
      password: valueInputPassword,
      username: valueInputUsername,
      name: valueInputName,
      description: "",
    })
      .then((response) => {
        setShowLoading(false);
        console.log(response);
        dispatch(registerUser(response, history));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const registerUser = (data, history) => {
  return {
    type: Types.REGISTER_USER,
    data,
    history,
  };
};

// ------------------------------------------------------ END REGISTER USER ------------------------------------------------------

export const logoutUser = () => {
  return {
    type: Types.LOGOUT_USER,
  };
};

// ------------------------------------------------------  PERSONAL USER ------------------------------------------------------

export const personalRequestById = (setShowLoading, id) => {
  return (dispatch) => {
    return CallApi("GET", `/user?id=${id}`, null)
      .then((response) => {
        setShowLoading(false);
        dispatch(personal(response, setShowLoading));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const personalRequest = (setShowLoading, username) => {
  return (dispatch) => {
    return CallApi("GET", `/user?username=${username}`, null)
      .then((response) => {
        setShowLoading(false);
        dispatch(personal(response, setShowLoading));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const personal = (data, setShowLoading) => {
  return {
    type: Types.PERSONAL_USER,
    data,
    setShowLoading,
  };
};

// ------------------------------------------------------ END PERSONAL USER ------------------------------------------------------

// ------------------------------------------------------ CHANGE AVT ------------------------------------------------------

export const changeAvtRequest = (idUser, response, setShowLoading) => {
  return (dispatch) => {
    return CallApi("PUT", "/user", {
      id: idUser,
      imageSrc: response,
    })
      .then((res) => {
        dispatch(getMyUserRequest(setShowLoading));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// ------------------------------------------------------ END CHANGE AVT ------------------------------------------------------

// ------------------------------------------------------  REMOVE FRIEND ------------------------------------------------------

export const removeFriendRequest = (id, setShowLoading) => {
  return (dispatch) => {
    return CallApi(
      "DELETE",
      `/user/follow?myId=${idUser}&followingId=${id}`
    ).then((res) => {
      dispatch(getMyUserRequest(setShowLoading));
    });
  };
};

// ------------------------------------------------------ END REMOVE FRIEND ------------------------------------------------------

// ------------------------------------------------------  FOLLOW FRIEND ------------------------------------------------------

export const followFriendRequest = (id, setShowLoading) => {
  return (dispatch) => {
    return CallApi("POST", `/user/follow?myId=${idUser}&followingId=${id}`)
      .then((res) => {
        dispatch(getMyUserRequest(setShowLoading));
      })
      .catch((err) => console.log(err));
  };
};

// ------------------------------------------------------ END FOLLOW FRIEND ------------------------------------------------------

// ------------------------------------------------------ GET MY USER ------------------------------------------------------

export const getMyUserRequest = (setShowLoading) => {
  return (dispatch) => {
    return CallApi("GET", `/user?username=${username}`, null)
      .then((response) => {
        console.log(response);
        setShowLoading(false);
        dispatch(getMyUser(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getMyUser = (data) => {
  return {
    type: Types.MY_USER,
    data,
  };
};

// ------------------------------------------------------ END GET MY USER ------------------------------------------------------


