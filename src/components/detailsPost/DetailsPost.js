/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./detailsPost.css";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import TimeStamp from "../../timeStamp";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ReactHtmlParser from "react-html-parser";
import * as actions from "../../redux/actions/Index";
import { CircularProgress } from "diginet-core-ui/components";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";
import UiUpdatePost from "../uiUpdatePost/UiUpdatePost";

function DetailsPost(props) {
  const { dataDetailsPost, getDetailPost } = props;
  const cookies = new Cookies();
  const idCookies = cookies.get("user");
  const [isRender, setIsRender] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [contentMessage, setContentMessage] = useState("");
  const [dataDetailPost, setDataDetailsPost] = useState(null);
  const [openUiUpdatePost, setOpenUiUpdatePost] = useState(false);
  const [showLoadingComment, setShowLoadingComment] = useState(false);
  const [dataUserReply, setDataUserReply] = useState({
    id: "",
    idComment: "",
    username: "",
  });

  useEffect(() => {
    const idPost = dataDetailsPost?.id_post;
    isRender && props.getPostRequestByIdPost(setShowLoading, idPost);
    setIsRender(false);
    setDataDetailsPost(getDetailPost[0]);
  }, [
    isRender,
    dataDetailsPost?.id_account,
    idCookies,
    props,
    dataDetailsPost?.id_post,
    getDetailPost,
  ]);

  console.log(getDetailPost[0]);

  const onCloseFrom = () => {
    props.onCloseForm();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setContentMessage(value);
  };

  const handleReplyComment = (data, idRoomOld) => {
    setDataUserReply({
      id: data?.id_account,
      idComment: idRoomOld ? idRoomOld : data?.id,
      username: data?.username,
    });
  };

  const onCloseFormReply = () => {
    setDataUserReply({
      id: "",
      idComment: "",
      username: "",
    });
  };

  const handleOpenFormUpdate = () => {
    setOpenUiUpdatePost(true);
  };

  const onCloseForm = (e) => {
    setOpenUiUpdatePost(e);
  };

  const handleSubmit = () => {
    setShowLoadingComment(true);
    dataUserReply.id === ""
      ? props.commentPostRequest(
          //post new comment
          dataDetailsPost?.id_post,
          dataDetailsPost?.id_account,
          idCookies,
          contentMessage,
          ["testTruoc"],
          setShowLoading,
          setShowLoadingComment
        )
      : props.commentReplyPostRequest(
          //reply comment
          dataDetailPost?.id_post,
          dataUserReply?.id,
          dataUserReply?.idComment,
          idCookies,
          `@<a href="personal/${dataUserReply?.username}">${dataUserReply?.username}</a> ${contentMessage}`,
          [dataUserReply?.id],
          setShowLoading,
          setShowLoadingComment
        );
    setContentMessage("");
    setDataUserReply({
      id: "",
      idComment: "",
      username: "",
    });
  };

  return (
    <div>
      {showLoading && <GlobalLoading />}
      {openUiUpdatePost && (
        <UiUpdatePost
          onCloseForm={onCloseForm}
          dataDetailPost={dataDetailPost}
        />
      )}
      <div className="backgroundPost">
        <i
          className="fas fa-times"
          id="iconClosePost"
          onClick={() => onCloseFrom()}
        ></i>
        <div className="backgroundPost_form">
          <div className="backgroundPost_form-left">
            <Slide
              autoplay={false}
              style={{ width: "100%", height: "100%" }}
              transitionDuration={300}
              arrows={dataDetailPost?.imageSrc?.lenght === 1 ? false : true}
            >
              {dataDetailPost?.imageSrc?.map((item, index) => {
                return (
                  <img
                    key={index}
                    src={item}
                    alt=""
                    id="backgroundPost_form-left"
                  />
                );
              })}
            </Slide>
          </div>
          <div className="backgroundPost_form-right">
            <div className="form_right-top">
              <div className="right_top-avt">
                <img
                  src={dataDetailPost?.accountImage}
                  alt=""
                  id="right_top-avt"
                />
              </div>
              <div className="right_top-title">{dataDetailPost?.username}</div>
              {dataDetailPost?.id_account === idCookies && (
                <div className="right_top-function">
                  <i
                    className="fas fa-ellipsis-v"
                    id="right_top-function"
                    onClick={() => handleOpenFormUpdate()}
                  ></i>
                </div>
              )}
            </div>
            <div
              className={
                dataUserReply.id !== ""
                  ? "form_right-body-reply"
                  : "form_right-body"
              }
            >
              <div className="right_body-item">
                <div className="body_item-left">
                  <img
                    src={dataDetailPost?.accountImage}
                    alt=""
                    id="body_item-left"
                  />
                </div>
                <div className="body_item-right">
                  <div className="item_right-name">
                    <a href="#" id="right_name-a">
                      {dataDetailPost?.username}
                    </a>
                    <p id="right_name-p">{dataDetailPost?.content}</p>
                    <span id="right_name-span">
                      {" "}
                      {TimeStamp(dataDetailPost?.timestamp)}{" "}
                    </span>
                  </div>
                </div>
              </div>
              {dataDetailPost?.comments?.map((content, index) => {
                return (
                  <div className="right_body-comment" key={index}>
                    <div className="body_comment-user">
                      <div className="comment_user-left">
                        <img
                          src={content?.accountImage}
                          alt=""
                          id="user_left-img"
                        />
                      </div>
                      <div className="comment_user-right">
                        <div className="user_right-comment">
                          <div className="right_comment-top">
                            <a href="#" id="user_right-a">
                              {content?.username}
                            </a>
                            <p id="user_right-p">
                              {ReactHtmlParser(content?.content)}
                            </p>
                          </div>
                          <div className="right_comment-bottom">
                            <p id="comment_bottom-time">
                              {TimeStamp(content?.timestamp)}
                            </p>
                            <span id="comment_bottom-heart">1 lượt thích</span>
                            <span
                              id="comment_bottom-reply"
                              onClick={() => handleReplyComment(content)}
                            >
                              Trả lời
                            </span>
                          </div>
                        </div>
                        <div className="user_right-heart">
                          <i className="far fa-heart" id="right_heart-icon"></i>
                        </div>
                      </div>
                    </div>
                    {content?.reply && (
                      <div className="reply_comment">
                        <div className="reply_comment-left"></div>
                        <div className="reply_comment-right">
                          {/* <a href="#" id="comment_right-a">
                            ---- Xem câu trả lời
                          </a> */}
                          {content?.reply &&
                            content?.reply?.map((item, index) => {
                              return (
                                <div key={index} style={{ marginTop: "15px" }}>
                                  <div className="comment_right-all">
                                    <div className="right_all-left">
                                      <img
                                        src={item?.accountImage}
                                        alt=""
                                        id="all_left-img"
                                      />
                                    </div>
                                    <div className="right_all-right">
                                      <div className="all_right-comment">
                                        <p id="all_right-content">
                                          <b>{item?.username}</b>
                                          <br />
                                          {ReactHtmlParser(item?.content)}
                                        </p>
                                      </div>
                                      <div className="all_right-heart">
                                        <i
                                          className="far fa-heart"
                                          id="right_heart-icon"
                                        ></i>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="right_comment-bottom-reply"
                                    style={{ marginLeft: 43 }}
                                  >
                                    <p id="comment_bottom-time">
                                      {" "}
                                      {TimeStamp(item?.timestamp)}
                                    </p>
                                    <span id="comment_bottom-heart">
                                      1 lượt thích
                                    </span>
                                    <span
                                      id="comment_bottom-reply"
                                      onClick={() =>
                                        handleReplyComment(item, content?.id)
                                      }
                                    >
                                      Trả lời
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              className={
                dataUserReply.id !== ""
                  ? "form_right-bottom-reply"
                  : "form_right-bottom"
              }
            >
              <div
                className="right_bottom-top"
                style={
                  dataUserReply.id !== ""
                    ? { height: "50%" }
                    : { height: " 70%" }
                }
              >
                <div className="bottom_top-top">
                  <div className="top_top-itemLeft">
                    <i className="far fa-heart" id="top_top-item"></i>
                    <i className="far fa-comment" id="top_top-item"></i>
                    <i className="far fa-paper-plane" id="top_top-item"></i>
                  </div>
                  <div className="top_top-itemRight">
                    <i className="far fa-calendar-check" id="top_top-item"></i>
                  </div>
                </div>
                <div className="bottom_top-body">
                  <p id="top_body-heart">
                    {_.size(dataDetailPost?.likes)} lượt thích
                  </p>
                </div>
                <div className="bottom_top-bottom">
                  <p id="top_body-time">
                    {TimeStamp(dataDetailPost?.timestamp)}
                  </p>
                </div>
              </div>
              {dataUserReply.id !== "" ? (
                <div className="bottom_bottom-showUser">
                  <i
                    className="fas fa-times"
                    id="bottom_showUser-close"
                    onClick={() => onCloseFormReply()}
                  ></i>
                  Đang trả lời: <b>{dataUserReply?.username}</b>
                </div>
              ) : (
                <div></div>
              )}

              <div
                className="right_bottom-bottom"
                style={dataUserReply ? { height: "25%" } : { height: "30%" }}
              >
                <div className="bottom_bottom-left">
                  {showLoadingComment && (
                    <CircularProgress
                      color="#f26e41"
                      direction="bottom"
                      percent={100}
                      percentColor="#0095ff"
                      size="extraSmall"
                      strokeWidth={10}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: 10,
                        zIndex: 10000,
                      }}
                    />
                  )}
                  <textarea
                    name=""
                    cols="30"
                    rows="10"
                    id="bottom_left-input"
                    placeholder="Nhập bình luận..."
                    onChange={(e) => handleChange(e)}
                    value={contentMessage}
                  ></textarea>
                </div>
                <div
                  className="bottom_bottom-right"
                  onClick={() => handleSubmit()}
                >
                  Đăng
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getDetailPost: state.DetailsPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostRequestByIdPost: (setShowLoading, idPost) => {
      dispatch(actions.getPostRequestByIdPost(setShowLoading, idPost));
    },
    commentPostRequest: (
      idPost,
      idOwner,
      idAccount,
      content,
      mentionList,
      setShowLoading,
      setShowLoadingComment
    ) => {
      dispatch(
        actions.commentPostRequest(
          idPost,
          idOwner,
          idAccount,
          content,
          mentionList,
          setShowLoading,
          setShowLoadingComment
        )
      );
    },
    commentReplyPostRequest: (
      idPost,
      idOwner,
      idComment,
      idAccount,
      content,
      mentionList,
      setShowLoading,
      setShowLoadingComment
    ) => {
      dispatch(
        actions.commentReplyPostRequest(
          idPost,
          idOwner,
          idComment,
          idAccount,
          content,
          mentionList,
          setShowLoading,
          setShowLoadingComment
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPost);
