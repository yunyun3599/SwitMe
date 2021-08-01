import React, { useState } from "react";
import styled from "styled-components";
import Input2 from "../components/Input2";
import Button from "../components/Button";
import logo from "../assets/logo.png";

import { useDispatch } from "react-redux";
import { find_password } from "../_actions/actions";
import { useHistory } from "react-router";

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
  height: 500px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 96%;
  color: #064538;
`;

const FindPassword = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    realname: "",
    email: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const formSubmit = async (evt) => {
    evt.preventDefault();
    console.log(user);
    dispatch(find_password(user)).then((response) => {
      console.log(response);
      if (response.response) {
        console.log("비밀번호 찾기 성공");
        console.log(response.payload);
        // window.localStorage.setItem("id", response.payload);
        // window.localStorage.setItem("isAuth", "true");
        // window.location.replace("/");
      } else {
        console.log(response);
        alert("비밀번호 찾기 오류");
      }
    });
  };

  return (
    <Wrapper>
      <form onSubmit={formSubmit}>
        <Items>
          <img alt="로고" src={logo} style={{ marginBottom: "1rem" }}></img>
          <Input2
            name="realname"
            placeholder="가입된 이름을 입력해주세요"
            width="29rem"
            value={user.id}
            onChange={onInputChange}
          />
          <Input2
            name="email"
            placeholder="가입된 이메일 주소를 입력해주세요"
            width="29rem"
            // value={user.useremail}
            onChange={onInputChange}
          />
          <TextBox>
            <div>가입된 이메일 주소로 확인 메일이 발송됩니다.</div>
          </TextBox>
          <Button name="비밀번호 찾기" width="29rem" color="#56BE9C"></Button>
        </Items>
      </form>
    </Wrapper>
  );
};

export default FindPassword;
