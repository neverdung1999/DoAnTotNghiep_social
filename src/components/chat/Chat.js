import React, { useEffect, useState } from "react";
import "./chat.css";
import _ from "lodash";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { db } from "../../services/firebase";
import ScrollToBottom from "react-scroll-to-bottom";
import * as actions from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

let arrImg = [];

function Chat(props) {
  const { history } = props;
  const cookies = new Cookies();
  const [chat, setChat] = useState([]);
  const idUser = cookies.get("user");
  const dataCookies = cookies.get("data");
  const username = cookies.get("username");
  const [content, setContent] = useState("");
  const [imgChoose, setImgChoose] = useState(null);
  const [dataFriend, setDataFriend] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [colorChoose, setColorChoose] = useState(null);
  const [dataUserChoose, setDataUserChoose] = useState(null);

  console.log(chat);

  useEffect(() => {
    const stateHistory = history?.location?.state;
    stateHistory && setDataUserChoose(stateHistory);
    try {
      props.personalRequest(setShowLoading, username);
      const dataAssign = Object.assign(
        dataCookies?.following,
        dataCookies.followers
      );
      setDataFriend(_.uniqWith(dataAssign, _.isEqual));
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChat({ chats });
      });
    } catch (error) {
      console.log(error);
    }
  }, [imgChoose]);

  const handleChangeImg = (e) => {
    const value = e.target.files;
    setShowLoading(true);
    if (value.length > 1) {
      for (let i = 0; i < value.length; i++) {
        callApiImage(value[i]);
      }
    } else {
      callApiImage(value[0]);
    }
  };


  const callApiImage = (value) => {
    const formData = new FormData();
    formData.append("file", value);
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };
    fetch("https://api.Cloudinary.com/v1_1/baby-dont-cry/image/upload", options)
      .then((response) => response.json())
      .then((response) => {
        arrImg.push(response.url);
        setShowLoading(false);
        setImgChoose(arrImg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      content !== "" &&
        (await db.ref("chats").push({
          idUser: idUser,
          idOthers: dataUserChoose.id_account,
          content: content,
          image: imgChoose,
          timestamp: Date.now(),
        }));
      setContent("");
      setImgChoose(null);
      arrImg = [];
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUser = (item, index) => {
    setDataUserChoose(item);
    setColorChoose(item.id_account);
  };

  const onCloseShowImg = () => {
    setImgChoose(null);
    arrImg = [];
  };

  return (
    <div>
      <GlobalLoading showLoading={showLoading} />
      <div className="contentChat">
        <div className="container-contentChat">
          <div className="contentChat-left">
            <div className="contentChat-top-left">
              <div className="contentChat-top-name">
                <p id="p-contentChat-top-name">{username}</p>
              </div>
            </div>
            <div className="contentChat-bottom-left">
              {dataFriend.map((item, index) => {
                return (
                  <div
                    className="item-leftChat"
                    key={index}
                    onClick={() => handleClickUser(item, index)}
                    style={
                      colorChoose === item.id_account
                        ? { backgroundColor: "#efefef" }
                        : null
                    }
                  >
                    <div className="item-leftChat-left">
                      <img src={item?.imageSrc} alt="" id="img-chat" />
                    </div>
                    <div className="item-leftChat-right">
                      <p id="p-item-leftChat-right">{item?.username}</p>
                      <span id="span-item-leftChat-right">{item?.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ----------------------------------------- CONTENT RIGHT -----------------------------------------  */}

          {dataUserChoose && dataFriend.length !== 0 ? (
            <div className="contentChat-right">
              <div className="contentChat_right-top">
                <div className="rightChat_top-left">
                  <div className="topChat_left-avt">
                    <img
                      src={dataUserChoose?.imageSrc}
                      id="topChat_left-avt"
                      alt=""
                    />
                  </div>
                  <div className="topChat_left-name">
                    <div className="leftChat_name-top">
                      {dataUserChoose?.username}
                    </div>
                    <div className="leftChat_name-bottom">
                      {dataUserChoose?.name}
                    </div>
                  </div>
                </div>
                <div className="rightChat_top-right">
                  <i
                    className="fas fa-info-circle"
                    id="rightChat_top-right"
                  ></i>
                </div>
              </div>
              <div className="contentChat_right-bottom">
                <ScrollToBottom
                  className={
                    imgChoose
                      ? "rightChat_bottom-showImgChoose"
                      : "rightChat_bottom-top"
                  }
                >
                  {chat?.chats?.map((item, index) => {
                    return (
                      <div key={index}>
                        {(dataUserChoose.id
                          ? dataUserChoose.id
                          : dataUserChoose.id_account) === item?.idUser &&
                          idUser === item?.idOthers && (
                            <div className="content-message-left">
                              <div className="p-content">
                                <p id="p-content">{item.content}</p>
                              </div>

                              {item?.image?.map((value, index) => {
                                return (
                                  <div className="img_content-left" key={index}>
                                    <img
                                      src={value}
                                      alt=""
                                      id="img_content-left"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}

                        {idUser === item?.idUser &&
                          (dataUserChoose.id
                            ? dataUserChoose.id
                            : dataUserChoose.id_account) === item.idOthers && (
                            <div>
                              <div className="wrapper_content">
                                <div className="p-content">
                                  <p id="p-content">{item.content}</p>
                                </div>
                              </div>
                              {item?.image?.map((value, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="img_content-right"
                                  >
                                    <img
                                      src={value}
                                      alt=""
                                      id="img_content-right"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </ScrollToBottom>
                <div
                  className={imgChoose ? "showImgChoose" : "hiddenImgChoose"}
                >
                  <div className="showImgChoose_wrapper-close">
                    <i
                      className="fas fa-times"
                      id="wrapper_close"
                      onClick={() => onCloseShowImg()}
                    ></i>
                  </div>
                  <div className="showImgChoose_wrapper">
                    {imgChoose?.map((item, index) => {
                      return (
                        <div className="showImgChoose_img" key={index}>
                          <img src={item} id="showImgChoose_img" alt="" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="rightChat_bottom-bottom">
                  <form onSubmit={handleSubmit}>
                    <div className="bottomChat_bottom-wrap">
                      <div className="bottomChat_wrap-left">
                        <i
                          className="far fa-smile"
                          id="bottomChat_wrap-left"
                        ></i>
                      </div>
                      <div className="bottomChat_wrap-body">
                        <textarea
                          name=""
                          id="textarea-chat"
                          placeholder="Nhắn tin...."
                          onChange={(e) => handleChange(e)}
                          value={content}
                          onKeyDown={onEnterPress}
                        ></textarea>
                      </div>
                      <div className="bottomChat_wrap-right">
                        <label className="lblImageChat">
                          <input
                            type="file"
                            style={{ opacity: 0 }}
                            multiple
                            onChange={handleChangeImg}
                          />
                          <i className="fas fa-images" id="icon-chat-right"></i>
                        </label>

                        <button type="submit" id="btn_submitChat">
                          <i
                            className="fas fa-paper-plane"
                            id="icon-chat-right"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="contentChat-right">
              <div className="contentChat_right-item">
                <i className="far fa-paper-plane"></i>
                Tin nhắn của bạn
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.Personal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    personalRequest: (setShowLoading, username) => {
      dispatch(actions.personalRequest(setShowLoading, username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
