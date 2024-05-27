import React from "react";
import styled from "styled-components";
import { darken } from "polished";

interface IstyledProps {
  bgcolour: string;
}

export type { IstyledProps };

const StickyNoteUIBlock = styled.div<IstyledProps>`
  width: 20%;
  float: left;
  padding: 8px;
  text-align: center;
  .inner__padding {
    cursor: pointer;
    padding: 16px;
    height: 160px;
    background-color: ${(props) => props.bgcolour};
    &:hover {
      background-color: ${(props) => darken(0.15, props.bgcolour)};
    }
  }
  .icon__plus {
    font-size: 30px;
    font-weight: bold;

    & + span {
      height: 100%;
      vertical-align: middle;
    }
  }
`;

export default StickyNoteUIBlock;
