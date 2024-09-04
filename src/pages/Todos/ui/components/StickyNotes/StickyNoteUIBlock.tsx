import React from "react";
import styled from "styled-components";
import { darken } from "polished";

interface IstyledProps {
  bgcolour: string;
}

export type { IstyledProps };

const StickyNoteUIBlock = styled.div<IstyledProps>`
  width: 25%;
  float: left;
  padding: 8px;
  text-align: center;
  button + button {
    margin-left: 12px;
  }
  .inner__padding {
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    padding: 16px;
    height: 160px;
    background-color: ${(props) => props.bgcolour};
    &:hover {
      background-color: ${(props) => darken(0.15, props.bgcolour)};
    }
  }
  .button__group {
    position: absolute;
    right: 10px;
    bottom: 10px;
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
