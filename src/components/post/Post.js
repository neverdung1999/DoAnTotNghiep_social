/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./post.css";
import _ from "lodash";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import TimeStamp from "../../timeStamp";
import { Slide } from "react-slideshow-image";
import ReactHtmlParser from "react-html-parser";
import * as actions from "../../redux/actions/Index";
import DetailsPost from "../detailsPost/DetailsPost";
import { LinearProgress, CircularProgress } from "diginet-core-ui/components";

function Post(props) {
  const { dataPost } = props;
  const cookies = new Cookies();
  const idCookies = cookies.get("user");
  const [content, setContent] = useState("");
  const [isRender, setIsRender] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [dataNewsPost, setDataNewsPost] = useState(null);
  const [dataDetailsPost, setDataDetailsPost] = useState(null);
  const [showLoadingComment, setShowLoadingComment] = useState(false);
  const [openDataDetailsPost, setOpenDataDetailsPost] = useState(false);
  const [idPost, setIdPost] = useState("");

  useEffect(() => {
    // isRender && props.personalRequestById(setShowLoading, dataPost?.id_account);
    isRender && props.getPostRequest(setShowLoading, idCookies);
    setIsRender(false);
    setDataNewsPost(dataPost.reverse());
  }, [props, idCookies, isRender, dataPost?.id_account, dataPost]);

  const handleClickChoosePost = (data) => {
    setDataDetailsPost(data);
    setOpenDataDetailsPost(true);
  };

  const onCloseForm = (e) => {
    setOpenDataDetailsPost(e);
  };

  const handleChange = (e, idPost) => {
    setIdPost(idPost);
    const value = e.target.value;
    setContent(value);
  };

  const handleSubmit = (item) => {
    if (content !== "") {
      setShowLoadingComment(true);
      props.commentPostRequest(
        item?.id_post,
        item?.id_account,
        idCookies,
        content,
        ["testhehehe"],
        setShowLoading,
        setShowLoadingComment
      );
      setContent("");
    }
  };

  return (
    <div>
      {openDataDetailsPost && (
        <DetailsPost
          dataDetailsPost={dataDetailsPost}
          onCloseForm={onCloseForm}
        />
      )}
      {showLoading && (
        <LinearProgress
          color="#d82b7d"
          duration={1}
          height={3}
          percent={75}
          showValue
          valuePosition="top"
          style={{ position: "fixed", top: 0, left: 0, zIndex: 10000 }}
        />
      )}

      <div className="backgroundItem">
        {dataNewsPost?.map((item, index) => {
          return (
            <div key={index} className="backgroundItem_form">
              <div className="backgroundItem_form-top">
                <div className="formItem_top-left">
                  <img src={item?.accountImage} id="formItem_top-left" alt="" />
                </div>
                <div className="formItem_top-body">{item?.username}</div>
                <div className="formItem_top-right">
                  <i className="fas fa-ellipsis-h" id="formItem_top-right"></i>
                </div>
              </div>
              <div className="backgroundItem_form-body">
                <Slide
                  autoplay={false}
                  style={{ width: "100%", height: "100%" }}
                  transitionDuration={300}
                  arrows={item?.imageSrc?.length === 1 ? false : true}
                >
                  {!_.isEmpty(item?.imageSrc) &&
                    item?.imageSrc.map((image, index) => {
                      return (
                        <img
                          key={index}
                          src={image}
                          id="backgroundItem_form-body"
                          alt=""
                        />
                      );
                    })}
                </Slide>
              </div>
              <div className="backgroundItem_form-bottom">
                <div className="formItem_bottom-top">
                  <div className="bottomItem_top-top">
                    <i className="far fa-heart" id="topItem_top-left"></i>
                    <i className="far fa-comment" id="topItem_top-left"></i>
                    <i className="far fa-paper-plane" id="topItem_top-left"></i>
                  </div>
                  {_.size(item?.likes) !== 0 && (
                    <div
                      className="topItem_bottom-bottom"
                      style={{ marginBottom: -5 }}
                    >
                      <b>{_.size(item?.likes)} lượt thích</b>
                    </div>
                  )}

                  <div className="bottomItem_top-body">
                    <p id="bottomItem_top-body">
                      <b>{item?.username}</b>
                      {item?.content}
                    </p>
                  </div>
                  <div className="bottomItem_top-bottom">
                    {item?.comments.length !== 0 && (
                      <div
                        className="topItem_bottom-top"
                        onClick={() => handleClickChoosePost(item)}
                      >
                        Xem tất cả {item?.comments.length} bình luận
                      </div>
                    )}
                    {!_.isEmpty(item?.comments) && (
                      <div>
                        {item?.comments[item?.comments.length - 2] && (
                          <div className="topItem_bottom-bottom">
                            <b>
                              {
                                item?.comments[item?.comments.length - 2]
                                  ?.username
                              }
                            </b>
                            {ReactHtmlParser(
                              item?.comments[item?.comments.length - 2]?.content
                            )}
                          </div>
                        )}

                        {item?.comments[item?.comments.length - 1] && (
                          <div className="topItem_bottom-bottom">
                            <b>
                              {ReactHtmlParser(
                                item?.comments[item?.comments.length - 1]
                                  ?.username
                              )}
                            </b>
                            {item?.comments[item?.comments.length - 1]?.content}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="topItem_bottom-bottom">
                      <p id="topItem_bottom-bottom">
                        {TimeStamp(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="formItem_bottom-bottom">
                  <div className="bottomItem_bottom-left">
                    {idPost === item?.id_post
                      ? showLoadingComment && (
                          <CircularProgress
                            color="#f26e41"
                            direction="bottom"
                            percent={100}
                            percentColor="#0095ff"
                            size="extraSmall"
                            strokeWidth={10}
                            style={{
                              position: "absolute",
                              top: 15,
                              right: 28,
                              fontSize: 10,
                              zIndex: 10000,
                            }}
                          />
                        )
                      : null}
                    <textarea
                      name="comment"
                      id="bottomItem_bottom-left"
                      placeholder="Nhập bình luận..."
                      onChange={(e) => handleChange(e, item?.id_post)}
                      value={idPost === item?.id_post ? content : ""}
                    />
                  </div>
                  <div
                    className="bottomItem_bottom-right"
                    style={
                      idPost === item?.id_post
                        ? content === ""
                          ? { color: "#a7dafb" }
                          : { color: "rgba(var(--d69,0,149,246),1)" }
                        : { color: "#a7dafb" }
                    }
                    onClick={
                      idPost === item?.id_post ? () => handleSubmit(item) : null
                    }
                  >
                    Đăng
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataPost: state.Post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostRequest: (setShowLoading, id) => {
      dispatch(actions.getPostRequest(setShowLoading, id));
    },
    personalRequestById: (setShowLoading, id) => {
      dispatch(actions.personalRequestById(setShowLoading, id));
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
