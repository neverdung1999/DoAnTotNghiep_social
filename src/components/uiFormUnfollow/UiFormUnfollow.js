import React, { useState, useEffect } from "react";
import "./uiFormUnfollow.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function UiFormUnfollow(props) {
  const { openFormUnfollow, dataUser } = props;
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    !showLoading && props.onCloseForm(false);
  }, [showLoading]);

  const closeForm = () => {
    props.onCloseForm(false);
  };

  const handleRemoveUser = () => {
    const id = dataUser.id;
    setShowLoading(true);
    props.removeFriendRequest(id, setShowLoading);
  };

  return (
    <div style={openFormUnfollow ? { display: "block" } : { display: "none" }}>
      <GlobalLoading showLoading={showLoading} />
      <div className="backgroundFormUnfollow">
        <div className="backgroundFormUnfollow_form">
          <div className="backgroundFormUnfollow_form-top">
            <div className="formUnfollow_top-top">
              <img src={dataUser?.imageSrc} id="imgUnfollow_top" alt="" />
            </div>
            <div className="formUnfollow_top-bottom">
              Bỏ theo dõi @{dataUser?.username}?
            </div>
          </div>
          <div
            className="backgroundFormUnfollow_form-body"
            onClick={() => handleRemoveUser()}
          >
            Bỏ theo dõi
          </div>
          <div
            className="backgroundFormUnfollow_form-bottom"
            onClick={() => closeForm()}
          >
            Hủy
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
    removeFriendRequest: (id, setShowLoading) => {
      dispatch(actions.removeFriendRequest(id, setShowLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UiFormUnfollow);
