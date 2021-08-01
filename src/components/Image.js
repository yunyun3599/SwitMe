import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: ${(props) => props.width || 220}px;
  height: ${(props) => props.height || 220}px;
  border-radius: ${(props) => props.radius || 10}px;
  margin-right: ${(props) => props.marginRight || 0}px;
  margin-left: ${(props) => props.marginLeft || 0}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  cursor: pointer;
`;

const Image = ({
  alt,
  src,
  width,
  height,
  radius,
  marginRight,
  marginLeft,
  marginTop,
}) => {
  return (
    <StyledImage
      alt={alt}
      src={src}
      width={width}
      height={height}
      radius={radius}
      marginRight={marginRight}
      marginLeft={marginLeft}
      marginTop={marginTop}
    />
  );
};

export default Image;
