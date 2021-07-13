import React, { useState, useEffect, useRef } from "react";
import "./faceTime.css";
import Peer from "simple-peer";
import io from "socket.io-client";

function FaceTime(props) {
  const socket = io.connect("http://localhost:5000");
  const [me, setMe] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const myVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    try {
      const getUserMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        myVideo.current.srcObject = stream;
      };
      getUserMedia();
    } catch (error) {
      console.log(error);
    }

    socket.on("yourID", (id) => {
      console.log(id);
      setMe(id);
    });
  }, []);

  return (
    <div>
      <div className="backgroundFaceTime">
        <video ref={myVideo} autoPlay></video>
        {/* <button onClick={() => callUser(me)}> Call User </button> */}
      </div>
    </div>
  );
}

export default FaceTime;
