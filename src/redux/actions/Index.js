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
        console.log(res);
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

export const logOutRequest = (id, setIsOpenHeader) => {
  return async (dispatch) => {
    try {
      const results = await CallApi("PUT", `/user/signIn?id=${id}`, null);
      if (results?.status >= 200 && results?.status < 300) {
        dispatch(logoutUser(setIsOpenHeader));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = (setIsOpenHeader) => {
  return {
    type: Types.LOGOUT_USER,
    setIsOpenHeader,
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

export const getPersonalByMeRequest = (setShowLoading, username) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("GET", `/user?username=${username}`, null);
      // setShowLoading(false);
      if (response?.status === 200) {
        dispatch(getPersonalByMe(response?.data));
        dispatch(getPostRequestById(setShowLoading, response?.data?.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPersonalByMe = (data) => {
  return {
    type: Types.GET_MY_PERSONAL,
    data,
  };
};

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
    console.log(username);
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
  reponseObject,
  setShowLoading,
  username,
  setValueToast,
  setOpenToast,
  setShowLoadingCirular
) => {
  return async (dispatch) => {
    try {
      console.log(reponseObject);
      const response = await CallApi("PUT", "/user", reponseObject);
      setOpenToast(true);
      if (response?.data === "success") {
        setValueToast &&
          setValueToast({
            text: "Cập nhật dữ liệu thành công",
          });
        dispatch(
          getPersonalByMeRequest(
            setShowLoading,
            reponseObject?.username ? reponseObject?.username : username
          )
        );
      } else {
        setValueToast({
          text: "Cập nhật dữ liệu thất bại",
        });
      }
      setTimeout(() => {
        setOpenToast(false);
      }, 5000);
      setShowLoadingCirular && setShowLoadingCirular(false);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getValueToast = (setValueToast) => {
  return {
    type: Types.VALUE_TOAST,
    setValueToast,
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

// ------------------------------------------------------ SUGGESTED USER ------------------------------------------------------

export const suggestedAccountRequest = (id) => {
  return (dispatch) => {
    console.log(id);
    return CallApi("GET", `/user/suggestedAccounts?id=${id}`, null).then(
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
  setOpenFormAddNews,
  setOpenToast,
  setValueToast
) => {
  return (dispatch) => {
    return CallApi("POST", "/post", {
      id_account: id,
      imageSrc: img,
      content: content,
    }).then((response) => {
      setOpenFormAddNews(false);
      if (response.data === "success") {
        setOpenToast && setOpenToast(true);
        setValueToast && setValueToast({ text: "Thêm bài viết thành công" });
        setTimeout(() => {
          setOpenToast && setOpenToast(false);
        }, 6000);
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
        if (res?.status === 200) {
          dispatch(getPost(res?.data));
          dispatch(suggestedAccountRequest(id));
        }
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
      console.log(id);
      const response = await CallApi("GET", `/post/byId?accountId=${id}`, null);
      console.log(response);
      setShowLoading(false);
      if (response?.status === 200) {
        dispatch(getPostById(response?.data));
      }
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
      // setShowLoading(false);
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

export const getPostDetails = (data, typePost) => {
  return {
    type: Types.GET_DETAILS_POST,
    data,
    typePost,
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
  setOpenFormAddNews,
  setOpenUiUpdatePost,
  idUser,
  setOpenToast,
  setValueToast
) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("PUT", "/post", {
        id_post: id,
        imageSrc: img,
        content: content,
      });
      setOpenFormAddNews && setOpenFormAddNews(false);
      setOpenUiUpdatePost && setOpenUiUpdatePost(false);
      if (response.data === "success") {
        setOpenToast && setOpenToast(true);
        setValueToast &&
          setValueToast({ text: "Cập nhật bài viết thành công" });
        setTimeout(() => {
          setOpenToast && setOpenToast(false);
        }, 6000);
        dispatch(getPostRequest(setShowLoading, idUser));
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
  setShowLoadingComment
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
      if (response?.status >= 200 && response?.status < 300) {
        dispatch(
          getPostRequestByIdPostTest(
            idPost,
            setShowLoadingComment,
            "commentPost"
          )
        );
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
      response?.status >= 200 &&
        response?.status < 300 &&
        setShowLoadingComment &&
        setShowLoadingComment(false);
      // dispatch(
      //   getPostRequestByIdPost(setShowLoading, idPost, setShowLoadingComment)
      // );
    } catch (error) {
      console.log(error);
    }
  };
};

// ------------------------------------------------------ LIKE POST ------------------------------------------------------

export const likePostRequest = (
  idPost,
  idOwner,
  idCookies,
  typePost,
  setShowLoadingComment
) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("POST", "/post/like", {
        id_post: idPost,
        id_owner: idOwner,
        id_account: idCookies,
      });
      response?.status >= 200 &&
        response?.status < 300 &&
        dispatch(
          getPostRequestByIdPostTest(
            idPost,
            setShowLoadingComment,
            "likePost",
            typePost
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostRequestByIdPostTest = (
  idPost,
  setShowLoadingComment,
  type,
  typePost
) => {
  return async (dispatch) => {
    try {
      const response = await CallApi(
        "GET",
        `/post/byId?postId=${idPost}`,
        null
      );
      setShowLoadingComment && setShowLoadingComment(false);
      if (type === "likePost") {
        dispatch(getPostDetails(response?.data, typePost)); //allPost
        dispatch(getPostDetailsIndex(response?.data)); //byIdPost
      }
      type === "commentPost" && dispatch(getPostDetailsComment(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
};

// ------------------------------------------------------ GET ALL USER ------------------------------------------------------

export const getAllUserRequest = () => {
  return async (dispatch) => {
    try {
      const response = await CallApi("GET", "/user/getAll", null);
      response?.status >= 200 &&
        response?.status < 300 &&
        dispatch(getAllUser(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUser = (data) => {
  return {
    type: Types.ALL_USER,
    data,
  };
};

// ------------------------------------------------------ EDIT PERSONAL_USER ------------------------------------------------------

// ------------------------------------------------------ DELETE POST ------------------------------------------------------

export const deletePostRequest = (
  idPost,
  idAccount,
  setOpenUiUpdatePost,
  setOpenDetailsPost,
  setShowLoading,
  setOpenToast,
  setValueToast
) => {
  return async (dispatch) => {
    try {
      const response = await CallApi("DELETE", "/post", {
        id_post: idPost,
        id_account: idAccount,
      });
      setShowLoading && setShowLoading(false);
      if (response?.status === 200) {
        setOpenUiUpdatePost && setOpenUiUpdatePost(false);
        setOpenDetailsPost && setOpenDetailsPost(false);
        setOpenToast && setOpenToast(true);
        setValueToast &&
          setValueToast({
            text: "Xóa bài viết thành công",
          });
        setTimeout(() => {
          setOpenToast && setOpenToast(false);
        }, 6000);
        dispatch(getPostRequestById(setShowLoading, idAccount));
      } else {
        setTimeout(() => {
          setValueToast &&
            setValueToast({
              text: "Xóa bài viết thất bại",
            });
        }, 6000);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ------------------------------------------------------ DELETE COMMENT POST ------------------------------------------------------

export const removeCommentRequest = (
  idPost,
  idAccount,
  idComment,
  idReply,
  setOpenUpdateCmt,
  setShowLoading,
  setOpenToastDetails,
  setValueToastDetails
) => {
  return async () => {
    const response = await CallApi("DELETE", "/post/comment", {
      id_post: idPost,
      id_account: idAccount,
      id_comment: idComment,
      id_reply: idReply,
    });
    console.log(response);
    if (response?.status === 200) {
      setShowLoading && setShowLoading(false);
      setOpenUpdateCmt && setOpenUpdateCmt(false);
      setOpenToastDetails && setOpenToastDetails(true);
      setValueToastDetails &&
        setValueToastDetails({ text: "Xóa bình luận thành công" });
      setTimeout(() => {
        setOpenToastDetails && setOpenToastDetails(false);
      }, 6000);
    } else {
      setOpenToastDetails && setOpenToastDetails(true);
      setValueToastDetails &&
        setValueToastDetails({ text: "Xóa bình luận thất bại" });
      setTimeout(() => {
        setOpenToastDetails && setOpenToastDetails(false);
      }, 6000);
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };
};
