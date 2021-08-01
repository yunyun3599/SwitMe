import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../assets/chat.css";
import logo from "../assets/logo.png";
import Title from "../components/Title";
import Chat from "./Chat";
import { getChatlist } from "../_actions/actions";
import { useDispatch } from "react-redux";

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Study = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: #56be9c; */
  border-bottom: #56be9c solid 1px;
  height: 108px;
  :hover {
    background-color: #56be9c;
  }
`;

const Chat_list = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { setinitial, open, close, openstate2, open2, close2, header } = props;
  const dispatch = useDispatch();
  const user_id = window.localStorage.getItem("id");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(getChatlist(user_id)).then((response) => {
      if (response.payload) {
        console.log(response);
        setMessages(response.payload);
        let arr = new Array(response.payload.length);
        arr.fill(false);
        setinitial(arr);
      } else {
        console.log("채팅 목록 불러오기 에러");
      }
    });
    let arr = new Array(5);
    arr.fill(false);
    setinitial(arr);
  }, [open]);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
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
              <img src={logo} style={{ width: "136px" }} />
            </div>
            {header}
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <main>
            {props.children}
            <List>
              {messages?.map((message, i) => {
                return (
                  <Study
                    key={i}
                    onClick={!openstate2[i] ? () => open2(i) : () => {}}
                  >
                    <React.Fragment>
                      {openstate2[i] ? (
                        <Chat
                          open={openstate2[i]}
                          close={() => close2(i)}
                          header=""
                          other_user={message.other_user}
                          room_idx={message.room_idx}
                        ></Chat>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                    <img
                      alt="message profile"
                      src={message.user_image}
                      style={{
                        marginLeft: "30px",
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                      }}
                    />
                    <Col>
                      <div style={{ width: "300px" }}>
                        <Title size="20" weight="400">
                          {message.other_user}
                        </Title>
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          maxWidth: "250px",
                          overflow: "hidden",
                        }}
                      >
                        {message.message}
                      </div>
                    </Col>
                    <div>
                      {message.notification < 0 ? (
                        <div
                          style={{
                            marginRight: "20px",
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "#56BE9C",
                            textAlign: "center",
                            lineHeight: "60px",
                            fontFamily: "Notosans",
                            fontSize: "20px",
                            color: "white",
                          }}
                        >
                          {message.notification}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Study>
                );
              })}
            </List>
          </main>

          <footer>
            <div style={{ height: "67px" }}></div>
            {/* <button className="close" onClick={close}>
              {" "}
              close{" "}
            </button> */}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Chat_list;
