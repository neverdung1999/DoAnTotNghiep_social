import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import _ from "lodash";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { db } from "../../services/firebase";
import ScrollToBottom from "react-scroll-to-bottom";
import * as actions from "../../redux/actions/Index";
import UiGroupChat from "../uiGroupChat/UiGroupChat";
import UiEditChat from "../uiEditChat/UiEditChat";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

let arrImg = [];

function Chat(props) {
  const { history, personalRequest } = props;
  const arrTemp = useRef([]);
  const cookies = new Cookies();
  const [chat, setChat] = useState([]);
  const idUser = cookies.get("user");
  const dataCookies = cookies.get("data");
  const [roomId, setRoomId] = useState("");
  const username = cookies.get("username");
  const [content, setContent] = useState("");
  const [isRender, setIsRender] = useState(true);
  const [imgChoose, setImgChoose] = useState(null);
  const [dataFriend, setDataFriend] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [colorChoose, setColorChoose] = useState(null);
  const [arrContainId, setArrContainId] = useState([]);
  const [dataHistory, setDataHistory] = useState(null);
  const [colorHistory, setColorHistory] = useState(null);
  const [openGroupChat, setOpenGroupChat] = useState(false);
  const [dataUserChoose, setDataUserChoose] = useState(null);
  const [isOpenEditChat, setIsOpenEditChat] = useState(false);
  const arrFriendNews = useRef([]);

  useEffect(() => {
    let roomIdTemp = "";

    //------------------------- PUSH DATA FROM HISTORY -------------------------

    const stateHistory = history?.location?.state;
    if (stateHistory !== undefined) {
      dataHistory !== "" && setDataHistory(stateHistory);
      colorHistory !== "" && setColorHistory(stateHistory.id);
      dataHistory && setDataUserChoose(dataHistory);
      colorHistory && setColorChoose(colorHistory);
    }

    //------------------------- END PUSH DATA FROM HISTORY -------------------------

    //------------------------- CREATE CONTENTID -------------------------

    let objectTemp1 = {
      name: dataCookies?.name,
      imageSrc: dataCookies?.imageSrc,
      id: dataCookies?.id,
      username: dataCookies?.username,
    };
    let objectTemp2 = {
      name: dataUserChoose?.name,
      imageSrc: dataUserChoose?.imageSrc,
      id: dataUserChoose?.id,
      username: dataUserChoose?.username,
    };
    let objectTemp3 = {};
    objectTemp3[idUser] = objectTemp1;
    objectTemp3[dataUserChoose?.id] = objectTemp2;
    setArrContainId(objectTemp3);

    //------------------------- END CREATE CONTENTID -------------------------

    const arrConcat = arrTemp?.current.concat(stateHistory);
    stateHistory ? setDataFriend(arrConcat) : setDataFriend(arrTemp?.current);

    try {
      let arrTemp = [];

      isRender && personalRequest(setShowLoading, username);
      setIsRender(false);

      db.ref()
        .child("chat_info")
        .orderByChild(`containId/${idUser}/id`)
        .equalTo(idUser)
        .on(`value`, (snapshot) => {

          snapshot.forEach((snap) => {
            if (_.size(snap.val().containId) === 2) {
              for (const [key, value] of Object.entries(snap.val().containId)) {
                if (value?.id !== idUser) {
                  //lay danh sach user de hien thi
                  arrTemp.push(value);

                  //check xem co stateHistory hay khong
                  if (stateHistory !== undefined) {
                    if (stateHistory?.id !== value?.id) {
                      arrTemp.push(stateHistory);
                    }
                  }

                  if (dataUserChoose !== null) {
                    if (dataUserChoose?.id === value?.id) {
                      roomIdTemp = snap.val().idRoom;
                      setRoomId(roomIdTemp);
                    }
                  }
                }
                setDataFriend(_.uniqWith(arrTemp, _.isEqual));
              }
            } else {
              arrTemp.push(snap.val());
              setDataFriend(_.uniqWith(arrTemp, _.isEqual));
              if (dataUserChoose !== null) {
                if (dataUserChoose.idRoom === snap.val().idRoom) {
                  roomIdTemp = snap.val().idRoom;
                  setRoomId(roomIdTemp);
                }
              }
            }
          });
          if (roomIdTemp !== "") {
            db.ref("chat_messages/" + roomIdTemp).on("value", (snapshot) => {
              const chatTemp = [];
              if (snapshot.val() !== null)
                for (const [key, value] of Object.entries(snapshot.val())) {
                  chatTemp.push(value);
                }
              setChat(chatTemp);
            });
          } else {
            setChat([]);
            setRoomId("");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [
    colorHistory,
    dataHistory,
    dataUserChoose,
    history?.location?.state,
    idUser,
    isRender,
    personalRequest,
    username,
    dataCookies?.id,
    dataCookies?.imageSrc,
    dataCookies?.name,
    dataCookies?.username,
    arrFriendNews,
  ]);

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
      content !== "" && handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (roomId !== "") {
        content !== "" &&
          (await db.ref(`chat_messages/${roomId}`).push({
            content: content,
            idUser: dataCookies?.id,
            name: dataCookies?.name,
            image: imgChoose,
            username: dataCookies?.username,
            imageSender: dataCookies?.imageSrc,
            time: Date.now(),
          }));
        content !== "" &&
          (await db.ref(`chat_info/${roomId}`).set({
            containId: arrContainId,
            idRoom: roomId,
            imageSrc: "",
            name: "",
            username: "",
            lastTime: Date.now(),
          }));
      } else {
        const getKey =
          content !== "" && (await db.ref("chat_info").push()).getKey();
        content !== "" &&
          (await db.ref(`chat_info/${getKey}`).set({
            containId: arrContainId,
            idRoom: getKey,
            imageSrc: "",
            name: "",
            username: "",
            lastTime: Date.now(),
          }));

        content !== "" &&
          (await db.ref(`chat_messages/${getKey}`).push({
            content: content,
            idUser: dataCookies?.id,
            name: dataCookies?.name,
            username: dataCookies?.username,
            image: imgChoose,
            imageSender: dataCookies?.imageSrc,
            time: Date.now(),
          }));
      }
      if (content !== "") {
        setContent("");
        setImgChoose(null);
        arrImg = [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUser = (item) => {
    setDataUserChoose(item);
    setColorChoose(item.id);
    setDataHistory("");
    setColorHistory("");
  };

  const onCloseShowImg = () => {
    setImgChoose(null);
    arrImg = [];
  };

  const onOpenCreateChat = () => {
    setOpenGroupChat(true);
  };

  const onCloseForm = (e) => {
    setOpenGroupChat(e);
    setIsOpenEditChat(e);
  };

  const handleEditChat = () => {
    setIsOpenEditChat(true);
  };

  const arrDataItemChoose = async (e) => {
    console.log(e);
  };

  return (
    <div>
      {showLoading && <GlobalLoading />}
      <UiGroupChat
        openGroupChat={openGroupChat}
        onCloseForm={onCloseForm}
        arrDataItemChoose={arrDataItemChoose}
      />
      <UiEditChat isOpenEditChat={isOpenEditChat} onCloseForm={onCloseForm} />
      <div className="contentChat">
        <div className="container-contentChat">
          <div className="contentChat-left">
            <div className="contentChat-top-left">
              <div className="contentChat-top-name">
                <p id="p-contentChat-top-name">{username}</p>
              </div>
              <i
                className="far fa-comments"
                id="iconcontentChatTopLeft"
                onClick={() => onOpenCreateChat()}
              ></i>
            </div>
            <div className="contentChat-bottom-left">
              {_.uniqWith(dataFriend, _.isEqual)?.map((item, index) => {
                return (
                  <div
                    className="item-leftChat"
                    key={index}
                    onClick={() => handleClickUser(item)}
                    style={
                      colorChoose === item?.id
                        ? { backgroundColor: "#efefef" }
                        : null
                    }
                  >
                    <div className="item-leftChat-left">
                      <img src={item?.imageSrc} alt="" id="img-chat" />
                    </div>
                    <div className="item-leftChat-right">
                      <div className="p-item-leftChat-right">
                        <p id="p-item-leftChat-right">{item?.username}</p>
                      </div>
                      <span id="span-item-leftChat-right">{item?.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ----------------------------------------- CONTENT RIGHT -----------------------------------------  */}

          {(dataUserChoose && dataFriend.length !== 0) ||
          (dataHistory && dataFriend.length !== 0) ? (
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
                    onClick={() => handleEditChat()}
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
                  {chat?.map((item, index) => {
                    return (
                      <div key={index}>
                        {item?.idUser !== idUser && item?.content !== "" && (
                          <div className="content-message-left">
                            <div className="content-wrapper">
                              <div className="avt-content">
                                <img
                                  src={item?.imageSender}
                                  id="avt-content"
                                  alt=""
                                />
                              </div>
                              <div className="content-wrapperLeft">
                                <div className="username-content">
                                  {item?.name}
                                </div>
                                <div className="p-content">{item?.content}</div>
                              </div>
                            </div>

                            {item?.image?.map((value, index) => {
                              return (
                                <div className="img_content-left" key={index}>
                                  <div className="avt-content">
                                    <img
                                      src={item?.imageSender}
                                      id="avt-content"
                                      alt=""
                                    />
                                  </div>
                                  <div className="image_Content-wrapper">
                                    <div className="username-content">
                                      {item?.name}
                                    </div>
                                    <div className="img_content_left">
                                      <img
                                        src={value}
                                        alt=""
                                        id="img_content-left"
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {item?.idUser === idUser && item?.content !== "" && (
                          <div>
                            <div className="wrapper_content">
                              <div className="p-content">{item?.content}</div>
                            </div>
                            {item?.image?.map((value, index) => {
                              return (
                                <div key={index} className="img_content-right">
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
    personalRequestById: (setShowLoading, id) => {
      dispatch(actions.personalRequestById(setShowLoading, id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
