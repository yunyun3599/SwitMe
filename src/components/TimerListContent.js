import React, { useState } from "react";
import styled from "styled-components";
import pencil from "../assets/pencil.png";
import whitePencil from "../assets/whitepencil.png";
import x from "../assets/close.png";
import ModalTimer from "./ModalTimer";
import { useDispatch } from "react-redux";
import { editTimer } from "../_actions/actions";

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 31px;
  border-bottom: 1px solid var(--middle);
  box-sizing: border-box;
  height: 67px;
  font-size: 20px;

  .green {
    width: 180px;
    display: fixed;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    width: 232px;
  }
  .time {
    font-weight: bold;
    display: flex;
    justify-content: center;
    color: var(--middle);
    width: 102px;
  }

  .edit {
    width: 19.1px;
    height: 19.1px;
    background: url(${pencil});
    background-size: 100%;
  }
  .delete {
    width: 19.1px;
    height: 19.1px;
    background: url(${x});
    background-size: 100%;
  }

  :hover {
    background-color: var(--middle);
    color: white;
    .name {
      color: white;
    }
    .time {
      color: white;
    }
    .edit {
      width: 19.1px;
      height: 19.1px;
      background: url(${whitePencil});
      background-size: 100%;
    }
    .delete {
      width: 19.1px;
      height: 19.1px;
      background: url(${x});
      background-size: 100%;
    }
  }
`;

const TimerListContent = ({
  timer,
  onRemove,
  toggle,
  setToggle,
  changeTimer,
}) => {
  const { timer_idx, name, duration } = timer;
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const onInputChange = (e) => {
    setNewName(e.target.value);
  };

  const onSubmit = () => {
    console.log(timer_idx);
    dispatch(editTimer(timer_idx, { timer_name: newName })).then((response) => {
      if (response.payload) {
        console.log(response.payload);
        setToggle(!toggle);
      } else {
        console.log("스톱워치 이름 변경 오류");
      }
    });
    closeModal();
  };

  return (
    <>
      <ModalTimer
        open={modalOpen}
        close={closeModal}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        value={newName}
      ></ModalTimer>
      <Content>
        <div
          class="name"
          style={{ cursor: "pointer" }}
          onClick={() => changeTimer(timer)}
        >
          {name}
        </div>
        <div class="green">
          <div class="time">{duration}</div>
          <div class="edit" onClick={openModal}></div>
          <div class="delete" onClick={() => onRemove(timer_idx)}></div>
        </div>
      </Content>
    </>
  );
};

export default TimerListContent;
