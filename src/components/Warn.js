import React, { useState, useEffect } from "react";
import "../assets/chat.css";
import styled from "styled-components";
import Button from "../components/Button";
// import { useDispatch } from "react-redux";
// import { getStudydetail, getMember, warnMember } from "../_actions/actions";

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const RadioButton = styled.input`
  border: 1px solid #56be9c;
  width: 41px;
  height: 41px;
`;

const TextBox = styled.textarea`
  /* display: none; */
  margin: 0 auto;
  width: 460px;
  height: 150px;
  outline: none;
  border: 1px solid #c70000;
  border-radius: 10px;
  background-color: white;
`;

const Warn = (props) => {
  // console.log(props);
  // console.log(match);
  // const { study_id } = match.params.MemberList;
  // const dispatch = useDispatch();
  // const [study, setStudy] = useState("");
  // const [members, setMembers] = useState([]);
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  // const warn = (user_idx) => {
  //   const data = {
  //     study_idx: study_id,
  //     user_idx: user_idx,
  //   };
  //   console.log(data);
  //   dispatch(warnMember(data)).then((response) => {
  //     if (response.payload) {
  //       console.log("경고 성공");
  //     } else {
  //       console.log("경고 주기 에러 발생");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   dispatch(getMember(study_id)).then((response) => {
  //     if (response.payload) {
  //       console.log("스터디 멤버 정보 가져오기 성공");
  //       console.log(response.payload);
  //       setMembers(response.payload);
  //     } else {
  //       console.log("스터디 멤버 정보 가져오기 실패");
  //     }
  //   });
  // }, []);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header
            style={{
              height: "105px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0px 5px 15px grey",
            }}
          >
            {header}
            <div
              style={{
                color: "#064538",
                fontWeight: "900px",
                fontSize: "26px",
                marginLeft: "30px",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              스터디원 이름 쓰는 칸
            </div>
            <div style={{ marginLeft: "30px", marginBottom: "20px" }}>
              해당 스터디원에게 경고하시겠습니까?
            </div>
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <main>
            {/* {props.children} */}
            <p style={{ margin: "10px", fontSize: "18px", fontWeight: "700" }}>
              경고사유
            </p>
            <List>
              <Row>
                <RadioButton type="radio" id="online" name="noshow" />
                <label
                  style={{ paddingTop: "7px", paddingLeft: "5px" }}
                  id="noshow"
                >
                  노쇼
                </label>
              </Row>
              <Row>
                <RadioButton type="radio" id="online" name="rate" />
                <label
                  style={{ paddingTop: "7px", paddingLeft: "5px" }}
                  id="rate"
                >
                  지각
                </label>
              </Row>
              <Row>
                <RadioButton type="radio" id="online" name="rule" />
                <label
                  style={{ paddingTop: "7px", paddingLeft: "5px" }}
                  id="rule"
                >
                  스터디 규칙 미준수
                </label>
              </Row>
              <Row style={{ marginBottom: "15px" }}>
                <RadioButton type="radio" id="online" name="ect" />
                <label
                  style={{ paddingTop: "7px", paddingLeft: "5px" }}
                  id="ect"
                >
                  기타 사유
                </label>
              </Row>
            </List>
            <p style={{ margin: "10px", fontSize: "18px", fontWeight: "700" }}>
              상세내용
            </p>
            <List>
              <TextBox />
              <Col
                style={{
                  margin: "10px",
                  alignItems: "center",
                }}
              >
                <Button
                  name="확인하기"
                  color="#C70000"
                  width="180px"
                  height="70px"
                  onClick={close}
                  // onClick={() => warn(members.user_idx)}
                />
              </Col>
            </List>
          </main>

          <footer></footer>
        </section>
      ) : null}
    </div>
  );
};

export default Warn;
