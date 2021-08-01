import React, { Component } from "react";
import styled from "styled-components";

const InputBox = styled.input`
  border: 1px solid #56be9c;
  height: 2.5rem;
  border-radius: 6px;
  outline: none;
  padding-left: 1rem;
`;

const Input2 = ({ name, placeholder, width, ...rest }) => {
  return (
    <InputBox
      type="text"
      style={{ width: width }}
      placeholder={placeholder}
      name={name}
      {...rest}
    ></InputBox>
  );
};

export default Input2;
