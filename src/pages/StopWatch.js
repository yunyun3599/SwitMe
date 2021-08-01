import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Watch from "../components/Watch";
import TimerList from "../components/TimerList";
import ModalTimer from "../components/ModalTimer";
import TimerListContent from "../components/TimerListContent";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 200px;
  padding-left: 200px;
  padding-top: 118px;
`;

const StopWatch = () => {
  const [timer, setTimer] = useState({
    timer_idx: "",
    name: "",
    duration: "0:00:00",
  });

  const [save, isSave] = useState(false);
  const changeTimer = (newTimer) => {
    setTimer(newTimer);
  };
  useEffect(() => {
    console.log(save);
  }, [timer, save]);

  return (
    <div>
      <Header page="1"></Header>
      <Wrapper>
        <TimerList changeTimer={changeTimer} change={save}></TimerList>
        <Watch timer={timer} save={save} isSave={isSave}></Watch>
      </Wrapper>
    </div>
  );
};

export default StopWatch;
