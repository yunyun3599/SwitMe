import React from "react";
import styled from "styled-components";
import Input2 from "../components/Input2";
import Button from "../components/Button";
import { useHistory } from "react-router";
import logo from "../assets/logo.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 35vh;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 96%;
  color: #064538;
`;

const FindEmail = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <Items>
        <img
          alt="로고"
          src={logo}
          style={{ marginBottom: "1rem", cursor: "pointer" }}
          onClick={() => history.push("/")}
        ></img>
        <Input2 name="가입된 이메일 주소를 입력해주세요" width="29rem"></Input2>
        <TextBox>
          <div>가입된 이메일 주소로 확인 메일이 발송됩니다.</div>
        </TextBox>
        <Button name="이메일 찾기" width="29rem" color="#56BE9C"></Button>
      </Items>
    </Wrapper>
  );
};

export default FindEmail;
