import React, { useState, useEffect } from "react";
import "./uiContentFollow.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Action from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";
import UiFormUnfollow from "../uiFormUnfollow/UiFormUnfollow";

function UiContentFollow(props) {
  const { name, dataFollow, setOpenContentFollow } = props;
  const cookies = new Cookies();
  const userCookies = cookies.get("username");
  const [showLoading, setShowLoading] = useState(null);
  const [dataUnFollow, setDataUnFollow] = useState(null);
  const [openUnfollow, setOpenUnfollow] = useState(false);

  const closeForm = () => {
    props.onCloseForm(false);
  };

  const onCloseForm = (e) => {
    setOpenUnfollow(e);
  };

  const handleChangeUser = (value) => {
    setShowLoading(true);
    props.personalRequest(
      setShowLoading,
      value?.username,
    );
  };

  const openFormUnfollow = (value) => {
    setDataUnFollow(value);
    setOpenUnfollow(true);
  };

  return (
    <div>
      <div className="backgroundContentFollow">
        {openUnfollow && (
          <UiFormUnfollow
            setOpenContentFollow={setOpenContentFollow}
            dataUnFollow={{
              id: dataUnFollow?.id_account,
              name: dataUnFollow?.name,
              username: dataUnFollow?.username,
              imageSrc: dataUnFollow?.imageSrc,
            }}
            onCloseForm={onCloseForm}
          />
        )}
        {showLoading && <GlobalLoading />}
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
                      <img
                        src={value?.imageSrc}
                        alt=""
                        id="bottom_left-avt"
                        onClick={() => handleChangeUser(value)}
                      />
                    </div>
                    <div className="bottom_left-title">
                      <Link
                        to={{
                          pathname: `/personal/${dataFollow[index]?.username}`,
                          state: value,
                        }}
                        className="link_custom"
                        onClick={() => props.onCloseForm(false)}
                      >
                        <div
                          className="left_title-top"
                          onClick={() => handleChangeUser(value)}
                        >
                          <p>{value?.username}</p>
                        </div>
                      </Link>

                      <div className="left_title-bottom">
                        <p>{value?.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="form_bottom-right">
                    {value.username !== userCookies && (
                      <p
                        id="bottom_right-delete"
                        // onClick={() => removeFr(value.id_account)}
                        onClick={() => openFormUnfollow(value)}
                      >
                        Đang theo dõi
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
    personalRequest: (setShowLoading, username) => {
      dispatch(Action.personalRequest(setShowLoading, username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UiContentFollow);
