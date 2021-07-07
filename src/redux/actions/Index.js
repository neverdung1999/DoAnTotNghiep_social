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

export const logOutRequest = (id) => {
  return async (dispatch) => {
    try {
      const results = await CallApi("PUT", `/user/signIn?id=${id}`, null);
      if (results?.status >= 200 && results?.status < 300) {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return {
    type: Types.LOGOUT_USER,
  };
};

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

// ------------------------------------------------------  PERSONAL USER ------------------------------------------------------

export const personalRequestById = (
  setShowLoading,
  id,
  setOpenContentFollow
) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("GET", `/user?id=${id}`, null);
      setShowLoading(false);
      setOpenContentFollow && setOpenContentFollow(false);
      dispatch(personalById(response, setShowLoading));
    } catch (error) {
      console.log(error);
    }
  };
};

export const personalById = (data, setShowLoading) => {
  return {
    type: Types.PERSONAL_USER_BY_ID,
    data,
    setShowLoading,
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

export const changeAvtRequest = (
  idUser,
  response,
  setShowLoading,
  username
) => {
  return (dispatch) => {
    return CallApi("PUT", "/user", {
      id: idUser,
      imageSrc: response,
    })
      .then((res) => {
        dispatch(personalRequest(setShowLoading, username));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// ------------------------------------------------------ END CHANGE AVT ------------------------------------------------------

// ------------------------------------------------------  REMOVE FRIEND ------------------------------------------------------

export const removeFriendRequest = (
  id,
  setShowLoading,
  setOpenFormUnfollow,
  setOpenContentFollow,
  usernameRequest
) => {
  return (dispatch) => {
    return CallApi(
      "DELETE",
      `/user/follow?myId=${idUser}&followingId=${id}`
    ).then((res) => {
      setOpenFormUnfollow(false);
      setOpenContentFollow && setOpenContentFollow(false);
      dispatch(
        personalRequestById(
          setShowLoading,
          usernameRequest === username ? idUser : id,
          setOpenContentFollow
        )
      );
    });
  };
};

// ------------------------------------------------------ END REMOVE FRIEND ------------------------------------------------------

// ------------------------------------------------------  FOLLOW FRIEND ------------------------------------------------------

export const followFriendRequest = (id, setShowLoading, usernameFriend) => {
  return (dispatch) => {
    return CallApi("POST", `/user/follow?myId=${idUser}&followingId=${id}`)
      .then((res) => {
        res?.status === 200 &&
          dispatch(
            personalRequestById(
              setShowLoading,
              usernameFriend === username ? idUser : id
            )
          );
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

// ------------------------------------------------------ SUGGESTED USER ------------------------------------------------------

export const suggestedAccountRequest = () => {
  return (dispatch) => {
    return CallApi("GET", `/user/suggestedAccounts?id=${idUser}`, null).then(
      (res) => {
        dispatch(suggestedAccounts(res));
      }
    );
  };
};

export const suggestedAccounts = (data) => {
  return {
    type: Types.SUGGESTED_ACCOUNTS,
    data,
  };
};

// ------------------------------------------------------ END SUGGESTED USER ------------------------------------------------------

// ------------------------------------------------------ POST ------------------------------------------------------

export const postNewRequest = (
  id,
  img,
  content,
  setShowLoading,
  setOpenFormAddNews
) => {
  return (dispatch) => {
    return CallApi("POST", "/post", {
      id_account: id,
      imageSrc: img,
      content: content,
    }).then((response) => {
      setOpenFormAddNews(false);
      if (response.data === "success") {
        dispatch(getPostRequestById(setShowLoading, id));
      }
    });
  };
};

// ------------------------------------------------------ GET POST ------------------------------------------------------

export const getDetailsPostRequest = (
  setShowLoading,
  id,
  setShowLoadingComment
) => {
  return (dispatch) => {
    return CallApi("GET", `/post?id=${id}`)
      .then((res) => {
        setShowLoadingComment(false);
        setShowLoading(false);
        dispatch(getPost(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getPostRequest = (setShowLoading, id) => {
  return (dispatch) => {
    return CallApi("GET", `/post?id=${id}`)
      .then((res) => {
        setShowLoading && setShowLoading(false);
        dispatch(getPost(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getPost = (data) => {
  return {
    type: Types.GET_POST,
    data,
  };
};

// ------------------------------------------------------ GET POST BY ID ------------------------------------------------------

export const getPostRequestById = (setShowLoading, id) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("GET", `/post/byId?accountId=${id}`, null);
      setShowLoading(false);
      dispatch(getPostById(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostById = (data) => {
  return {
    type: Types.GET_POST_BY_ID,
    data,
  };
};

// ------------------------------------------------------ GET POST BY ID POST --------------------------------------------------------------

export const getPostRequestByIdPost = (
  setShowLoading,
  idPost,
  setShowLoadingComment
) => {
  return async (dispatch) => {
    try {
      const response = await CallApi(
        "GET",
        `/post/byId?postId=${idPost}`,
        null
      );
      setShowLoading(false);
      setShowLoadingComment && setShowLoadingComment(false);
      dispatch(getPostDetailsIndex(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostDetailsIndex = (data) => {
  return {
    type: Types.GET_DETAILS_POST_INDEX,
    data,
  };
};

export const getPostDetails = (data) => {
  return {
    type: Types.GET_DETAILS_POST,
    data,
  };
};

export const getPostDetailsComment = (data) => {
  return {
    type: Types.GET_DETAILS_POST_COMMENT,
    data,
  };
};

// ------------------------------------------------------ UPDATE POST ------------------------------------------------------

export const updatePostRequest = (
  id,
  img,
  content,
  setShowLoading,
  setOpenFormAddNews
) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("PUT", "/post", {
        id_account: id,
        imageSrc: img,
        content: content,
      });
      setOpenFormAddNews(false);
      if (response.data === "success") {
        dispatch(getPostRequest(setShowLoading, id));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ------------------------------------------------------ END POST ------------------------------------------------------

// ------------------------------------------------------  COMMENT ------------------------------------------------------

export const commentPostRequest = (
  idPost,
  idOwner,
  idAccount,
  content,
  mentionList,
  setShowLoadingComment,
  typeComment
) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("POST", "/post/comment", {
        id_post: idPost,
        id_owner: idOwner,
        id_account: idAccount,
        contentHtml: content,
        mentionList: mentionList,
      });
      if (typeComment === "post") {
        dispatch(getPostRequestByIdPostTest(idPost, setShowLoadingComment));
      } else {
        setShowLoadingComment && setShowLoadingComment(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const commentReplyPostRequest = (
  idPost,
  idOwner,
  idComment,
  idAccount,
  content,
  mentionList,
  setShowLoadingComment
) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("POST", "/post/replyComment", {
        id_post: idPost,
        id_owner: idOwner,
        id_comment: idComment,
        id_account: idAccount,
        contentHtml: content,
        mentionList: mentionList,
      });
      console.log(response);
      setShowLoadingComment && setShowLoadingComment(false);
      // dispatch(
      //   getPostRequestByIdPost(setShowLoading, idPost, setShowLoadingComment)
      // );
    } catch (error) {
      console.log(error);
    }
  };
};

// ------------------------------------------------------ LIKE POST ------------------------------------------------------

export const likePostRequest = (idPost, idOwner, idCookies) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("POST", "/post/like", {
        id_post: idPost,
        id_owner: idOwner,
        id_account: idCookies,
      });
      // dispatch(getPostRequestByIdPostTest(idPost));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostRequestByIdPostTest = (idPost, setShowLoadingComment) => {
  return async (dispatch) => {
    try {
      console.log(idPost);
      const response = await CallApi(
        "GET",
        `/post/byId?postId=${idPost}`,
        null
      );
      setShowLoadingComment && setShowLoadingComment(false);
      dispatch(getPostDetails(response?.data));
      dispatch(getPostDetailsIndex(response?.data));
      dispatch(getPostDetailsComment(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
};
