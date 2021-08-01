import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Image from "../components/Image";
import Title from "../components/Title";
import {
  getUserInfo,
  getUserStopwatch,
  getUserStudy,
} from "../_actions/actions";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 90vh; */
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: #56be9c 1px solid;
  border-radius: 5px;
  padding-left: 48px;
  padding-right: 24px;
  padding-top: 32px;
  padding-bottom: 28px;
  width: 1520px;
  height: 220px;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  border: #56be9c 1px solid;
  border-radius: 5px;
  padding: 25px;
  width: 739px;
  height: 441px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Study = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 739px;
  margin-top: 20px;
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "black"};
  display: inline-block;
  margin-right: 8px;
`;

const Mypage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [studytoggle, setStudyToggle] = useState(1);
  const [user, setUser] = useState({
    user_idx: "",
    user_email: "",
    username: "",
    user_image: "",
    user_manner: "",
  });
  const [studies, setStudies] = useState([]);

  const [times, setTimes] = useState([]);
  useEffect(() => {
    const user_id = window.localStorage.getItem("id");
    dispatch(getUserInfo(user_id)).then((response) => {
      if (response.payload) {
        setUser(response.payload);
        console.log(response.payload);
      } else {
        console.log("회원정보 가져오기 에러");
      }
    });
    dispatch(getUserStudy(user_id)).then((response) => {
      if (response.payload) {
        setStudies(response.payload);
        console.log(response.payload);
      } else {
        console.log("스터디 목록 가져오기 에러");
      }
    });
    dispatch(getUserStopwatch(user_id)).then((response) => {
      if (response.payload) {
        let arr = [];
        response.payload?.map((log, i) => {
          const start_date = log.start_time.slice(0, 10);
          const end_date = log.end_time.slice(0, 10);
          const start_time = log.start_time.slice(11);
          const end_time = log.end_time.slice(11);
          const hour = Math.floor(log.duration / 360);
          const minute = Math.floor(log.duration / 60);
          const strminute = minute < 10 ? "0" + minute : minute;
          const second = log.duration % 60;
          const strsecond = second < 10 ? "0" + second : second;
          arr.push({
            start_date: start_date,
            end_date: end_date,
            start_time: start_time,
            end_time: end_time,
            total: String(hour) + " : " + strminute + " : " + strsecond,
          });
        });
        setTimes(arr);
      } else {
        console.log("스톱워치 목록 가져오기 에러");
      }
    });
  }, []);

  const logout = () => {
    window.localStorage.setItem("isAuth", "false");
    window.localStorage.setItem("id", "");
    history.push("/");
  };

  return (
    <Wrapper>
      <Header page="3" />
      <Col>
        <Row
          style={{
            width: "1520px",
            marginTop: "118px",
            marginBottom: "18px",
            justifyContent: "flex-start",
          }}
        >
          <Title>내정보</Title>
        </Row>
        <ProfileBox>
          <Row style={{ justifyContent: "space-between", width: "850px" }}>
            <Col>
              <Image
                alt="profile"
                src={user.user_image}
                width="124"
                height="124"
                radius="60"
              />
            </Col>
            <Col style={{ width: "660px" }}>
              <Title size="32" color="#064538">
                {user.user_name}
              </Title>
              <br />
              <Title size="24" weight="400" marginBottom="5">
                학교 인증 완료
              </Title>

              <Title size="24" weight="400" marginBottom="5">
                {user.user_email}
              </Title>

              <Title size="24" weight="400" marginBottom="5">
                매너온도 {user.user_manner}°C
              </Title>
            </Col>
          </Row>
          <Button
            name="회원정보수정"
            width="251px"
            height="65px"
            color="var(--middle)"
            borderRadius="40px"
            onClick={() => history.push(`/edituser`)}
          ></Button>
          <Button
            name="로그아웃"
            width="251px"
            height="65px"
            color="#CCCCCC"
            borderRadius="40px"
            onClick={logout}
          ></Button>
        </ProfileBox>
        <Row
          style={{
            justifyContent: "space-between",
            marginTop: "103px",
            marginBottom: "18px",
          }}
        >
          <Row style={{ width: "739px", justifyContent: "space-between" }}>
            <Title>참여 스터디 목록</Title>
            {studytoggle === 1 ? (
              <span style={{ float: "right" }}>
                <span
                  style={{ marginRight: "31px", cursor: "pointer" }}
                  onClick={() => setStudyToggle(1)}
                >
                  <Circle />
                  활동중
                </span>
                <span
                  style={{ color: "#cccccc", cursor: "pointer" }}
                  onClick={() => setStudyToggle(2)}
                >
                  <Circle color="#cccccc" />
                  종료
                </span>
              </span>
            ) : (
              <span style={{ float: "right" }}>
                <span
                  style={{
                    marginRight: "31px",
                    color: "#cccccc",
                    cursor: "pointer",
                  }}
                  onClick={() => setStudyToggle(1)}
                >
                  <Circle color="#cccccc" />
                  활동중
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setStudyToggle(2)}
                >
                  <Circle />
                  종료
                </span>
              </span>
            )}
          </Row>
          <Row style={{ width: "739px", justifyContent: "flex-start" }}>
            <Title>스톱워치 사용 기록</Title>
          </Row>
        </Row>
        <Row>
          <ListBox style={{ marginRight: "40px" }}>
            {studytoggle === 1
              ? studies.map((study, i) => {
                  if (study.activate === "N") return false;
                  return (
                    <Study key={i}>
                      <img
                        alt="study profile"
                        src={study.study_image}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "10px",
                          marginRight: "20px",
                        }}
                      />
                      <Col
                        style={{ width: "350px", cursor: "pointer" }}
                        onClick={() =>
                          history.push(`studydetail/${study.study_idx}`)
                        }
                      >
                        <div style={{ width: "97px" }}>
                          <Title width="150" size="20" weight="700">
                            {study.study_title}
                          </Title>
                        </div>
                        <div style={{ width: "200px" }}>
                          <Title size="18" color="#CCCCCC" weight="400">
                            {study.start_date} - {study.end_date}
                          </Title>
                        </div>
                      </Col>
                      <div style={{ width: "160px", marginRight: "30px" }}>
                        <Title size="24" weight="400" color="#56BE9C">
                          누적 경고 {study.warning}회
                        </Title>
                      </div>
                      <div
                        style={{
                          width: "120px",
                          marginRight: "58px",
                        }}
                      >
                        <Title
                          size="24"
                          weight="400"
                          color="#56BE9C"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            history.push(`/memberlist/${study.study_idx}`)
                          }
                        >
                          멤버 보기
                        </Title>
                      </div>
                    </Study>
                  );
                })
              : studies.map((study, i) => {
                  if (study.activate === "Y") return false;
                  return (
                    <Study
                      key={i}
                      onClick={() =>
                        history.push(`studydetail/${study.study_idx}`)
                      }
                    >
                      <img
                        alt="study profile"
                        src={study.study_image}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "58px",
                        }}
                      />
                      <Col
                        style={{ width: "350px", cursor: "pointer" }}
                        onClick={() =>
                          history.push(`studydetail/${study.study_idx}`)
                        }
                      >
                        <div style={{ width: "97px" }}>
                          <Title width="150" size="20" weight="700">
                            {study.study_title}
                          </Title>
                        </div>
                        <div style={{ width: "270px" }}>
                          <Title size="18" color="#CCCCCC" weight="400">
                            {study.start_date} - {study.end_date}
                          </Title>
                        </div>
                      </Col>
                      <div style={{ width: "152px", marginRight: "58px" }}>
                        <Title size="24" weight="400" color="#56BE9C">
                          누적 경고 {study.warning}회
                        </Title>
                      </div>
                    </Study>
                  );
                })}
          </ListBox>
          <ListBox>
            {times.map((study, i) => {
              return (
                <Study key={i}>
                  <Col style={{ marginLeft: "30px" }}>
                    <div style={{ width: "141px" }}>
                      <Title size="20" weight="400">
                        {study.start_date === study.end_date
                          ? study.start_date
                          : String(study.start_date) +
                            " - " +
                            String(study.end_date)}
                      </Title>
                    </div>
                    <div style={{ width: "270px", marginLeft: "50px" }}>
                      {study.start_time} - {study.end_time}
                    </div>
                  </Col>
                  <div style={{ width: "152px", marginRight: "58px" }}>
                    <Title size="20" weight="400" color="#56BE9C">
                      {study.total}
                    </Title>
                  </div>
                </Study>
              );
            })}
          </ListBox>
        </Row>
      </Col>
    </Wrapper>
  );
};

export default Mypage;
