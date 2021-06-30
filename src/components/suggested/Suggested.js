import React, { useEffect, useState } from "react";
import "./suggested.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function Suggested(props) {
  const { dataSuggested } = props;
  const [showLoading, setShowLoading] = useState(false);
  const [isRender, setIsRender] = useState(true);

  useEffect(() => {
    isRender && props.suggestedAccountRequest();
    setIsRender(false);
  }, [props, dataSuggested, isRender]);

  const handleFollow = (e) => {
    setShowLoading(true);
    props.followFriendRequest(e.id, setShowLoading);
  };

  return (
    <div>
      {showLoading && <GlobalLoading />}
      {dataSuggested.map((value, index) => {
        return (
          <div className="right-bottom-bottom" key={index}>
            <div className="avt-sugges">
              <img src={value.imageSrc} alt="" id="avt-sugges" />
            </div>
            <div className="name-sugges">
              <Link
                to={{ pathname: `/personal/${value?.username}`, state: value }}
                id="name-sugges"
              >
                <p>{value.name}</p>
              </Link>
            </div>
            <div className="follow-sugges">
              <p id="follow-sugges" onClick={() => handleFollow(value)}>
                Theo dõi
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataSuggested: state.Home,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    suggestedAccountRequest: () => {
      dispatch(actions.suggestedAccountRequest());
    },
    followFriendRequest: (id, setShowLoading) => {
      dispatch(actions.followFriendRequest(id, setShowLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggested);
