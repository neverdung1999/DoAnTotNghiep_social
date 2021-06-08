import React, { useState } from "react";
import "./uiAddNews.css";
import { connect } from "react-redux";

let arrTest = [];

function AddNews(props) {
  const { personal, openFromAddNews } = props;
  const [onMouseClick, setOnMouseClick] = useState(true);
  const [img, setImg] = useState([]);

  const onCloseForm = () => {
    props.onCloseForm(false);
  };

  const callApiImage = (value) => {
    const formData = new FormData();
    formData.append("file", value);
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };
    fetch("https://api.Cloudinary.com/v1_1/baby-dont-cry/image/upload", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        arrTest.push(response.url);
        setImg([...img, arrTest]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeImage = async (e) => {
    const value = e.target.files;
    if (value.length > 1) {
      for (let i = 0; i < value.length; i++) {
        callApiImage(value[i]);
      }
    } else {
      callApiImage(value[0]);
    }
  };

  return (
    <div
      className="backgroundAddfr"
      style={openFromAddNews ? { display: "block" } : { display: "none" }}
      onClick={onMouseClick ? () => onCloseForm() : null}
      style={
        openFromAddNews
          ? { transform: "translateY(0%)" }
          : { transform: "translateY(100%)", transitionDelay: ".5s" }
      }
    >
      <div
        className="backgroundAddfr_form"
        onMouseEnter={() => setOnMouseClick(false)}
        onMouseLeave={() => setOnMouseClick(true)}
        style={
          openFromAddNews
            ? { transform: "translateY(0%)", transition: "0.5s" }
            : { transform: "translateY(175%)", transition: "0.5s" }
        }
        id={img.length !== 0 ? "largeForm" : "smallForm"}
      >
        <div className="backgroundAddfr_form-top">Tạo bài viết</div>
        <div className="backgroundAddfr_form-body">
          <div className="form_body-top">
            <div className="body_top-img">
              <img src={personal.imageSrc} alt="" id="body_top-img" />
            </div>
            <div className="body_top-name">
              <p>{personal.username}</p>
            </div>
          </div>
          <div className="form_body-body">
            <textarea
              name=""
              id="form_body-textarea"
              cols="30"
              rows="10"
              placeholder={`${personal.name} ơi, bạn đang nghĩ gì thế ?`}
            ></textarea>
          </div>
          {img.length !== 0 ? (
            <div className="img_loading">
              {img[0].length > 1 ? (
                img[0].map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="img_loading-column"
                      style={{ maxWidth: "50%" }}
                    >
                      <img src={value} id="img_loading" />
                    </div>
                  );
                })
              ) : (
                <div
                  className="img_loading-column"
                  style={{ maxWidth: "100%" }}
                >
                  <img src={img} id="img_loading" />
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div className="backgroundAddfr_bottom">
          <div className="form_body-bottom">
            <label htmlFor="body_bottom-button">
              <input
                type="file"
                id="body_bottom-button"
                onChange={handleChangeImage}
                multiple="multiple"
              />
              <i className="fas fa-photo-video" id="body_bottom-icon"></i> Thêm
              hình ảnh
            </label>
          </div>
          <div className="backgroundAddfr_form-bottom">
            <button id="form_bottom-button"> Đăng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    personal: state.Personal,
  };
};

export default connect(mapStateToProps, null)(AddNews);
