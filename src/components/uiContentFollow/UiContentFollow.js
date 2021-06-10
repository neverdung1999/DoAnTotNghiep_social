import React from "react";
import "./uiContentFollow.css";
import { connect } from "react-redux";
import * as Action from "../../redux/actions/Index";
import { Link } from "react-router-dom";

function UiContentFollow(props) {
  const { openContentFollow, name, dataFollow, removeFriend } = props;

  const closeForm = () => {
    props.onCloseForm(false);
  };

  const removeFr = (id) => {
    console.log(id);
    removeFriend(id);
  };;

  return (
    <div style={openContentFollow ? { display: "block" } : { display: "none" }}>
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
                    <p
                      id="bottom_right-delete"
                      onClick={() => removeFr(value.id_account)}
                    >
                      Xóa
                    </p>
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
    removeFriend: (id) => {
      dispatch(Action.removeFriendRequest(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UiContentFollow);
