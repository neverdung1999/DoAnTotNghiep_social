import React, { useState } from "react";
import "./uiContentFollow.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Action from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function UiContentFollow(props) {
  const { openContentFollow, name, dataFollow, removeFriend } = props;
  const cookies = new Cookies();
  const userCookies = cookies.get("username");
  const [showLoading, setShowLoading] = useState(false);

  const closeForm = () => {
    props.onCloseForm(false);
  };

  const removeFr = (id) => {
    setShowLoading(true);
    removeFriend(id, setShowLoading);
  };

  return (
    <div style={openContentFollow ? { display: "block" } : { display: "none" }}>
      <GlobalLoading showLoading={showLoading} />
      <div className="backgroundContentFollow">
        <div className="backgroundContentFollow_form">
          <div className="backgroundContentFollow_form-top">
            {name}
            <i
              className="fas fa-times"
              id="form_top-icon"
              onClick={() => closeForm()}
            ></i>
          </div>
          <div className="backgroundContentFollow_form-bottom">
            {dataFollow?.map((value, index) => {
              return (
                <div key={index} className="form_bottom-all">
                  <div className="form_bottom-left">
                    <div className="bottom_left-avt">
                      <img src={value?.imageSrc} alt="" id="bottom_left-avt" />
                    </div>
                    <div className="bottom_left-title">
                      <Link
                        to={{
                          pathname: `/personal/${dataFollow[index]?.username}`,
                          state: value,
                        }}
                        className="link_custom"
                        onClick={() => closeForm()}
                      >
                        <div className="left_title-top">{value?.username}</div>
                      </Link>

                      <div className="left_title-bottom">{value?.name}</div>
                    </div>
                  </div>
                  <div className="form_bottom-right">
                    {value.username !== userCookies && (
                      <p
                        id="bottom_right-delete"
                        onClick={() => removeFr(value.id_account)}
                      >
                        Xóa
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
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
    removeFriend: (id, setShowLoading) => {
      dispatch(Action.removeFriendRequest(id, setShowLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UiContentFollow);
