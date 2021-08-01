import React, { useState } from "react";
import styled from "styled-components";
import x from "../assets/close.png";

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
  color: white;
  font-size: 24px;
  outline: none;
  border: none;
`;

const Wrapper = styled.div`
  width: 609px;
  height: 299px;
  padding: 15px;
  justify-content: space-between;
  text-align: center;
  background-color: white;
  position: fixed;
  font-size: 20px;
  .header {
    display: fixed;
    justify-content: flex-end;
  }
  .img {
    width: 14.5px;
    height: 14.5px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: fixed;
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  border: 1px solid var(--middle);
  box-sizing: border-box;
  padding-left: 30px;
  margin-left: 80px;
  border-radius: 10px;
  width: 480px;
  height: 65px;
  outline: none;
  margin: 20px;
`;

const Modal = (props) => {
  const { open, close, value, onInputChange, onSubmit } = props;
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <Screen>
          <Overlay> </Overlay>
          <Wrapper>
            <div class="header">
              <img src={x} onClick={close}></img>
            </div>
            <div class="content">
              <div style={{ fontWeight: "bold" }}>타이머명 변경하기</div>
              <Input
                type="text"
                placeholder="타이머명을 입력하세요"
                value={value}
                onChange={onInputChange}
              ></Input>
              <Button onClick={onSubmit}>변경하기</Button>
            </div>
          </Wrapper>
        </Screen>
      ) : null}
    </div>
  );
};
export default Modal;
