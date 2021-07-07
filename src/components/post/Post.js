/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./post.css";
import _ from "lodash";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import TimeStamp from "../../timeStamp";
import { db } from "../../services/firebase";
import { Slide } from "react-slideshow-image";
import ReactHtmlParser from "react-html-parser";
import * as actions from "../../redux/actions/Index";
import DetailsPost from "../detailsPost/DetailsPost";
import CardLoading from "../animation/cardLoading/CardLoading";
import { LinearProgress, CircularProgress } from "diginet-core-ui/components";

function Post(props) {
  const { dataPost } = props;
  const cookies = new Cookies();
  const idCookies = cookies.get("user");
  const [idPost, setIdPost] = useState("");
  const [content, setContent] = useState("");
  const [isRender, setIsRender] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [dataNewsPost, setDataNewsPost] = useState(null);
  const [dataDetailsPost, setDataDetailsPost] = useState(null);
  const [showLoadingComment, setShowLoadingComment] = useState(false);
  const [openDataDetailsPost, setOpenDataDetailsPost] = useState(false);
  const [likePost, setLikePost] = useState([]);
  const [contentChat, setContentChat] = useState([]);
  const [countComment, setCountComment] = useState([]);

  useEffect(() => {
    isRender && props.getPostRequest(setShowLoading, idCookies);
    setIsRender(false);
    setDataNewsPost(dataPost);
    let arrTemp = [];
    dataPost?.forEach((item) => {
      if (item?.likes) {
        for (const [key] of Object.entries(item.likes)) {
          if (key === idCookies) {
            arrTemp.push(item?.id_post);
          }
        }
      }
    });
    setLikePost(_.uniqWith(arrTemp, _.isEqual));
  }, [props, idCookies, isRender, dataPost?.id_account, dataPost, idPost]);

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
        [item?.id_account],
        setShowLoadingComment,
        "post"
      );
      setContent("");

      setCountComment([...countComment, content]);

      try {
        const ref = db.ref("/social_network");
        const usersRef = ref.child("users");
        const postsRef = ref.child("posts");

        const getUser = async (id) => {
          let data = {};
          if (id === undefined) return data;
          await usersRef.child(id).once("value", (snap) => {
            if (snap.val() !== null) {
              const { username, imageSrc } = snap.val();
              data = { username, accountImage: imageSrc };
            }
          });
          return data;
        };

        const fetchDataComment = async () => {
          const arrTempChatTemp = [];
          postsRef
            .child(`${idPost}/comments`)
            .on("child_added", async (snapshot) => {
              const { id_account: userId } = snapshot.val();
              const test = [];
              let getData = await getUser(userId);
              let data = { ...snapshot.val(), ...getData, id_post: idPost };
              arrTempChatTemp.push(data);
              arrTempChatTemp?.forEach((item) => {
                test.push(item);
              });
              setContentChat(_.sortBy(test, "timestamp"));
            });
        };
        fetchDataComment();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLikePost = (idPost, idOwner) => {
    let removeItem = [];
    removeItem = [...likePost, idPost];

    if (likePost.includes(idPost)) {
      removeItem = likePost.filter((e) => e !== idPost);
    }
    setLikePost(removeItem);
    props.likePostRequest(idPost, idOwner, idCookies, setShowLoading);
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
        {showLoading && <CardLoading actionTypes="post" />}
        {!showLoading &&
          dataNewsPost?.map((item, index) => {
            return (
              <div key={index} className="backgroundItem_form">
                <div className="backgroundItem_form-top">
                  <div className="formItem_top-left">
                    <Link
                      to={{
                        pathname: `/personal/${item?.username}`,
                        state: item,
                      }}
                    >
                      <img
                        src={item?.accountImage}
                        id="formItem_top-left"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="formItem_top-body">
                    <Link
                      to={{
                        pathname: `/personal/${item?.username}`,
                        state: item,
                      }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {item?.username}
                    </Link>
                  </div>
                  <div className="formItem_top-right">
                    <i
                      className="fas fa-ellipsis-h"
                      id="formItem_top-right"
                    ></i>
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
                      item?.imageSrc?.map((image, index) => {
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
                      <i
                        className="far fa-heart"
                        id="topItem_top-left"
                        onClick={() =>
                          handleLikePost(item?.id_post, item?.id_account)
                        }
                        style={
                          likePost.includes(item.id_post)
                            ? { fontWeight: "bold", color: "rgb(237, 73, 86)" }
                            : null
                        }
                      ></i>
                      <i className="far fa-comment" id="topItem_top-left"></i>
                      <i
                        className="far fa-paper-plane"
                        id="topItem_top-left"
                      ></i>
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
                                item?.comments[item?.comments.length - 2]
                                  ?.content
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
                              {
                                item?.comments[item?.comments.length - 1]
                                  ?.content
                              }
                            </div>
                          )}
                        </div>
                      )}

                      {/* {countComment?.map((comment, index) => {
                        const arrAsc = _.orderBy(
                          contentChat,
                          ["timestamp"],
                          ["desc"]
                        );
                        console.log(arrAsc);
                        return (
                          <div key={index}>
                            {item?.id_post ===
                              arrAsc[countComment.length - (index + 1)]
                                ?.id_post && (
                              <div className="topItem_bottom-bottom">
                                <b>
                                  {ReactHtmlParser(
                                    arrAsc[countComment.length - (index + 1)]
                                      ?.username
                                  )}
                                </b>
                                {
                                  arrAsc[countComment.length - (index + 1)]
                                    ?.content
                                }
                              </div>
                            )}
                          </div>
                        );
                      })} */}
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
                        idPost === item?.id_post
                          ? () => handleSubmit(item)
                          : null
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
    likePostRequest: (idPost, idOwner, idCookies) => {
      dispatch(actions.likePostRequest(idPost, idOwner, idCookies));
    },
    commentPostRequest: (
      idPost,
      idOwner,
      idAccount,
      content,
      mentionList,
      setShowLoadingComment,
      typeComment
    ) => {
      dispatch(
        actions.commentPostRequest(
          idPost,
          idOwner,
          idAccount,
          content,
          mentionList,
          setShowLoadingComment,
          typeComment
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
