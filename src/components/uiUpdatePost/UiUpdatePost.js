import React, { useState } from "react";
import "./uiUpdatePost.css";
import UiAddNews from "../uiAddNews/UiAddNews";

function UiUpdatePost(props) {
  const { dataDetailPost, setOpenUiUpdatePost } = props;
  const [openFromAddNews, setOpenFormAddNews] = useState(false);

  const onCloseForm = () => {
    props.onCloseForm(false);
    setOpenFormAddNews(false);
  };

  const openEditPost = () => {
    setOpenFormAddNews(true);
  };

  return (
    <div>
      <UiAddNews
        openFromAddNews={openFromAddNews}
        onCloseForm={onCloseForm}
        dataDetailPost={dataDetailPost}
        setOpenFormAddNews={setOpenFormAddNews}
        setOpenUiUpdatePost={setOpenUiUpdatePost}
      />
      <div className="backgroundUpdatePost">
        <div className="backgroundUpdatePost_form">
          <div
            className="backgroundUpdatePost_form-item"
            style={{ fontWeight: "bold", color: "red" }}
          >
            Xóa
          </div>
          <div
            className="backgroundUpdatePost_form-item"
            onClick={() => openEditPost()}
          >
            Chỉnh sửa bài viết
          </div>
          <div
            className="backgroundUpdatePost_form-item"
            onClick={() => onCloseForm()}
          >
            Hủy
          </div>
        </div>
      </div>
    </div>
  );
}


export default UiUpdatePost;
