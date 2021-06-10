import React, { useState, useEffect } from "react";
import "./header.css";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import avt from "../../uploads/img/duc.jpg";
import { useHistory } from "react-router-dom";
import logo from "../../uploads/img/logo.png";
import * as Actions from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function Header(props) {
  const { logoutUser, dataUser } = props;
  const cookies = new Cookies();
  const history = useHistory();
  const username = cookies?.get("username");
  const dataCookies = cookies?.get("data");
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenHeader, setIsOpenHeader] = useState(false);

  useEffect(() => {
    if (cookies.get("user")) {
      setIsOpenHeader(true);
      // props.personalRequest(username, setShowLoading);
    } else {
      setIsOpenHeader(false);
      history.push("/login");
    }
  }, [cookies.get("user")]);

  const openFormDropDown = () => {
    setIsOpenForm(!isOpenForm);
  };

  const signOut = () => {
    logoutUser();
  };

  return (
    <div>
      {/* <GlobalLoading showLoading={showLoading} /> */}
      <div
        className="header"
        style={isOpenHeader ? { display: "block" } : { display: "none" }}
      >
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={logo} id="logo" alt="" />
            </Link>
          </div>
          <div className="search-nav">
            <input type="text" id="input-search-nav" placeholder="Tìm kiếm" />
          </div>
          <div className="function-nav">
            <Link to="/">
              <i className="fas fa-home"></i>
            </Link>
            <Link to="/chat">
              <i className="far fa-paper-plane"></i>
            </Link>
            <a href="#">
              <i className="far fa-compass"></i>
            </a>
            <div className="dropdown-notification">
              <div className="dropdown-content-notification">
                <div className="all-content-notification">
                  <div className="img-notification">
                    <a href="#">
                      <img
                        src="./uploads/imgs/duc.jpg"
                        alt=""
                        id="img-notification"
                      />
                    </a>
                  </div>
                  <div className="content-notification">
                    <a href="#" id="a-notification">
                      <span id="span-content-notification">
                        Lê Minh Đức
                        <p id="p-content-notification">đã theo dõi bạn</p>
                      </span>
                    </a>
                  </div>
                  <div className="follow-notification">
                    <a href="#" id="a-notification">
                      <p id="follow-now-notification">Theo dõi</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown-avt" onClick={() => openFormDropDown()}>
              <img src={dataCookies.imageSrc} alt="" id="avt" />
              <div
                className="backgrounDropdown"
                style={isOpenForm ? { display: "block" } : { display: "none" }}
              >
                <div className="dropdown-content-avt">
                  <Link
                    to={{
                      pathname: `/personal/${username}`,
                      state: dataCookies,
                    }}
                    id="content-dropdown"
                  >
                    <i className="far fa-user-circle" id="icon-avt"></i>Trang cá
                    nhân
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
    dataUser: state.Personal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(Actions.logoutUser());
    },
    personalRequest: (username, setShowLoading) => {
      dispatch(Actions.personalRequest(username, setShowLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
