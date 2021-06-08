import React from "react";
import "./screenChangePassword.css";
import logo from "../../uploads/img/duc.jpg";
import { connect } from "react-redux";

function ScreenChangePassword(props) {
  const { dataPersonal } = props;

  const onCloseForm = () => {
    props.onCloseForm(false);
  };

  return (
    <div className="backgroundChangePassword">
      <div className="backgroundChangePassword_top">
        <div className="backgroundChangePassword_top-left">
          <img src={dataPersonal?.imageSrc} id="top_left-img" />
        </div>
        <div className="backgroundChangePassword_top-right">
          {dataPersonal?.username}
        </div>
      </div>
      <div className="backgroundChangePassword_bottom">
        <div className="backgroundChangePassword_bottom-item">
          <div className="bottom_item-left">Mật khẩu cũ</div>
          <div className="bottom_item-right">
            <input
              type="password"
              name="password"
              id="item_right-input"
              placeholder="Nhập mật khẩu cũ"
            />
          </div>
        </div>
        <div className="backgroundChangePassword_bottom-item">
          <div className="bottom_item-left">Mật khẩu mới</div>
          <div className="bottom_item-right">
            <input
              type="password"
              name="passwordNew"
              id="item_right-input"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
        </div>
        <div className="backgroundChangePassword_bottom-item">
          <div className="bottom_item-left">Nhập lại mật khẩu mới</div>
          <div className="bottom_item-right">
            <input
              type="password"
              name="againPasswordNew"
              id="item_right-input"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
        </div>
      </div>
      <div className="backgroundChangePassword_submit">
        <div className="backgroundChangePassword_submit-btn">Đồng ý</div>
        <div className="formSubmit_btn" onClick={() => onCloseForm()}>
          Hủy bỏ
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataPersonal: state.Personal,
  };
};

export default connect(mapStateToProps, null)(ScreenChangePassword);
