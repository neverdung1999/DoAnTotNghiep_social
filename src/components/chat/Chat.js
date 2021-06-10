import React from "react";
import "./chat.css";
import logo from "../../uploads/img/duc.jpg";

function Chat(props) {
  return (
    <div>
      <div className="contentChat">
        <div className="container-contentChat">
          <div className="contentChat-left">
            <div className="contentChat-top-left">
              <div className="contentChat-top-name">
                <p id="p-contentChat-top-name">minhle1409</p>
              </div>
            </div>
            <div className="contentChat-bottom-left">
              <div className="item-leftChat">
                <div className="item-leftChat-left">
                  <img src={logo} alt="" id="img-chat" />
                </div>
                <div className="item-leftChat-right">
                  <p id="p-item-leftChat-right">minhducle1409</p>
                  <span id="span-item-leftChat-right">
                    Hoạt động 16 phút trước
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="contentChat-right">
            <div className="contentChat_right-top">
              <div className="rightChat_top-left">
                <div className="topChat_left-avt">
                  <img src={logo} id="topChat_left-avt"></img>
                </div>
                <div className="topChat_left-name">
                  <div className="leftChat_name-top">minhducle1409</div>
                  <div className="leftChat_name-bottom">hoạt động 15 phút</div>
                </div>
              </div>
              <div className="rightChat_top-right">
                <i className="fas fa-info-circle" id="rightChat_top-right"></i>
              </div>
            </div>
            <div className="contentChat_right-bottom">
              <div className="rightChat_bottom-top">
                <div className="message-left">
                  <div className="avt-message-left">
                    <img src={logo} alt="" id="avt-message-left" />
                  </div>
                  <div className="content-message-left">
                    <div className="p-content">
                      <p id="p-content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ut deserunt mollitia eveniet aperiam ducimus
                        asperiores, alias commodi soluta omnis veritatis. Veniam
                        dolores, assumenda aperiam ratione odit iure quis
                        repellat deleniti.
                      </p>
                    </div>
                    <div className="img-content">
                      <img src={logo} alt="" id="img-content" />
                    </div>
                  </div>
                </div>
                <div className="message-right">
                  <div className="p-content">
                    <p id="p-content">
                      Lorem ipsum dolor sit amet consectetur, adipisicing
                      elit.asd
                    </p>
                  </div>
                  <div className="p-content">
                    <p id="p-content">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ut deserunt mollitia eveniet aperiam ducimus asperiores,
                      alias commodi soluta omnis veritatis. Veniam dolores,
                      assumenda aperiam ratione odit iure quis repellat
                      deleniti.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rightChat_bottom-bottom">
                <div className="bottomChat_bottom-wrap">
                  <div className="bottomChat_wrap-left">
                    <i className="far fa-smile" id="bottomChat_wrap-left"></i>
                  </div>
                  <div className="bottomChat_wrap-body">
                    <textarea
                      name=""
                      id="textarea-chat"
                      placeholder="Nhắn tin...."
                    ></textarea>
                  </div>
                  <div className="bottomChat_wrap-right">
                    <i className="fas fa-images" id="icon-chat-right"></i>
                    <i className="fas fa-paper-plane" id="icon-chat-right"></i>
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

export default Chat;
