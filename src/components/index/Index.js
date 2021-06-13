import React, { useState, useEffect } from "react";
import "./index.css";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import * as actions from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function Index(props) {
  const { history } = props;
  const cookies = new Cookies();
  const idCookies = cookies.get("user");
  const userCookies = cookies.get("username");
  const [showLoading, setShowLoading] = useState(true);

  console.log(idCookies);

  useEffect(() => {
    if (!cookies.get("user")) {
      history.push("/login");
    } else {
      props.personalRequestById(setShowLoading, userCookies);
    }
  }, [cookies.get("user")]);

  return (
    <div>
      <GlobalLoading showLoading={showLoading} />
      <div className="body-content">
        <div className="body-container">
          <div className="content-left">
            <div className="item-left">
              <div className="content-left-top">
                <a href="#">
                  <img src="./uploads/imgs/duc.jpg" alt="" id="avt-content" />
                </a>
                <a href="#" id="p-bold-content">
                  <p>honghot.showbiz</p>
                </a>
                <a style={{ cursor: "pointer" }}>
                  <i className="fas fa-ellipsis-h" id="ellipsis"></i>
                </a>
              </div>

              <div className="modal">
                <div className="modal-content">
                  <div className="content-modal">
                    <a href="" id="a-modal">
                      <p id="p-modal-red">Báo cáo</p>
                    </a>
                  </div>
                  <div className="content-modal">
                    <a href="" id="a-modal">
                      <p id="p-modal-red">Bỏ theo dõi</p>
                    </a>
                  </div>
                  <div className="content-modal">
                    <a href="" id="a-modal">
                      <p id="p-modal">Đi tới trang cá nhân</p>
                    </a>
                  </div>
                  <div className="content-modal">
                    <a href="" id="a-modal">
                      <p id="p-modal">Chia sẻ</p>
                    </a>
                  </div>
                  <div className="content-modal">
                    <a href="" id="a-modal">
                      <p id="p-modal">Hủy</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="content-left-bottom">
                {/* <!-- <img src="./uploads/imgs/duc.jpg" alt="" id="img-content" /> --> */}

                {/* <!-- Slideshow container --> */}
                <div className="slideshow-container">
                  {/* <!-- Full-width images with number and caption text --> */}
                  <div className="mySlides fade">
                    <img src="./uploads/imgs/duc.jpg" id="img-content" />
                  </div>

                  <div className="mySlides fade">
                    <img src="./uploads/imgs/hinhDai.jpg" id="img-content" />
                  </div>

                  {/* <!-- Next and previous buttons --> */}
                  <a className="prev">&#10094;</a>
                  <a className="next">&#10095;</a>
                </div>

                {/* <!-- The dots/circles --> */}
                <div style={{ textAlign: "center" }}>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>

                <div className="like-share">
                  <i
                    className="far fa-heart icon-like-share"
                    id="icon-heart"
                  ></i>
                  <a>
                    <i
                      className="far fa-comment icon-like-share"
                      id="icon-like-share"
                    ></i>
                  </a>
                  <a>
                    <i
                      className="far fa-paper-plane icon-like-share"
                      id="icon-like-share"
                    ></i>
                  </a>
                  <a>
                    <i className="fas fa-calendar-check" id="icon-tick"></i>
                  </a>
                  <a href="#" id="like">
                    <p>64 lượt thích</p>
                  </a>
                  <a href="#" id="name-title-content">
                    honghot.showbiz{" "}
                  </a>
                  <p id="title-post">thu trang hay tóc tiên vậy ạ????</p>
                  <a href="#" id="all-comment">
                    <p>Xem tất cả 16 bình luận</p>
                  </a>
                  <span id="span-hour">14 tiếng trước</span>
                </div>
                <div className="comment">
                  <div className="comment-left">
                    <a href="#">
                      <i className="far fa-smile" id="icon-smile"></i>
                    </a>
                  </div>
                  <div className="comment-between">
                    <textarea
                      type="text"
                      id="input-comment"
                      placeholder="Thêm bình luận ...."
                    ></textarea>
                  </div>
                  <div className="comment-right">
                    <a href="#" id="submit-Comment">
                      <p>Đăng</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="item-right">
              <div className="right-top">
                <div className="avt-right">
                  <a href="#">
                    <img src="./uploads/imgs/duc.jpg" alt="" id="avt-right" />
                  </a>
                </div>
                <div className="p-avt-right">
                  <a href="#" id="p-avt-right">
                    <p>honghot.showbiz</p>
                  </a>
                </div>
              </div>
              <div className="right-bottom">
                <div className="right-bottom-top">
                  <div className="suggestion">
                    <span id="suggestion">Gợi ý cho bạn</span>
                  </div>
                  <div className="watch-all">
                    <a href="#" id="watch-all">
                      {" "}
                      <p>Xem tất cả</p>
                    </a>
                  </div>
                </div>
                <div className="right-bottom-bottom">
                  <div className="avt-sugges">
                    <img src="./uploads/imgs/duc.jpg" alt="" id="avt-sugges" />
                  </div>
                  <div className="name-sugges">
                    <a href="#" id="name-sugges">
                      <p>Le Minh Duc</p>
                    </a>
                  </div>
                  <div className="follow-sugges">
                    <a href="#" id="follow-sugges">
                      <p>Theo dõi</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.User.dataUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    personalRequestById: (setShowLoading, username) => {
      return dispatch(actions.personalRequest(setShowLoading, username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
