import React, { useState } from "react";
import styled from "styled-components";
import Input2 from "../components/Input2";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { login } from "../_actions/actions";
import { useDispatch } from "react-redux";
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
  height: 540px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  color: #064538;
`;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    pw: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const formSubmit = async (evt) => {
    evt.preventDefault();
    console.log(user);
    dispatch(login(user)).then((response) => {
      if (response.payload) {
        console.log("로그인 성공");
        window.localStorage.setItem("id", response.payload);
        window.localStorage.setItem("isAuth", "true");
        window.location.replace("/");
      } else {
        console.log(response);
        alert("로그인 오류");
      }
    });
  };

  return (
    <Wrapper>
      <form onSubmit={formSubmit}>
        <Items>
          <img
            alt="로고"
            src={logo}
            style={{ marginBottom: "1rem", cursor: "pointer" }}
            onClick={() => history.push("/")}
          ></img>
          <Input2
            name="email"
            placeholder="E-mail"
            width="29rem"
            value={user.id}
            onChange={onInputChange}
          ></Input2>
          <Input2
            name="pw"
            type="password"
            placeholder="비밀번호"
            width="29rem"
            value={user.password}
            onChange={onInputChange}
          ></Input2>
          <Button
            name="로그인"
            width="29rem"
            color="#56BE9C"
            type="submit"
          ></Button>
          <TextBox>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/findemail")}
            >
              이메일 / 비밀번호 찾기
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/signup")}
            >
              회원가입
            </div>
          </TextBox>
        </Items>
      </form>
    </Wrapper>
  );
};

export default Login;
