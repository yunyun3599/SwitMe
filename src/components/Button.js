import React, { Component } from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  color: white;
  font-weight: 700;
  font-size: 1rem;
  height: 2.5rem;
  border-radius: 6px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Button = ({ name, width, height, color, borderRadius, ...rest }) => {
  return (
    <div>
      <ButtonBox
        style={{
          width: width,
          height: height,
          backgroundColor: color,
          borderRadius: borderRadius,
        }}
        {...rest}
      >
        {name}
      </ButtonBox>
    </div>
  );
};

export default Button;
