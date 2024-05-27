import React from "react";
import styled from "styled-components";
import StickyNoteUIBlock from "./StickyNotes/StickyNoteUIBlock";

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

const StickyNote = ({ note, children }: IStickyNode) => {
  return (
    <StickyNoteUIBlock bgcolour={note.colour}>
      <div className="inner__padding">{note.task}</div>
    </StickyNoteUIBlock>
  );
};

interface IAddAnotherStickyNote extends React.PropsWithChildren {
  colour: string;
}

const AddAnotherStickyNote = ({ children, colour }: IAddAnotherStickyNote) => {
  return (
    <StickyNoteUIBlock bgcolour={colour}>
      <div className="inner__padding" style={{ border: "3px dashed #333" }}>
        <span className="dib icon__plus">+</span>
        <span className="dib"></span>
      </div>
    </StickyNoteUIBlock>
  );
};

export { StickyNote, AddAnotherStickyNote };
