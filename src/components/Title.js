import React from "react";
import styled from "styled-components";

const StyledTitle = styled.p`
  font-family: "NotoSans";
  font-weight: ${(props) => props.weight || 700};
  font-size: ${(props) => props.size || 18}px;
  line-height: ${(props) => props.lineHeight || 26.06}px;
  color: ${(props) => props.color || "black"};
  display: inline-block;
  margin-right: ${(props) => props.marginLeft || 0}px;
  margin-bottom: ${(props) => props.marginBottom || 0}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  width: ${(props) => props.width || "auto"}px;
`;
const TitleDiv = styled.div`
  display: inline-block;
`;

const Title = ({
  children,
  weight,
  size,
  lineHeight,
  color,
  marginLeft,
  marginBottom,
  marginTop,
  width,
  ...rest
}) => {
  return (
    <TitleDiv {...rest}>
      <StyledTitle
        weight={weight}
        size={size}
        lineHeight={lineHeight}
        color={color}
        marginLeft={marginLeft}
        marginBottom={marginBottom}
        marginTop={marginTop}
        width={width}
      >
        {children}
      </StyledTitle>
    </TitleDiv>
  );
};

export default Title;
