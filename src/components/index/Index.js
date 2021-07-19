/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./index.css";
import Post from "../post/Post";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Suggested from "../suggested/Suggested";
import * as actions from "../../redux/actions/Index";

function Index(props) {
  const { history, dataUser, dataOfMe } = props;
  const cookies = new Cookies();
  const userCookies = cookies.get("username");
  const imageCookies = cookies.get("imageSrc");
  const [isRender, setIsRender] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!cookies.get("user")) {
      history.push("/login");
    }
    isRender && props.personalRequest(setShowLoading, userCookies);
    setIsRender(false);
  }, [cookies, history, props, userCookies, isRender]);

  return (
    <div>
      <div className="body-content">
        <div className="body-container">
          <Post />
          <div className="content-right">
            <div className="item-right">
              <div className="right-top">
                <div className="avt-right">
                  <Link
                    to={{
                      pathname: `/personal/${dataOfMe?.username}`,
                      state: dataUser,
                    }}
                  >
                    <img src={dataOfMe?.imageSrc} alt="" id="avt-right" />
                  </Link>
                </div>
                <div className="p-avt-right">
                  <Link
                    to={{
                      pathname: `/personal/${dataOfMe?.username}`,
                      state: dataUser,
                    }}
                    id="p-avt-right"
                  >
                    <p>{dataOfMe?.username}</p>
                  </Link>
                </div>
              </div>
              <div className="right-bottom">
                <div className="right-bottom-top">
                  <div className="suggestion">
                    <span id="suggestion">Gợi ý cho bạn</span>
                  </div>
                  <div className="watch-all">
                    <a href="#" id="watch-all" style={{ display: "none" }}>
                      {" "}
                      <p>Xem tất cả</p>
                    </a>
                  </div>
                </div>
                <Suggested />
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
    isLogin: state.User.dataUser,
    dataAllUser: state.User.dataAllUser,
    dataUser: state.Personal,
    dataOfMe: state.PersonalOfMe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    personalRequest: (setShowLoading, username) => {
      dispatch(actions.personalRequest(setShowLoading, username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
