import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import message from "../assets/message.png";
import dot from "../assets/search.png";
import Chat_list from "./Chat_list";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 95px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);

  .menu {
    display: flex;
    flex-direction: row;
  }
`;

const Logo = styled.img`
  height: 37.5px;
  width: 150px;
  margin-right: 70px;
`;

const Menu = styled.div`
  width: 173px;
  height: 95px;
  text-align: center;
  padding: 30px;
  font-size: 24px;
  color: #cccccc;

  :hover {
    border-bottom: 5px solid;
    border-color: var(--middle);
    color: var(--deep);
    cursor: pointer;
  }
`;

const Active = styled.div`
  width: 173px;
  height: 95px;
  text-align: center;
  padding: 30px;
  font-size: 24px;
  border-bottom: 5px solid;
  border-color: var(--middle);
  color: var(--deep);
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  border: 0px solid var(--middle);
  box-sizing: border-box;
  padding-left: 30px;
  margin-left: 80px;
  border-radius: 10px;
  width: 480px;
  height: 65px;
`;

const Input = styled.input`
  width: 409px;
  height: auto;
  font-size: 20px;
  border: none;
  outline: none;
`;

const Button = styled.img`
  width: 65px;
  height: 65px;
`;

function Header({ page }) {
  const history = useHistory();
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  //Chat_list
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("isAuth") === null) {
      window.localStorage.setItem("isAuth", "false");
    }
  }, [modalOpen, rerender]);

  const openModal = () => {
    setModalOpen(true);
    if (window.localStorage.getItem("isAuth") === "false") {
      alert("로그인이 필요한 서비스입니다.");
      history.push("/login");
    } else setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal2 = (idx) => {
    let arr = modalOpen2;
    arr.splice(idx, 1, true);
    setModalOpen2(arr);
    setRerender(!rerender);
  };
  const closeModal2 = (idx) => {
    let arr = modalOpen2;
    arr.splice(idx, 1, false);

    setModalOpen2(arr);
    setRerender(!rerender);
  };

  //화면이동
  const Main = () => {
    history.push("/");
  };
  const StopWatch = () => {
    history.push("/StopWatch");
    if (window.localStorage.getItem("isAuth") === "false") {
      alert("로그인이 필요한 서비스입니다.");
      history.push("/login");
    } else history.push("/StopWatch");
  };
  const StudyList = () => {
    history.push("/StudyList");
    if (window.localStorage.getItem("isAuth") === "false") {
      alert("로그인이 필요한 서비스입니다.");
      history.push("/login");
    } else history.push("/StudyList");
  };

  return (
    <Wrapper>
      <Logo
        src={logo}
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/")}
      ></Logo>

      {page === "0" ? (
        <div class="menu">
          <Active>홈</Active>
          <Menu onClick={StopWatch}>스톱워치</Menu>
          <Menu onClick={StudyList}>스터디</Menu>
        </div>
      ) : null}

      {page === "1" ? (
        <div class="menu">
          <Menu onClick={Main}>홈</Menu>
          <Active>스톱워치</Active>
          <Menu onClick={StudyList}>스터디</Menu>
        </div>
      ) : null}

      {page === "2" ? (
        <div class="menu">
          <Menu onClick={Main}>홈</Menu>
          <Menu onClick={StopWatch}>스톱워치</Menu>
          <Active>스터디</Active>
        </div>
      ) : null}

      {page === "3" ? (
        <div class="menu">
          <Menu onClick={Main}>홈</Menu>
          <Menu onClick={StopWatch}>스톱워치</Menu>
          <Menu onClick={StudyList}>스터디</Menu>
        </div>
      ) : null}

      <Search></Search>
      <Button
        onClick={openModal}
        src={message}
        style={{ marginLeft: "61px" }}
      ></Button>
      {/* Chat_list 시작 */}
      <React.Fragment>
        {modalOpen ? (
          <Chat_list
            setinitial={setModalOpen2}
            open={modalOpen}
            close={closeModal}
            openstate2={modalOpen2}
            open2={openModal2}
            close2={closeModal2}
            header=""
          >
            {/* // Chat_list.js <main> {props.children} </main>에 내용이 입력됨. */}
          </Chat_list>
        ) : (
          <></>
        )}
      </React.Fragment>
      {/* Chat_list 끝*/}
      <Button
        onClick={
          window.localStorage.getItem("isAuth") === "false"
            ? () => history.push("/login")
            : () => history.push("/mypage")
        }
        src={profile}
        style={{ marginLeft: "29px" }}
      ></Button>
    </Wrapper>
  );
}
export default Header;
