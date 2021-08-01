import React from "react";
import styled from "styled-components";

const Screen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 180px;
  height: 70px;
  background: var(--middle);
  border-radius: 10px;
  margin: 10px;
  margin-top: 40px;
  color: white;
  font-size: 24px;
  outline: none;
  border: none;
`;

const Wrapper = styled.div`
  padding: 50px 110px;
  justify-content: space-between;
  text-align: center;
  background-color: white;
  position: fixed;
  font-size: 20px;

  .title {
    font-weight: bold;
    color: var(--deep);
    font-size: 32px;
    margin-bottom: 10px;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Modal = (props) => {
  const { open, close, title, text, choice } = props;
  return (
    <Screen>
      <Overlay> </Overlay>
      <Wrapper>
        <div className="title">{title}</div>
        <div>{text}</div>
        <div>
          <Button style={{ backgroundColor: "#CCCCCC" }}>뒤로가기</Button>
          <Button>{choice}</Button>
        </div>
      </Wrapper>
    </Screen>
  );
};
export default Modal;
