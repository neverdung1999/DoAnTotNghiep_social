import React, { useEffect, useState } from "react";
import "./personalContent.css";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import DetailsPost from "../detailsPost/DetailsPost";
import * as actions from "../../redux/actions/Index";
import { LinearProgress } from "diginet-core-ui/components";

function PersonalContent(props) {
  const { dataPost, idDataUserApi } = props;
  const cookies = new Cookies();
  const idCookies = cookies.get("user");
  const [isRender, setIsRender] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [dataNewsPost, setDataNewsPost] = useState(null);
  const [openDetailsPost, setOpenDetailsPost] = useState(false);
  const [dataDetailsPost, setDataDetailsPost] = useState(null);

  useEffect(() => {
    if (idDataUserApi !== undefined) {
      isRender && props.getPostRequestById(setShowLoading, idDataUserApi);
      setIsRender(false);
    }
    setDataNewsPost(dataPost.reverse());
  }, [dataPost, props, isRender, idCookies, idDataUserApi]);

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
        />
      )}
      {showLoading && (
        <LinearProgress
          color="#d82b7d"
          duration={1}
          height={3}
          percent={75}
          showValue
          valuePosition="top"
          style={{ position: "fixed", top: 0, left: 0, zIndex: 10000 }}
        />
      )}
      <div className="bodyContainer_bottom">
        {dataNewsPost?.map((item, index) => {
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
    dataPost: state.Post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostRequestById: (setShowLoading, id) => {
      dispatch(actions.getPostRequestById(setShowLoading, id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalContent);
