import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { saveTimer } from "../_actions/actions";

const Num = styled.div`
  font-size: 100px;
  letter-spacing: 10px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--middle);
  border-radius: 10px;
  margin-left: 40px;
  color: white;
  width: 1000px;
  height: 788px;
  justify-content: center;
  align-items: center;

  .name {
    font-size: 48px;
    height: 70px;
  }

  .timer {
    width: 662px;
    height: 188px;
    font-size: 130px;
    text-align: center;
    border-radius: 10px;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 164px;
  height: 65px;
  border-radius: 40px;
  background-color: var(--deep);
  color: white;
  font-size: 24px;
  margin: 100px 40px;
  font-weight: bold;
  outline: none;
  border: none;
`;

function Watch(props) {
  const { timer, save, isSave } = props;
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const start_time = useRef("");
  const end_time = useRef("");
  const dispatch = useDispatch();

  //시작 status=0
  const start = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);
    var hours = ("0" + today.getHours()).slice(-2);
    var minutes = ("0" + today.getMinutes()).slice(-2);
    var seconds = ("0" + today.getSeconds()).slice(-2);
    start_time.current =
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    run();
    var today = new Date();
    var year = today.getFullYear();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);
    var hours = ("0" + today.getHours()).slice(-2);
    var minutes = ("0" + today.getMinutes()).slice(-2);
    var seconds = ("0" + today.getSeconds()).slice(-2);
    start_time.current =
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    setStatus(1);
    setInterv(setInterval(run, 1000));
  };

  //작동 status=1
  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const reset = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);
    var hours = ("0" + today.getHours()).slice(-2);
    var minutes = ("0" + today.getMinutes()).slice(-2);
    var seconds = ("0" + today.getSeconds()).slice(-2);
    end_time.current =
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    const dataToSubmit = {
      timer_idx: timer.timer_idx,
      timer_duration: time.s + time.m * 60 + time.h * 3600,
      start_time: start_time.current,
      end_time: end_time.current,
    };
    console.log(dataToSubmit);

    dispatch(saveTimer(dataToSubmit)).then((response) => {
      if (response.payload) {
        isSave(!save);
      } else {
        console.log("스톱워치 저장 싪패");
      }
    });
    clearInterval(interv);
    setStatus(0);
    setTime({ s: 0, m: 0, h: 0 });
  };

  return (
    <Wrapper>
      <div style={{ height: "150px" }}></div>
      <div className="timerName">
        <div style={{ fontSize: "48px" }}>{timer.name}</div>
      </div>
      <div
        className="display"
        time={time}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Num>{time.h >= 10 ? time.h : "0" + time.h}</Num>
        <Num>:</Num>
        <Num>{time.m >= 10 ? time.m : "0" + time.m}</Num>
        <Num>:</Num>
        <Num>{time.s >= 10 ? time.s : "0" + time.s}</Num>
      </div>

      <div className="buttons">
        {status === 0 ? (
          timer.timer_idx ? (
            <Button onClick={start}>시작하기</Button>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {status === 1 ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <Button onClick={stop}>일시정지</Button>{" "} */}
            <Button
              style={{ backgroundColor: "white", color: "var(--deep)" }}
              onClick={reset}
            >
              초기화
            </Button>
          </div>
        ) : (
          ""
        )}

        {status === 2 ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <Button onClick={resume}>재개하기</Button>{" "} */}
            <Button
              style={{ backgroundColor: "white", color: "var(--deep)" }}
              onClick={reset}
            >
              정지
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </Wrapper>
  );
}

export default Watch;
