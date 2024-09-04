import React from "react";
import styled from "styled-components";

const PaddingContainer = styled.div<{
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
}>`
  padding-left: ${(props) => (props.pl ? props.pl + "px" : "0px")};
  padding-right: ${(props) => (props.pr ? props.pr + "px" : "0px")};
  padding-top: ${(props) => (props.pt ? props.pt + "px" : "0px")};
  padding-bottom: ${(props) => (props.pb ? props.pb + "px" : "0px")};
`;

export default PaddingContainer;
