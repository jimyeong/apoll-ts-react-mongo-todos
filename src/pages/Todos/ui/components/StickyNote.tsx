import React from "react";
import styled from "styled-components";

interface IstyledProps {
  bgColour?: string;
}

type Note = {
  ownerId: string;
  task: string;
  colour: string;
  updatedAt: Date;
  createdAt: Date;
};

interface IStickyNode extends React.PropsWithChildren {
  note: Note;
}

const StickyNoteUIBlock = styled.div<IstyledProps>`
  width: 20%;
  float: left;
  padding: 16px;
  .inner__padding {
    padding: 16px;
    height: 160px;
    background-color: ${(props) => props.bgColour};
  }
`;

const StickyNote = ({ note, children }: IStickyNode) => {
  return (
    <StickyNoteUIBlock bgColour={note.colour}>
      <div className="inner__padding">{note.task}</div>
    </StickyNoteUIBlock>
  );
};

export default StickyNote;
