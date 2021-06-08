import React, { useState, useEffect } from "react";
import "./personal.css";
import _ from "lodash";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import AddNews from "../uiAddNews/UiAddNews";
import ChangeAvt from "../changeAvt/ChangeAvt";
import * as Action from "../../redux/actions/Index";
import UiEditPersonal from "../uiEditPersonal/UiEditPersonal";
import UiContentFollow from "../uiContentFollow/UiContentFollow";
import PersonalContent from "../personalContent/PersonalContent";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function Personal(props) {
  const { history, dataUserApi } = props;
  const cookies = new Cookies();
  const [dataUser, setDataUser] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [idContentFollow, setIdContentFollow] = useState(0);
  const [openChangeAvt, setOpenChangeAvt] = useState(false);
  const [openFromAddNews, setOpenFormAddNews] = useState(false);
  const [openContentFollow, setOpenContentFollow] = useState(false);
  const [openEditPersonal, setOpenEditPersonal] = useState(false);

  console.log(window.location.href);

  useEffect(() => {
    if (!cookies.get("user")) {
      history.push("/");
    } else {
      if (history?.location?.state?.id) {
        props.personalRequest(setShowLoading, history?.location?.state?.id);
      } else {
        props.personalRequest(
          setShowLoading,
          history?.location?.state?.id_account
        );
      }
      setDataUser(dataUserApi);
    }
  }, [dataUserApi]);

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

  const onCloseForm = () => {
    setOpenFormAddNews(false);
    setOpenChangeAvt(false);
    setOpenContentFollow(false);
    setOpenEditPersonal(false);
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

  const ContentFollow = (id) => {
    switch (idContentFollow) {
      case 1:
        return (
          <UiContentFollow
            openContentFollow={openContentFollow}
            onCloseForm={onCloseForm}
            name={valueFollow[0].name2}
            dataFollow={dataUser?.followers}
          />
        );
      case 2:
        return (
          <UiContentFollow
            openContentFollow={openContentFollow}
            onCloseForm={onCloseForm}
            name={valueFollow[1].name1}
            dataFollow={dataUser?.following}
          />
        );
      default:
        return <UiContentFollow />;
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
      />
      <AddNews openFromAddNews={openFromAddNews} onCloseForm={onCloseForm} />
      <GlobalLoading showLoading={showLoading} />

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
                {cookies.get("user") === dataUserApi.id ? (
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
                ) : (
                  <div className="addfr">
                    <button id="top_right-message">Nhắn tin</button>
                    <button id="top_right-message">
                      <i className="fas fa-user"></i> Bạn bè
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="bodyContainerTop_right-body">
              <p id="right_body-p">
                <span id="right_body-bold">5</span> bài viết
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
      <PersonalContent />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataUserApi: state.Personal,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    personalRequest: (setShowLoading, dataId) => {
      dispatch(Action.personalRequest(setShowLoading, dataId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
