import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import "../assets/chat.css";
import Title from "./Title";
import Input from "./Input";
import { getMessages } from "../_actions/actions";
import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 660px;
  background-color: #56be9c;
  padding: 30px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.location || "left"};
  align-items: center;
`;
const Bubble = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  font-family: "NotoSans";
  font-size: 14px;
  text-align: start;
  padding: 10px;
  max-width: 300px;
  margin-bottom: 10px;
  margin-left: 100px;
  margin-right: 15px;
  z-index: 5;
  word-wrap: break-word;
`;

const Chat = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, other_user, other_user_name, room_idx } = props;
  const myid = window.localStorage.getItem("id");
  const myname = "나";
  const last = useRef("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const client = useRef({});

  useEffect(() => {
    dispatch(getMessages(room_idx)).then((response) => {
      if (response.payload) {
        console.log(response);
        setMessages(response.payload);
      } else {
        console.log("메세지 목록 가져오기 에러");
      }
    });
    client.current = new StompJs.Client({
      //brokerURL: "ws://localhost:8080/sock",
      webSocketFactory: () => new SockJS("/sock"),
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    const callback = (message) => {
      if (message.body) {
        dispatch(getMessages(room_idx)).then((response) => {
          if (response.payload) {
            setMessages(response.payload);
            last.current = "";
          } else {
            console.log("메세지 목록 가져오기 에러");
          }
        });
      } else {
        alert("got empty message");
      }
    };

    client.current.onConnect = function (frame) {
      client.current.subscribe(`/topic/${room_idx}`, callback);
    };
    client.current.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    client.current.activate();
    last.current = "";
  }, []);

  const onInputChange = (e) => {
    setMessage(e.target.value);
    last.current = "";
  };

  const sendMessage = () => {
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        room_idx: room_idx,
        user_idx: myid,
        user_name: myname,
        message: message,
      }),
    });
    setMessage("");
    dispatch(getMessages(room_idx)).then((response) => {
      if (response.payload) {
        console.log(response);
        setMessages(response.payload);
      } else {
        console.log("메세지 목록 가져오기 에러");
      }
    });
  };

  const disconnect = () => {
    client.current.publish({
      destination: "/pub/disconnect",
      body: JSON.stringify({
        room_idx: room_idx,
        user_idx: myid,
      }),
    });
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? "openModal modal" : "modal"}
      style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
    >
      {open ? (
        <section>
          <header
            style={{
              height: "95px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              boxShadow: "0px 5px 15px grey",
            }}
          >
            <div>
              <Title>{other_user_name}</Title>
            </div>
            {header}
            <button className="close" onClick={disconnect}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <Content>
            {messages?.map((message, i) => {
              if (
                String(last.current) !== String(message.sender_idx) && //상대방의 프로필사진이 보이는 경우
                String(message.sender_idx) !== String(myid)
              ) {
                last.current = message.sender_idx;
                return (
                  <Row>
                    <img
                      alt="profile"
                      src={message.self_image}
                      style={{
                        width: "70px",
                        height: "70px",
                        marginRight: "10px",
                        position: "absolute",
                        borderRadius: "50%",
                      }}
                    />
                    <img
                      alt="left"
                      src={require("../assets/left.png").default}
                      style={{
                        width: "28px",
                        height: "17px",
                        marginRight: "-112px",
                        marginLeft: "85px",
                      }}
                    />
                    <Bubble>{message.message}</Bubble>
                  </Row>
                );
              } else if (String(message.sender_idx) !== String(myid)) {
                //상대방이 연달아 메세지를 보낸 경우
                return (
                  <Row>
                    <Bubble marginLeft="100">{message.message}</Bubble>
                  </Row>
                );
              } else if (
                String(last.current) !== String(myid) &&
                String(message.sender_idx) === String(myid)
              ) {
                //내가 처음으로 메세지를 보내는 경우
                last.current = myid;
                return (
                  <Row location="flex-end">
                    <Bubble>{message.message}</Bubble>
                    <img
                      alt="right"
                      src={require("../assets/right.png").default}
                      style={{
                        width: "28px",
                        height: "17px",
                        marginLeft: "-27px",
                      }}
                    />
                  </Row>
                );
              } else {
                //내가 연달아 메세지를 보내는 경우
                return (
                  <Row location="flex-end">
                    <Bubble>{message.message}</Bubble>
                  </Row>
                );
              }
            })}
          </Content>

          <footer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "67px",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Input
                width="382"
                validinput="true"
                placeholder="내용을 입력하세요"
                inputwidth="350"
                value={message}
                onChange={onInputChange}
              ></Input>
              <img
                alt="send"
                src={require("../assets/paperplane.png").default}
                style={{ width: "31px", height: "34px", cursor: "pointer" }}
                onClick={sendMessage}
              />
            </div>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Chat;
