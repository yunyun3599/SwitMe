import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import Header from "../components/Header";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { makestudy } from "../_actions/actions";

//antd datePicker
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import Form from "antd/lib/form/Form";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 90vh; */
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Textbox = styled.div`
  width: 11rem;
`;

const Inputbox = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;

  ul {
    width: 140px;
    display: none;
    padding-left: 0px;
    border: 1px solid #56be9c;
    border-radius: 10px;
    z-index: 1;
    position: absolute;
    margin-top: 65px;
    overflow-y: scroll;
    height: 200px;
  }
  li {
    padding: 5px 10px;
    list-style: none;
    display: none;
    border-radius: 10px;
    :hover {
      border: 1px solid #56be9c;
    }
  }
  :hover {
    ul,
    li {
      display: block;
      cursor: pointer;
      background-color: white;
      z-index: 1;
    }
  }
`;

const RadioButton = styled.input`
  border: 1px solid #56be9c;
  width: 41px;
  height: 41px;
`;

const MakeStudy = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [study, setStudy] = useState({
    title: "",
    type: "online",
    termstart: "",
    termend: "",
    timestart: "12:00",
    timeend: "12:00",
    size: 0,
    tags: "",
    location: "",
    extra: "",
    image: "", //추후에 이미지 받아오는 부분 구현되면 formData로 보내기
    link: "",
    leader: 0,
  });
  const [image, setImage] = useState();

  const onFormSubmit = () => {
    // const data = new FormData();
    // data.append("title", study.title);
    // data.append("type", study.type);
    // data.append("termstart", study.termstart);
    // data.append("termend", study.termend);
    // data.append("timestart", study.timestart + ":00");
    // data.append("timeend", study.timeend + ":00");
    // data.append("size", study.size);
    // data.append("tags", study.tags);
    // data.append("location", study.location);
    // data.append("extra", study.extra);
    // data.append("link", study.link);
    // data.append("leader", window.localStorage.getItem("id"));
    // data.append("image", image);
    const data = {
      title: study.title,
      type: study.type,
      termstart: study.termstart,
      termend: study.termend,
      timestart: study.timestart + ":00",
      timeend: study.timeend + ":00",
      size: study.size,
      tags: study.tags,
      location: study.location,
      extra: study.extra,
      image: study.image, //추후에 이미지 받아오는 부분 구현되면 formData로 보내기
      link: study.link,
      leader: window.localStorage.getItem("id"),
    };
    console.log(data);
    dispatch(makestudy(data)).then((response) => {
      if (response.type) {
        alert("스터디가 생성되었습니다..");
        history.push(`/`);
      } else {
        console.log("스터디 생성 실패");
      }
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setStudy({ ...study, [name]: value });
  };

  //DatePicker

  const handleTermStartChange = (date, dateString, id) => {
    dateString = dateString.replaceAll("/", "-");
    study.termstart = dateString;
    console.log(study.termstart);
    console.log(study);
  };

  const handleTermEndChange = (date, dateString, id) => {
    dateString = dateString.replaceAll("/", "-");
    study.termend = dateString;
    console.log(study.termend);
    console.log(study);
  };

  const editImage = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.click();
    input.onchange = function (e) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setStudy({ ...study, image: imageUrl });
      setImage(imageFile);
    };
  };

  return (
    <Wrapper>
      <Header page="3" />
      <Row style={{ marginTop: "40px" }}>
        <Col>
          <div style={{ marginLeft: "10px" }}>
            <Title>스터디 개설하기</Title>
          </div>
          <img
            alt="study profile"
            src={study.image || require("../assets/rectangle.png").default}
            style={{
              width: "220px",
              height: "220px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
          <Button
            name="이미지 추가하기"
            width="220px"
            height="70px"
            color="#56BE9C"
            onClick={editImage}
          ></Button>
        </Col>

        <Col style={{ marginLeft: "40px" }}>
          <Row style={{ alignItems: "center" }}>
            <Textbox>
              <Title>스터디 이름</Title>
            </Textbox>
            <Inputbox>
              <Input
                name="title"
                value={study.title}
                placeholder="스터디의 이름을 작성해주세요"
                width="1000"
                inputwidth="950"
                marginTop="18"
                validinput="true"
                onChange={onInputChange}
              ></Input>
            </Inputbox>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Textbox>
              <Title>진행 방식</Title>
            </Textbox>
            <Inputbox>
              <Row style={{ paddingTop: "18px" }}>
                <Col>
                  <RadioButton
                    type="radio"
                    id="online"
                    name="onoff"
                    onChange={() => setStudy({ ...study, type: "online" })}
                  ></RadioButton>
                </Col>
                <Col
                  style={{
                    padding: "6px",
                    paddingLeft: "20px",
                    fontSize: "20px",
                    marginRight: "45px",
                  }}
                >
                  <label id="online">온라인</label>
                </Col>
                <Col>
                  <RadioButton
                    type="radio"
                    id="offline"
                    name="onoff"
                    onChange={() => setStudy({ ...study, type: "offline" })}
                  ></RadioButton>
                </Col>
                <Col
                  style={{
                    padding: "6px",
                    paddingLeft: "20px",
                    fontSize: "20px",
                    marginRight: "45px",
                  }}
                >
                  <label id="offline">오프라인</label>
                </Col>
              </Row>
            </Inputbox>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Textbox>
              <Title>기간</Title>
            </Textbox>
            <Inputbox style={{ paddingTop: "18px" }}>
              {/* <Input
                name="termstart"
                value={study.termstart}
                placeholder="날짜를 선택하세요"
                width="300"
                inputwidth="160"
                marginTop="18"
                validinput="true"
                onChange={onInputChange}
              ></Input> */}
              <DatePicker
                style={{
                  borderColor: "#56BE9C",
                  borderRadius: "10px",
                  fontSize: "20px",
                  paddingLeft: "25px",
                  paddingRight: "20px",
                  width: "200px",
                }}
                title={study.termstart}
                format="YYYY/MM/DD"
                placeholder="날짜를 선택하세요"
                onChange={(date, dateString) =>
                  handleTermStartChange(date, dateString, 1)
                }
              />
              <div style={{ margin: "15px", marginTop: "30px" }}>
                <img
                  alt="line"
                  src={require("../assets/line.png").default}
                  style={{ width: "57px", height: "3px" }}
                />
              </div>
              {/* <Input
                name="termend"
                value={study.termend}
                placeholder="날짜를 선택하세요"
                width="300"
                inputwidth="160"
                marginTop="18"
                validinput="true"
                onChange={onInputChange}
              ></Input> */}
              <DatePicker
                style={{
                  borderColor: "#56BE9C",
                  borderRadius: "10px",
                  fontSize: "20px",
                  paddingLeft: "25px",
                  width: "200px",
                  paddingRight: "20px",
                }}
                title={study.termend}
                format="YYYY/MM/DD"
                placeholder="날짜를 선택하세요"
                onChange={(date, dateString) =>
                  handleTermEndChange(date, dateString, 2)
                }
              />
            </Inputbox>
          </Row>

          {/*dropdown */}
          <Row
            style={{
              alignItems: "center",
              marginTop: "18px",
              marginBottom: "18px",
            }}
          >
            <Textbox>
              <Title>시간</Title>
            </Textbox>
            <Inputbox>
              <Item>
                <Input width="141" height="65">
                  <Title size="20" weight="400">
                    {study.timestart}
                  </Title>
                  <img
                    alt="dropdown"
                    src={require("../assets/dropdown.png").default}
                    style={{ marginLeft: "21px" }}
                  />
                </Input>
                <ul>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "00:00" })}
                  >
                    <Title size="20" weight="400">
                      00:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "01:00" })}
                  >
                    <Title size="20" weight="400">
                      01:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "02:00" })}
                  >
                    <Title size="20" weight="400">
                      02:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "03:00" })}
                  >
                    <Title size="20" weight="400">
                      03:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "04:00" })}
                  >
                    <Title size="20" weight="400">
                      04:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "05:00" })}
                  >
                    <Title size="20" weight="400">
                      05:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "06:00" })}
                  >
                    <Title size="20" weight="400">
                      06:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "07:00" })}
                  >
                    <Title size="20" weight="400">
                      07:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "08:00" })}
                  >
                    <Title size="20" weight="400">
                      08:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "09:00" })}
                  >
                    <Title size="20" weight="400">
                      09:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "10:00" })}
                  >
                    <Title size="20" weight="400">
                      10:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "11:00" })}
                  >
                    <Title size="20" weight="400">
                      11:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "12:00" })}
                  >
                    <Title size="20" weight="400">
                      12:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "13:00" })}
                  >
                    <Title size="20" weight="400">
                      13:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "14:00" })}
                  >
                    <Title size="20" weight="400">
                      14:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "15:00" })}
                  >
                    <Title size="20" weight="400">
                      15:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "16:00" })}
                  >
                    <Title size="20" weight="400">
                      16:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "17:00" })}
                  >
                    <Title size="20" weight="400">
                      17:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "18:00" })}
                  >
                    <Title size="20" weight="400">
                      18:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "19:00" })}
                  >
                    <Title size="20" weight="400">
                      19:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "20:00" })}
                  >
                    <Title size="20" weight="400">
                      20:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "21:00" })}
                  >
                    <Title size="20" weight="400">
                      21:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "22:00" })}
                  >
                    <Title size="20" weight="400">
                      22:00
                    </Title>
                  </li>
                  <li
                    onClick={() => setStudy({ ...study, timestart: "23:00" })}
                  >
                    <Title size="20" weight="400">
                      23:00
                    </Title>
                  </li>
                </ul>
              </Item>
              <div style={{ margin: "15px" }}>
                <img
                  alt="line"
                  src={require("../assets/line.png").default}
                  style={{ width: "57px", height: "3px" }}
                />
              </div>
              <Item>
                <Input width="141" height="65">
                  <Title size="20" weight="400">
                    {study.timeend}
                  </Title>
                  <img
                    alt="dropdown"
                    src={require("../assets/dropdown.png").default}
                    style={{ marginLeft: "21px" }}
                  />
                </Input>
                <ul>
                  <li onClick={() => setStudy({ ...study, timeend: "00:00" })}>
                    <Title size="20" weight="400">
                      00:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "01:00" })}>
                    <Title size="20" weight="400">
                      01:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "02:00" })}>
                    <Title size="20" weight="400">
                      02:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "03:00" })}>
                    <Title size="20" weight="400">
                      03:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "04:00" })}>
                    <Title size="20" weight="400">
                      04:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "05:00" })}>
                    <Title size="20" weight="400">
                      05:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "06:00" })}>
                    <Title size="20" weight="400">
                      06:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "07:00" })}>
                    <Title size="20" weight="400">
                      07:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "08:00" })}>
                    <Title size="20" weight="400">
                      08:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "09:00" })}>
                    <Title size="20" weight="400">
                      09:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "10:00" })}>
                    <Title size="20" weight="400">
                      10:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "11:00" })}>
                    <Title size="20" weight="400">
                      11:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "12:00" })}>
                    <Title size="20" weight="400">
                      12:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "13:00" })}>
                    <Title size="20" weight="400">
                      13:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "14:00" })}>
                    <Title size="20" weight="400">
                      14:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "15:00" })}>
                    <Title size="20" weight="400">
                      15:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "16:00" })}>
                    <Title size="20" weight="400">
                      16:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "17:00" })}>
                    <Title size="20" weight="400">
                      17:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "18:00" })}>
                    <Title size="20" weight="400">
                      18:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "19:00" })}>
                    <Title size="20" weight="400">
                      19:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "20:00" })}>
                    <Title size="20" weight="400">
                      20:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "21:00" })}>
                    <Title size="20" weight="400">
                      21:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "22:00" })}>
                    <Title size="20" weight="400">
                      22:00
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, timeend: "23:00" })}>
                    <Title size="20" weight="400">
                      23:00
                    </Title>
                  </li>
                </ul>
              </Item>
            </Inputbox>
          </Row>
          <Row
            style={{
              alignItems: "center",
            }}
          >
            <Textbox>
              <Title>최대 모집 인원</Title>
            </Textbox>
            <Inputbox>
              <Item>
                <Input width="141" height="65">
                  <Title size="20" weight="400">
                    {study.size}
                  </Title>
                  <img
                    alt="dropdown"
                    src={require("../assets/dropdown.png").default}
                    style={{ marginLeft: "21px" }}
                  />
                </Input>
                <ul>
                  <li onClick={() => setStudy({ ...study, size: 0 })}>
                    <Title size="20" weight="400">
                      0
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 1 })}>
                    <Title size="20" weight="400">
                      1
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 2 })}>
                    <Title size="20" weight="400">
                      2
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 3 })}>
                    <Title size="20" weight="400">
                      3
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 4 })}>
                    <Title size="20" weight="400">
                      4
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 5 })}>
                    <Title size="20" weight="400">
                      5
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 6 })}>
                    <Title size="20" weight="400">
                      6
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 7 })}>
                    <Title size="20" weight="400">
                      7
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 8 })}>
                    <Title size="20" weight="400">
                      8
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 9 })}>
                    <Title size="20" weight="400">
                      9
                    </Title>
                  </li>
                  <li onClick={() => setStudy({ ...study, size: 10 })}>
                    <Title size="20" weight="400">
                      10
                    </Title>
                  </li>
                </ul>
              </Item>
            </Inputbox>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Textbox>
              <Title>태그</Title>
            </Textbox>
            <Inputbox>
              <Input
                name="tags"
                value={study.tags}
                placeholder="태그를 입력하세요"
                width="1000"
                inputwidth="950"
                marginTop="18"
                validinput="true"
                onChange={onInputChange}
              ></Input>
            </Inputbox>
          </Row>
          <Row style={{ alignItems: "center" }}>
            {study.type === "online" ? (
              <>
                <Textbox>
                  <Title>링크</Title>
                </Textbox>
                <Inputbox>
                  <Input
                    name="link"
                    value={study.link}
                    placeholder="사용하실 온라인 회의 링크를 입력하세요 (Zoom, Google Meet 등)"
                    width="1000"
                    inputwidth="950"
                    marginTop="18"
                    validinput="true"
                    onChange={onInputChange}
                  ></Input>
                </Inputbox>
              </>
            ) : (
              <>
                <Textbox>
                  <Title>장소</Title>
                </Textbox>
                <Inputbox>
                  <Input
                    placeholder="장소찾기"
                    width="178"
                    inputwidth="110"
                    marginTop="18"
                    validinput="true"
                  >
                    <img
                      alt="dropdown"
                      src={require("../assets/vector.png").default}
                    />
                  </Input>
                </Inputbox>
              </>
            )}
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Textbox>
              <Title>기타 사항</Title>
            </Textbox>
            <Inputbox>
              <Input
                name="extra"
                value={study.extra}
                placeholder="추가적인 사항을 기재해주세요 (조용한 정도, 타이핑/마우스 사용 여부 등)"
                width="1000"
                inputwidth="950"
                marginTop="18"
                validinput="true"
                onChange={onInputChange}
              ></Input>
            </Inputbox>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "120px",
            }}
          >
            <Button
              name="이전으로"
              width="180px"
              height="70px"
              color="#CCCCCC"
            ></Button>
            <Button
              name="스터디 개설하기"
              width="220px"
              height="70px"
              color="#56BE9C"
              onClick={onFormSubmit}
            ></Button>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MakeStudy;
