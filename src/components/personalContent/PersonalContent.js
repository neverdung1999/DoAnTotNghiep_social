import React, { useEffect, useState } from "react";
import "./personalContent.css";
import _ from "lodash";
import { pure } from "recompose";
import { connect } from "react-redux";
import DetailsPost from "../detailsPost/DetailsPost";
import * as actions from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function PersonalContent(props) {
  const { dataPost, idDataUserApi, getPostRequestById } = props;
  const [showLoading, setShowLoading] = useState(true);
  const [openDetailsPost, setOpenDetailsPost] = useState(false);
  const [dataDetailsPost, setDataDetailsPost] = useState(null);

  useEffect(() => {
    setShowLoading(true);
    if (idDataUserApi !== undefined) {
      getPostRequestById(setShowLoading, idDataUserApi);
    }
  }, [getPostRequestById, idDataUserApi]);

  const handleChoosePost = (data) => {
    setOpenDetailsPost(true);
    setDataDetailsPost(data);
  };

  const onCloseForm = (e) => {
    setOpenDetailsPost(e);
  };

  return (
    <div>
      {openDetailsPost && (
        <DetailsPost
          dataDetailsPost={dataDetailsPost}
          onCloseForm={onCloseForm}
          typePost="postById"
        />
      )}
      {showLoading && <GlobalLoading />}
      <div className="bodyContainer_bottom">
        {_.orderBy(dataPost, ["timestamp"], ["desc"])?.map((item, index) => {
          return (
            <div key={index}>
              <div className="bodyContainer_bottom-item">
                <img
                  src={item?.imageSrc[0]}
                  alt=""
                  id="bottom_item-img"
                  onClick={() => handleChoosePost(item)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataPost: state.PostById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostRequestById: (setShowLoading, id) => {
      dispatch(actions.getPostRequestById(setShowLoading, id));
    },
  };
};

export default pure(
  connect(mapStateToProps, mapDispatchToProps)(PersonalContent)
);
