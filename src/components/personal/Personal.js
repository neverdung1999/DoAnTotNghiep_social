import React, { useState, useEffect } from "react";
import "./personal.css";
import _ from "lodash";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddNews from "../uiAddNews/UiAddNews";
import ChangeAvt from "../changeAvt/ChangeAvt";
import * as Action from "../../redux/actions/Index";
import { LinearProgress } from "diginet-core-ui/components";
import UiFormUnfollow from "../uiFormUnfollow/UiFormUnfollow";
import UiEditPersonal from "../uiEditPersonal/UiEditPersonal";
import UiContentFollow from "../uiContentFollow/UiContentFollow";
import PersonalContent from "../personalContent/PersonalContent";

function Personal(props) {
  const { history, dataUserApi, dataPost } = props;
  const cookies = new Cookies();
  const idUser = cookies.get("user");
  const username = cookies.get("username");
  const dataCookies = cookies.get("data");
  const [isRender, setIsRender] = useState(true);
  const [dataUser, setDataUser] = useState(null);
  const [numberPost, setNumberPost] = useState(0);
  const getDataUrl = window.location.href.slice(31);
  const [showLoading, setShowLoading] = useState(true);
  const userHistory = history?.location?.state?.username;
  const [idContentFollow, setIdContentFollow] = useState(0);
  const [openChangeAvt, setOpenChangeAvt] = useState(false);
  const [checkUserFollow, setCheckUserFollow] = useState(null);
  const [openFromAddNews, setOpenFormAddNews] = useState(false);
  const [openFormUnfollow, setOpenFormUnfollow] = useState(false);
  const [openEditPersonal, setOpenEditPersonal] = useState(false);
  const [openContentFollow, setOpenContentFollow] = useState(false);

  useEffect(() => {
    if (!idUser) {
      history.push("/");
    } else {
      if (history.location.state) {
        isRender &&
          props.personalRequest(
            setShowLoading,
            history.location.pathname.slice(10)
          );
        setIsRender(false);
      } else {
        if (isRender) {
          getDataUrl && props.personalRequest(setShowLoading, getDataUrl);
          setIsRender(false);
        }
      }

      let countPost = 0;
      dataPost?.forEach((data) => {
        if (data?.id_account === dataUserApi?.id) {
          countPost += 1;
        }
      });
      setNumberPost(countPost);

      setDataUser(dataUserApi);

      if (!_.isEmpty(dataUserApi) && dataUserApi?.username !== username) {
        if (!_.isEmpty(dataUserApi?.followers)) {
          for (let i = 0; i < _.size(dataUserApi?.followers); i++) {
            if (dataUserApi?.followers[i]?.username === username) {
              setCheckUserFollow(1);
              return;
            } else {
              setCheckUserFollow(-1);
            }
          }
        } else {
          setCheckUserFollow(-1);
        }
      }
    }
  }, [
    dataUserApi,
    dataCookies?.following,
    getDataUrl,
    history,
    idUser,
    isRender,
    props,
    username,
    dataPost,
  ]);

  const valueFollow = [
    {
      id: 1,
      name1: "",
      name2: "người theo dõi ",
      follow: _.size(dataUser?.followers),
    },
    {
      id: 2,
      name1: "Đang theo dõi ",
      name2: " người dùng",
      follow: _.size(dataUser?.following),
    },
  ];

  const showAddNews = () => {
    setOpenFormAddNews(true);
  };

  const onCloseForm = (e) => {
    setOpenFormAddNews(e);
    setOpenChangeAvt(e);
    setOpenContentFollow(e);
    setOpenEditPersonal(e);
    setOpenFormUnfollow(e);
  };

  const onOpenChangeAvt = () => {
    setOpenChangeAvt(true);
  };

  const showContentFollow = (id) => {
    setOpenContentFollow(true);
    setIdContentFollow(id);
  };

  const showEditPersonal = () => {
    setOpenEditPersonal(true);
  };

  const handleFollow = () => {
    setShowLoading(true);
    props.followFriendRequest(
      dataUserApi.id,
      setShowLoading,
      dataUserApi?.username
    );
  };

  const openUnfollow = () => {
    setOpenFormUnfollow(true);
  };

  const ContentFollow = (id) => {
    switch (idContentFollow) {
      case 1:
        return (
          openContentFollow && (
            <UiContentFollow
              onCloseForm={onCloseForm}
              name={valueFollow[0].name2}
              dataFollow={dataUser?.followers}
              setOpenContentFollow={setOpenContentFollow}
            />
          )
        );
      case 2:
        return (
          openContentFollow && (
            <UiContentFollow
              onCloseForm={onCloseForm}
              name={valueFollow[1].name1}
              dataFollow={dataUser?.following}
              setOpenContentFollow={setOpenContentFollow}
            />
          )
        );
      default:
        return openContentFollow && <UiContentFollow />;
    }
  };

  return (
    <div>
      <UiEditPersonal
        openEditPersonal={openEditPersonal}
        onCloseForm={onCloseForm}
      />
      <ChangeAvt
        dataUser={dataUser}
        openChangeAvt={openChangeAvt}
        onCloseForm={onCloseForm}
        history={history}
        getDataUrl={getDataUrl}
        userHistory={userHistory}
      />
      <AddNews
        openFromAddNews={openFromAddNews}
        setOpenFormAddNews={setOpenFormAddNews}
        onCloseForm={onCloseForm}
      />
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
      {openFormUnfollow && <UiFormUnfollow onCloseForm={onCloseForm} />}

      {ContentFollow()}
      <div className="bodyContainer">
        <div className="bodyContainer_top">
          <div className="bodyContainer_top-left">
            <div className="bodyContainer_top_left-top">
              <img
                src={dataUser?.imageSrc}
                alt=""
                id="avt_main"
                onClick={() => onOpenChangeAvt()}
              />
            </div>
          </div>
          <div className="bodyContainer_top-right">
            <div className="bodyContainerTop_right-top">
              <div className="right_top-left">
                <h2 id="top_left-h2">{dataUser?.username}</h2>
              </div>
              <div className="right_top-right">
                {idUser === dataUserApi.id ? (
                  <div className="personal_edit">
                    <div onClick={() => showAddNews()}>
                      <button id="top_right-message">
                        <i className="fas fa-plus"></i> Thêm bài viết
                      </button>
                    </div>
                    <div className="right_top-edit">
                      <div onClick={() => showEditPersonal()}>
                        <button id="top_right-message">
                          <i className="fas fa-user-edit"></i> Chỉnh sửa trang
                          cá nhân
                        </button>
                      </div>
                    </div>
                  </div>
                ) : checkUserFollow === -1 ? (
                  <div className="addfr">
                    <button
                      id="top_right-message"
                      onClick={() => handleFollow()}
                    >
                      Theo dõi
                    </button>
                  </div>
                ) : (
                  <div className="addfr">
                    <Link
                      to={{
                        pathname: "/chat",
                        state: {
                          id: dataUserApi.id,
                          name: dataUserApi.name,
                          username: dataUserApi.username,
                          imageSrc: dataUserApi.imageSrc,
                        },
                        id: 1,
                      }}
                      id="top_right-message"
                      style={{
                        textDecoration: "none",
                        padding: "5px 10px",
                        fontSize: 15,
                      }}
                    >
                      Nhắn tin
                    </Link>
                    <button
                      id="top_right-message"
                      onClick={() => openUnfollow()}
                    >
                      <i className="fas fa-user"></i> Đang theo dõi
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="bodyContainerTop_right-body">
              <p id="right_body-p">
                <span id="right_body-bold">{numberPost}</span> bài viết
              </p>
              {valueFollow.map((value, index) => {
                return (
                  <p
                    key={index}
                    id="right_body-p"
                    onClick={() => showContentFollow(value.id)}
                  >
                    {value.name1}
                    <span id="right_body-bold">{value.follow}</span>{" "}
                    {value.name2}
                  </p>
                );
              })}
            </div>
            <div className="bodyContainerTop_right-bottom">
              <p id="right_body-bold">{dataUser?.name}</p>
              {dataUser?.description}
            </div>
          </div>
        </div>
      </div>
      <PersonalContent idDataUserApi={dataUserApi?.id} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataUserApi: state.Personal,
    dataPost: state.PostById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    personalRequest: (setShowLoading, username) => {
      dispatch(Action.personalRequest(setShowLoading, username));
    },
    followFriendRequest: (id, setShowLoading, username) => {
      dispatch(Action.followFriendRequest(id, setShowLoading, username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
