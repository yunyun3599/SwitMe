import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  font-family: "NotoSans";
  width: ${(props) => props.width || 480}px;
  height: ${(props) => props.height || 65}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.borderColor || "#56be9c"};
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled.input`
  width: ${(props) => props.inputwidth || 480}px;
  border: none;
  background-color: none;
  font-size: 20px;
  &::placeholder {
    font-family: "NotoSans";
    color: #cccccc;
    font-size: 20px;
  }
  :focus {
    outline: none;
  }
`;

const Input = ({
  children,
  width,
  inputwidth,
  height,
  borderRadius,
  border,
  placeholder,
  marginTop,
  validinput,
  borderColor,
  ...rest
}) => {
  return (
    <StyledDiv
      width={width}
      height={height}
      borderRadius={borderRadius}
      border={border}
      marginTop={marginTop}
      borderColor={borderColor}
      {...rest}
    >
      {validinput === "true" ? (
        <StyledInput
          placeholder={placeholder}
          inputwidth={inputwidth}
          {...rest}
        />
      ) : (
        <div></div>
      )}
      {children}
    </StyledDiv>
  );
};

export default Input;
