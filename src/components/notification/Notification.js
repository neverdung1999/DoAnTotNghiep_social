/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./notification.css";
import _ from "lodash";
import TimeStamp from "../../timeStamp";
import { useHistory } from "react-router-dom";
import DetailsPost from "../detailsPost/DetailsPost";

function Notification(props) {
  const { data } = props;
  let history = useHistory();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [dataDetailsPost, setDataDetailsPost] = useState(null);
  const [isCheckMouse, setIsCheckMouse] = useState(true);

  const openFormDetails = (value) => {
    setIsOpenForm(true);
    setDataDetailsPost(value);
    // props.onCloseForm(false);
  };

  const onCloseForm = (e) => {
    setIsOpenForm(e);
  };

  const openPersonal = (value) => {
    history.push(`/personal/${value?.username}`);
    // props.onCloseForm(false);
  };

  return (
    <div onClick={isCheckMouse ? () => onCloseForm() : null}>
      {isOpenForm && (
        <DetailsPost
          dataDetailsPost={dataDetailsPost}
          onCloseForm={onCloseForm}
        />
      )}
      <div
        className="backgroundNoti"
        onMouseEnter={() => setIsCheckMouse(false)}
        onMouseLeave={() => setIsCheckMouse(true)}
      >
        {!_.isEmpty(data) &&
          _.orderBy(data, ["timestamp"], ["desc"])?.map((value, index) => {
            return (
              <div
                key={index}
                className="backgroundNoti_form"
                onClick={
                  value?.type !== "follow"
                    ? () => openFormDetails(value)
                    : () => openPersonal(value)
                }
              >
                <div className="backgroundNoti_form-left">
                  <img
                    src={value?.imageSrc}
                    id="backgroundNoti_form-left"
                    alt=""
                  />
                </div>
                <div className="backgroundNoti_form-body">
                  <div
                    className="formNoti_body-top"
                    style={!value?.hasSeen ? { fontWeight: "bold" } : null}
                  >
                    {value?.username} {value?.message}
                  </div>
                  <div
                    className="formBody_body-bottom"
                    style={
                      !value?.hasSeen
                        ? { fontWeight: "bold", color: "hsl(214deg 89% 57%)" }
                        : null
                    }
                  >
                    {TimeStamp(value?.timestamp)}
                  </div>
                </div>
                {value?.type === "follow" && (
                  <div className="backgroundNoti_form-right">
                    <div className="form_right-follow">theo dõi</div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Notification;
