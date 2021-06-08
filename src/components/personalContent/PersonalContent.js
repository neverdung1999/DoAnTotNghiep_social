import React from "react";
import avtDuc from "../../uploads/img/duc.jpg";
import "./personalContent.css";

function PersonalContent(props) {

  return (
    <div className="bodyContainer_bottom">
      <div className="bodyContainer_bottom-item">
        <img src={avtDuc} alt="" id="bottom_item-img" />
      </div>
      <div className="bodyContainer_bottom-item">
        <img src={avtDuc} alt="" id="bottom_item-img" />
      </div>
    </div>
  );
}

export default PersonalContent;
