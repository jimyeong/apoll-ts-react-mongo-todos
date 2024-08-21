import React, { MouseEventHandler, useCallback } from "react";
import styled from "styled-components";
import StickyNoteUIBlock from "./StickyNotes/StickyNoteUIBlock";
import useInputText from "../../../../hooks/useInputText";
import { ButtonGroup, Button, IconButton } from "@chakra-ui/react";

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
      <div className="ft-sp__b inner__padding">{note.task}</div>
    </StickyNoteUIBlock>
  );
};

interface IAddAnotherStickyNote extends React.PropsWithChildren {
  colour: string;
  addMemoHandler: MouseEventHandler<HTMLDivElement>;
  cancelMemoHandler: MouseEventHandler<HTMLButtonElement>;
  isEditing: boolean;
}

const AddAnotherStickyNote = ({
  isEditing,
  addMemoHandler,
  cancelMemoHandler,
  children,
  colour,
}: IAddAnotherStickyNote) => {
  const { onChange, onReset, values } = useInputText({
    name: "new_post",
    new_post: "",
  });
  const onClickDismiss: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onReset();
      cancelMemoHandler(e);
    },
    [isEditing]
  );
  const onClickConfirm = useCallback(
    (e: MouseEventHandler<HTMLButtonElement>) => {
      onReset();
    },
    [isEditing]
  );
  console.log(values);
  if (!isEditing) {
    return (
      <StickyNoteUIBlock onClick={addMemoHandler} bgcolour={colour}>
        <div className="inner__padding" style={{ border: "3px dashed #333" }}>
          <span className="dib icon__plus">+</span>
          <span className="dib"></span>
        </div>
      </StickyNoteUIBlock>
    );
  }
  return (
    <StickyNoteUIBlock onClick={addMemoHandler} bgcolour={colour}>
      <div className="inner__padding" style={{ border: "3px dashed #333" }}>
        <textarea
          onChange={onChange}
          className="text__area ft-sp__b"
          name={values.name}
          value={values.new_post}
          id=""
        ></textarea>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button>Confirm</Button>
          <Button onClick={onClickDismiss}>Cancel</Button>
        </ButtonGroup>
      </div>
    </StickyNoteUIBlock>
  );
};

export { StickyNote, AddAnotherStickyNote };
