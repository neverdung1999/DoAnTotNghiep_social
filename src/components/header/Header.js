/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./header.css";
import _ from "lodash";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { db } from "../../services/firebase";
import { useHistory } from "react-router-dom";
import logo from "../../uploads/img/logo.png";
import * as Actions from "../../redux/actions/Index";
import Notification from "../notification/Notification";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function Header(props) {
  const {
    logoutUser,
    data,
    idNotification,
    dataUser,
    dataAllUser,
    dataPersonal,
  } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies();
  const history = useHistory();
  const username = cookies?.get("username");
  const imageCookies = cookies.get("imageSrc");
  const [isOpenNoti, setIsOpenNoti] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const [countNoti, setCountNoti] = useState([]);

  useEffect(() => {
    if (cookies.get("user")) {
      const arrTemp = [];
      setIsOpenHeader(true);
      data?.forEach((value) => {
        !value?.hasSeen && arrTemp.push(value);
      });
      setCountNoti(arrTemp);
      props.getAllUserRequest();
    } else {
      setIsOpenHeader(false);
      history.push("/login");
    }
  }, [data, dataUser]);

  const openFormDropDown = () => {
    setIsOpenForm(!isOpenForm);
  };

  const signOut = () => {
    props.logOutRequest(cookies?.get("user"), setIsOpenHeader);
    // logoutUser();
  };

  const handleChangeUser = () => {
    setShowLoading(true);
    props.personalRequest(setShowLoading, username);
  };

  const onCloseForm = (e) => {
    setIsOpenNoti(e);
  };

  const handleOpenNoti = () => {
    setIsOpenNoti(!isOpenNoti);
    try {
      const ref = db.ref("social_network");
      const notiRef = ref.child(`notifications`);

      const dispatchNotiRequest = async (id) => {
        if (id === null) return;
        await notiRef
          .child(`${idNotification}/notification/${id}/hasSeen`)
          .set(true);
      };

      const getNotiRequest = async () => {
        await notiRef
          .child(`${idNotification}/notification`)
          .once("value", async (snapshot) => {
            if (snapshot.val() === null) return;
            for (const [key, value] of Object.entries(snapshot.val())) {
              if (!value?.hasSeen && !isOpenNoti) {
                await dispatchNotiRequest(key);
              }
            }
          });
      };

      getNotiRequest();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSelect = (e) => {
    window.location.replace(`http://localhost:3000/personal/${e?.username}`);
  };

  return (
    <div>
      {showLoading && <GlobalLoading />}
      <div
        className="header"
        style={isOpenHeader ? { display: "block" } : { display: "none" }}
      >
        {isOpenNoti && <Notification data={data} onCloseForm={onCloseForm} />}
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={logo} id="logo" alt="" />
            </Link>
          </div>
          <div className="search-nav">
            {/* <input type="text" id="input-search-nav" placeholder="Tìm kiếm" /> */}
            <div className="search_nav-wrapper">
              <ReactSearchAutocomplete
                items={dataAllUser}
                onSelect={handleOnSelect}
                fuseOptions={{ keys: ["username"] }}
                resultStringKeyName="username"
                placeholder="Tìm kiếm..."
                styling={{
                  height: "34px",
                  marginTop: "10px",
                  zIndex: 10,
                }}
              />
            </div>
          </div>
          <div className="function-nav">
            <Link to="/apartment">
              <i className="fas fa-hotel"></i>
            </Link>
            <Link to="/">
              <i className="fas fa-home"></i>
            </Link>
            <Link to="/chat">
              <i className="far fa-paper-plane"></i>
            </Link>
            <a href="#">
              <i
                className="far fa-compass"
                style={{ position: "relative" }}
                onClick={() => handleOpenNoti()}
              ></i>
              {!_.isEmpty(countNoti) && (
                <div className="countNotification">{_.size(countNoti)}</div>
              )}
            </a>

            <div className="dropdown-avt" onClick={() => openFormDropDown()}>
              <img src={imageCookies} alt="" id="avt" />
              <div
                className="backgrounDropdown"
                style={isOpenForm ? { display: "block" } : { display: "none" }}
              >
                <div className="dropdown-content-avt">
                  <Link
                    to={{
                      pathname: `/personal/${username}`,
                      state: dataPersonal,
                    }}
                    id="content-dropdown"
                    onClick={() => handleChangeUser()}
                  >
                    <i className="far fa-user-circle" id="icon-avt"></i>
                    Trang cá nhân
                  </Link>
                  <a href="#" id="content-dropdown">
                    <i className="far fa-calendar" id="icon-avt"></i>Đã lưu
                  </a>
                  <a href="#" id="content-dropdown">
                    <i className="fas fa-wrench" id="icon-avt"></i>Cài đặt
                  </a>
                  <a id="content-dropdown" onClick={() => signOut()}>
                    <i className="fas fa-sign-out-alt" id="icon-avt"></i>Đăng
                    xuất
                  </a>
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
    dataUser: state.Post,
    dataAllUser: state.User.dataAllUser,
    dataPersonal: state.Personal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(Actions.logoutUser());
    },
    personalRequest: (setShowLoading, username) => {
      dispatch(Actions.personalRequest(setShowLoading, username));
    },
    logOutRequest: (id, setIsOpenHeader) => {
      dispatch(Actions.logOutRequest(id, setIsOpenHeader));
    },
    getAllUserRequest: () => {
      dispatch(Actions.getAllUserRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
