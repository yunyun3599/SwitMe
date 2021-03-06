import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Image from "../components/Image";
import Title from "../components/Title";
import {
  getStudydetail,
  joinStudy,
  leaveStudy,
  userMakeChat,
  getIsMember,
} from "../_actions/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Chat from "../components/Chat";

const Fix = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  width: 1520px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 76px;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 43px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 29px;
`;
const Content = styled.div`
  width: 274px;
  margin-left: 14px;
  margin-right: 55px;
`;
const Lower = styled.div`
  display: flex;
  flex-direction: row;
  width: 1520px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 140px;
  justify-content: space-between;
`;

const StudyDetail = ({ match }) => {
  const { study_id } = match.params;
  const user_id = window.localStorage.getItem("id");
  const dispatch = useDispatch();
  const history = useHistory();
  const [study, setStudy] = useState({
    activate: "",
    manner_temperature: "",
    extra: "",
    image: "",
    leader: "",
    leader_name: "",
    link: "",
    location: "",
    participant: "",
    size: "",
    studyIntro: "",
    study_idx: "",
    tags: "",
    termend: "",
    termstart: "",
    timeend: "",
    timestart: "",
    title: "",
    type: "",
  });
  const [joinChange, setJoinChange] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [member, setMember] = useState({
    date: "",
    participation: "",
    warning: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const room = useRef();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    dispatch(getIsMember(user_id, study_id)).then((response) => {
      if (response.payload) {
        setIsMember(true);
        const userdetail = {
          warning: response.payload.warning,
          date: response.payload.joinDate.slice(0, 10),
          participation: "?????????",
        };
        setMember(userdetail);
      } else {
        setIsMember(false);
      }
    });
    dispatch(getStudydetail(study_id)).then((response) => {
      if (response.payload) {
        setStudy(response.payload);
        console.log(response.payload);
        if (String(response.payload.leader) === user_id) {
          setIsLeader(true);
        }
      } else {
        console.log("????????? ???????????? ???????????? ??????");
      }
    });
  }, [joinChange]);

  const join = () => {
    const user_id = window.localStorage.getItem("id");
    dispatch(joinStudy(user_id, study_id)).then((response) => {
      console.log(response);
      if (response.payload) {
        alert("???????????? ?????????????????????.");
        setJoinChange(!joinChange);
      } else {
        console.log("????????? ?????? ??????");
      }
    });
  };

  const leave = () => {
    const user_id = window.localStorage.getItem("id");
    dispatch(leaveStudy(user_id, study_id)).then((response) => {
      console.log(response);
      if (response.type) {
        alert("??????????????? ?????????????????????.");
        setJoinChange(!joinChange);
      } else {
        console.log("????????? ?????? ??????");
      }
    });
  };

  const userChat = () => {
    const data = {
      study_idx: study.study_idx,
      leader_idx: study.leader,
      user_idx: window.localStorage.getItem("id"),
    };
    dispatch(userMakeChat(data)).then((response) => {
      if (response.payload) {
        room.current = response.payload.room_idx;
        openModal();
      }
    });
  };

  return (
    <Fix>
      <Header page="3" />
      {modalOpen ? (
        <Chat
          open={modalOpen}
          close={closeModal}
          header=""
          other_user={study.leader}
          room_idx={room.current}
        ></Chat>
      ) : (
        <></>
      )}
      <Info>
        <div>
          <Image alt="study profile" src={study.image} radius="10px"></Image>
        </div>
        <Detail>
          <Title size="32" color="#064538">
            {study.title}
          </Title>
          <div
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              border: "3px solid #56BE9C",
              background: "#56BE9C",
            }}
          ></div>
          <Row>
            <div style={{ width: "174px" }}>
              <Title size="20">????????????</Title>
            </div>
            <Content>
              <Title weight="400" size="20">
                {study.leader_name}
              </Title>
            </Content>
            <div style={{ width: "174px" }}>
              <Title size="20">????????????</Title>
            </div>
            <Content>
              <Title weight="400" size="20">
                {study.manner_temperature}???
              </Title>
            </Content>
          </Row>
          <Row>
            <div style={{ width: "174px" }}>
              <Title size="20">????????????</Title>
            </div>
            <Content>
              <Title weight="400" size="20">
                {study.activate === "Y" ? "?????????" : "?????? ??????"}
              </Title>
            </Content>
            <div style={{ width: "174px" }}>
              <Title size="20">??????</Title>
            </div>
            <Content>
              <Title weight="400" size="20">
                {study.termstart} ~ {study.termend}
              </Title>
            </Content>
          </Row>
          <Row>
            <div style={{ width: "174px" }}>
              <Title size="20">????????????</Title>
            </div>
            <Content>
              <Title weight="400" size="20">
                {study.type === "online" ? "?????????" : "????????????"}
              </Title>
            </Content>
            <div style={{ width: "174px" }}>
              <Title size="20">??????</Title>
            </div>
            <Content>
              <Title weight="400" size="20">
                {study.timestart ? study.timestart.slice(0, 5) : "00"} ~{" "}
                {study.timeend ? study.timeend.slice(0, 5) : "00"}
              </Title>
            </Content>
          </Row>
          <Row>
            <div style={{ width: "174px" }}>
              <Title size="20">?????? / ?????? ??????</Title>
            </div>
            <Content>
              <Title weight="400" size="20">
                {study.participant || 0} / {study.size}???
              </Title>
            </Content>
            <div style={{ width: "174px" }}>
              <Title size="20">??????</Title>
            </div>
            <Content>
              <Title weight="400" size="20">
                {study.tags}
              </Title>
            </Content>
          </Row>
          <Row>
            <div style={{ width: "174px" }}>
              <Title size="20">??????</Title>
            </div>
            <Content>
              <Title weight="400" size="20">
                {study.link}
              </Title>
            </Content>
          </Row>
          <div
            style={{ border: "1px solid #56BE9C", marginBottom: "30px" }}
          ></div>
          <Row>
            <div style={{ width: "174px" }}>
              <Title size="20">????????????</Title>
            </div>
            <Title weight="400" size="20">
              {study.extra}
            </Title>
          </Row>
        </Detail>
      </Info>
      <Lower>
        <button
          style={{
            width: "180px",
            height: "70px",
            background: "#cccccc",
            border: "none",
            borderRadius: "10px",
            fontSize: "24px",
            color: "#ffffff",
            fontWeight: "700",
            fontFamily: "NotoSans",
            cursor: "pointer",
          }}
          onClick={() => history.goBack()}
        >
          ????????????
        </button>
        {isLeader ? (
          <button
            style={{
              width: "282px",
              height: "70px",
              background: "#56Be9c",
              border: "none",
              borderRadius: "10px",
              fontSize: "24px",
              color: "#ffffff",
              fontWeight: "700",
              fontFamily: "NotoSans",
              cursor: "pointer",
            }}
            onClick={() => history.push(`/editstudy/${study_id}`)}
          >
            ????????? ????????????
          </button>
        ) : isMember ? (
          <div
            style={{
              background: "#56BE9C",
              borderRadius: "10px",
              width: "386px",
              height: "192px",
              marginTop: "-120px",
              marginLeft: "-530px",
              padding: "39px 27px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: "190px" }}>
                <Title color="white" size="20">
                  ????????????
                </Title>
              </div>
              <Title color="white" size="20" weight="400">
                {member.date}
              </Title>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "15px",
              }}
            >
              <div style={{ width: "190px" }}>
                <Title color="white" size="20">
                  ?????? ?????? ??????
                </Title>
              </div>
              <Title color="white" size="20" weight="400">
                {member.participation}
              </Title>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "15px",
              }}
            >
              <div style={{ width: "190px" }}>
                <Title color="white" size="20">
                  ?????? ?????? ??????
                </Title>
              </div>
              <Title color="white" size="20" weight="400">
                {member.warning}???
              </Title>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {isLeader ? (
          <></>
        ) : isMember ? (
          <button
            style={{
              width: "282px",
              height: "70px",
              background: "#cccccc",
              border: "none",
              borderRadius: "10px",
              fontSize: "24px",
              color: "#ffffff",
              fontWeight: "700",
              fontFamily: "NotoSans",
              cursor: "pointer",
            }}
            onClick={leave}
          >
            ????????????
          </button>
        ) : (
          <div>
            <button
              style={{
                width: "180px",
                height: "70px",
                background: "#FFFFFF",
                border: "1px solid #56Be9c",
                borderRadius: "10px",
                fontSize: "24px",
                color: "#56Be9c",
                fontWeight: "700",
                fontFamily: "NotoSans",
                cursor: "pointer",
                marginRight: "15px",
              }}
              onClick={userChat}
            >
              ????????????
            </button>
            <button
              style={{
                width: "282px",
                height: "70px",
                background: "#56Be9c",
                border: "none",
                borderRadius: "10px",
                fontSize: "24px",
                color: "#ffffff",
                fontWeight: "700",
                fontFamily: "NotoSans",
                cursor: "pointer",
              }}
              onClick={join}
            >
              ?????? ????????????
            </button>
          </div>
        )}
      </Lower>
    </Fix>
  );
};

export default StudyDetail;
