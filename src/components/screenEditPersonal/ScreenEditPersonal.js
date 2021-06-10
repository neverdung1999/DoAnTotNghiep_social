import React, { useState } from "react";
import "./screenEditPersonal.css";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import * as Action from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function ScreenEditPersonal(props) {
  const { changeAvtRequest, dataUser } = props;
  const cookies = new Cookies();
  const [showLoading, setShowLoading] = useState(false);

  const callApiImage = (value) => {
    const formData = new FormData();
    const idUser = cookies.get("user");
    formData.append("file", value);
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };
    fetch("https://api.Cloudinary.com/v1_1/baby-dont-cry/image/upload", options)
      .then((response) => response.json())
      .then((response) => {
        setShowLoading(true);
        changeAvtRequest(idUser, response.url, setShowLoading);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeImage = (e) => {
    const value = e.target.files;
    setShowLoading(true);
    if (value.length > 1) {
      for (let i = 0; i < value.length; i++) {
        callApiImage(value[i]);
      }
    } else {
      callApiImage(value[0]);
    }
  };

  const onCloseForm = () => {
    props.onCloseForm(false);
  };

  return (
    <div>
      <GlobalLoading showLoading={showLoading} />
      <div className="backgroundEditPersonal_all">
        <div className="form_right-avt">
          <div className="right_avt-top">
            <div className="avt_top-left">Ảnh đại diện</div>
            {/* <div className="avt_top-right">Chỉnh sửa</div> */}
            <label className="avt_top-right">
              <input
                type="file"
                id="avt_top-right"
                onChange={handleChangeImage}
                style={{ opacity: 0 }}
              />
              <div className="avt_top-right-title">Chỉnh sửa</div>
            </label>
          </div>
          <div className="right_avt-bottom">
            <img src={dataUser?.imageSrc} id="avt_bottom-img" alt="" />
          </div>
        </div>
        <div className="form_right-name">
          <div className="right_name-top">
            <div className="name_top-left">Tên</div>
          </div>
          <div className="right_name-bottom">
            <input
              type="text"
              name="name"
              id="bottom_right-input"
              placeholder="Nhập tên của bạn..."
            />
          </div>
        </div>
        <div className="form_right-username">
          <div className="right_username-top">
            <div className="username_top-left">Tên người dùng</div>
          </div>
          <div className="right_username-bottom">
            <input
              type="text"
              name="name"
              id="bottom_right-input"
              placeholder="Nhập tên người dùng của bạn..."
            />
          </div>
        </div>
        <div className="form_right-description">
          <div className="right_description-top">
            <div className="description_top-left">Tiểu sử</div>
          </div>
          <div className="right_description-bottom">
            <textarea
              id="description_bottom-textarea"
              name="description"
              placeholder="Nhập tiểu sử của bạn..."
            />
          </div>
        </div>
        <div className="background_formSubmit">
          <div className="formSubmit_btn"> Đồng ý</div>
          <div className="formSubmit_btn" onClick={() => onCloseForm()}>
            Hủy bỏ
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
    changeAvtRequest: (idUser, response, setShowLoading) => {
      dispatch(Action.changeAvtRequest(idUser, response, setShowLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenEditPersonal);
