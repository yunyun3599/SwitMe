import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router";
import Default from "../assets/profile.png";
import { useDispatch } from "react-redux";
import Edit from "../assets/edit.png";
import { getUserInfo, editUser } from "../_actions/actions";
import ImageUpload from "../components/ImageUpload";
import { checkPropTypes } from "prop-types";

const Wrapper = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: content;
`;

const Profile = styled.div`
  width: 198px;
  height: 198px;
  border-radius: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  background: url(${(props) => props.src});
  background-size: 100%;
`;

const Input = styled.input`
  width: 480px;
  height: 65px;
  border-radius: 10px;
  border: 1px solid var(--middle);
  margin: 20px;
  outline: none;
  font-size: 20px;
  padding: 10px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 480px;
  height: 65px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  margin: 20px;
  outline: none;
  font-size: 20px;
  background: #dddddd;
  padding: 10px;
`;

const Button = styled.button`
  width: 228px;
  height: 70px;
  background: var(--middle);
  border-radius: 10px;
  margin: 10px;
  margin-top: 40px;
  color: white;
  font-size: 24px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const EditUser = () => {
  const user_id = window.localStorage.getItem("id");
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    user_idx: "",
    user_email: "",
    username: "",
    user_image: "",
    user_manner: "",
  });
  const [changedUser, setChangedUser] = useState({
    image: null,
    new_password: "",
    check_new_password: "",
  });

  useEffect(() => {
    dispatch(getUserInfo(user_id)).then((response) => {
      if (response.payload) {
        setUser(response.payload);
      } else {
        console.log("회원정보 가져오기 에러");
      }
    });
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setChangedUser({ ...changedUser, [name]: value });
  };

  const submit = () => {
    if (changedUser.check_new_password !== changedUser.new_password) {
      alert("비밀번호 확인이 일치하지 않습니다");
      console.log(changedUser.check_new_password);
      console.log(changedUser.new_password);
    } else {
      const formData = new FormData();
      formData.append("file", changedUser.image);
      formData.append("user_idx", user_id);
      formData.append("password", changedUser.new_password);
      dispatch(editUser(formData)).then((response) => {
        console.log(response);
        if (response.payload) {
          alert("회원 정보가 수정되었습니다.");
          window.location.replace("/mypage");
        } else {
          console.log("회원 정보 수정 실패");
        }
      });
    }
  };
  // const history = useHistory();

  const uploadImage = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.click();
    input.onchange = function (e) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setUser({ ...user, user_image: imageUrl });
      setChangedUser({ ...changedUser, image: imageFile });
    };
  };

  return (
    <Wrapper>
      <Profile src={user.user_image}>
        <img
          alt="profile img"
          onClick={uploadImage}
          src={Edit}
          style={{ width: "51px", height: "51px", cursor: "pointer" }}
        ></img>
      </Profile>

      <div style={{ height: "50px" }}></div>
      <Box>{user.user_name}</Box>
      <Box>{user.user_email}</Box>
      <Input
        name="new_password"
        onChange={onInputChange}
        value={changedUser.new_password}
        placeholder="새 비밀번호 (영문, 숫자, 특수기호 포함 8~16자)"
        type="password"
      ></Input>
      <Input
        name="check_new_password"
        onChange={onInputChange}
        value={changedUser.check_new_password}
        placeholder="비밀번호 확인"
        type="password"
      ></Input>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          style={{ backgroundColor: "#cccccc" }}
          onClick={() => history.push("/mypage")}
        >
          뒤로가기
        </Button>
        <Button onClick={submit}>수정하기</Button>
      </div>

      {/* </form> */}
    </Wrapper>
  );
};

export default EditUser;
