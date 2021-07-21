import React, { useState } from "react";
import "./suggested.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions/Index";
import { CircularProgress } from "diginet-core-ui/components";

function Suggested(props) {
  const { dataSuggested } = props;
  const [idChoose, setIdChoose] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleFollow = (e) => {
    setShowLoading(true);
    setIdChoose(e.id);
    props.followFriendRequest(e.id, setShowLoading);
  };

  return (
    <div>
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
                <p>{value.username}</p>
              </Link>
            </div>
            <div className="follow-sugges">
              <p id="follow-sugges" onClick={() => handleFollow(value)}>
                Theo dõi
              </p>
              {showLoading && idChoose === value?.id && (
                <CircularProgress
                  color="#f26e41"
                  direction="bottom"
                  percent={100}
                  percentColor="#0095ff"
                  size="extraSmall"
                  strokeWidth={10}
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -30,
                    fontSize: 10,
                    zIndex: 10000,
                  }}
                />
              )}
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
    dataPersonal: state.MyPersonal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    suggestedAccountRequest: (id) => {
      dispatch(actions.suggestedAccountRequest(id));
    },
    followFriendRequest: (id, setShowLoading) => {
      dispatch(actions.followFriendRequest(id, setShowLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggested);
