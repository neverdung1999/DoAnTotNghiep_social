import React, { useState, useEffect } from "react";
import "./index.css";
import Post from "../post/Post";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Suggested from "../suggested/Suggested";
import * as actions from "../../redux/actions/Index";
import LogoLoading from "../animation/logoLoading/LogoLoading";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function Index(props) {
  const { history } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies();
  const dataCookies = cookies.get("data");
  const userCookies = cookies.get("username");
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!cookies.get("user")) {
      history.push("/login");
    } else {
      props.personalRequestById(setShowLoading, userCookies);
    }
  }, [cookies, history, props, userCookies]);

  return (
    <div>
      {showLoading && <LogoLoading />}
      <div className="body-content">
        <div className="body-container">
          <Post />
          <div className="content-right">
            <div className="item-right">
              <div className="right-top">
                <div className="avt-right">
                  <Link
                    to={{
                      pathname: `/personal/${userCookies}`,
                      state: dataCookies,
                    }}
                  >
                    <img src={dataCookies?.imageSrc} alt="" id="avt-right" />
                  </Link>
                </div>
                <div className="p-avt-right">
                  <Link
                    to={{
                      pathname: `/personal/${userCookies}`,
                      state: dataCookies,
                    }}
                    id="p-avt-right"
                  >
                    <p>{dataCookies?.username}</p>
                  </Link>
                </div>
              </div>
              <div className="right-bottom">
                <div className="right-bottom-top">
                  <div className="suggestion">
                    <span id="suggestion">Gợi ý cho bạn</span>
                  </div>
                  <div className="watch-all">
                    <a href="#" id="watch-all">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    personalRequestById: (setShowLoading, username) => {
      return dispatch(actions.personalRequest(setShowLoading, username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
