import React, { MouseEventHandler, useCallback } from "react";
import styled from "styled-components";
import StickyNoteUIBlock from "./StickyNotes/StickyNoteUIBlock";
import useInputText from "../../../../hooks/useInputText";
import { ButtonGroup, Button, IconButton } from "@chakra-ui/react";
import PrivateDisplay from "../../../../ui/components/PrivateDisplay/PrivateDisplay";
import { getEmail } from "../../../../storage/localStorage";
import { PaddingContainer, Pharagraph } from "../../../../ui";

type Note = {
  index: number;
  id: string;
  ownerId: string;
  task: string;
  colour: string;
  updatedAt: Date;
  createdAt: Date;
  isEditing: boolean;
};

interface IStickyNode extends React.PropsWithChildren {
  note: Note;
  onClickEditMemo: (idx: number) => void;
  onClickCancelEditing: (idx: number) => void;
  onClickConfirmEditing: (idx: number, value: string) => void;
  onRemoveMemo: (idx: number) => void;
}

const StickyNote = ({
  onClickCancelEditing,
  onClickConfirmEditing,
  onClickEditMemo,
  onRemoveMemo,
  note,
  children,
}: IStickyNode) => {
  const { values, onChange, onReset } = useInputText({ [note.id]: note.task });
  const onConfirmEditing: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      onClickConfirmEditing(note.index, values[note.id]);
      onReset();
    },
    [values]
  );
  if (note.isEditing) {
    return (
      <StickyNoteUIBlock bgcolour={note.colour}>
        <div className="inner__padding">
          <textarea
            className="text__area ft-sp__b"
            name={note.id}
            onChange={onChange}
            value={values[note.id]}
            id=""
          ></textarea>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button onClick={onConfirmEditing}>Confirm</Button>
            <Button
              onClick={() => {
                onClickCancelEditing(note.index);
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </div>
      </StickyNoteUIBlock>
    );
  }
  return (
    <StickyNoteUIBlock bgcolour={note.colour}>
      <div className="inner__padding">
        <p className="ft-sp__b">{note.task}</p>
        <PrivateDisplay>
          {getEmail() == note.ownerId && (
            <div className="button__group">
              <Button
                onClick={() => {
                  onRemoveMemo(note.index);
                }}
                className="btn__delete"
              >
                delete
              </Button>
              <Button
                onClick={() => {
                  onClickEditMemo(note.index);
                }}
                className="btn__edit"
              >
                edit
              </Button>
            </div>
          )}
        </PrivateDisplay>
      </div>
    </StickyNoteUIBlock>
  );
};

interface IAddAnotherStickyNote extends React.PropsWithChildren {
  colour: string;
  addMemoHandler: MouseEventHandler<HTMLDivElement>;
  cancelMemoHandler: MouseEventHandler<HTMLButtonElement>;
  confirmHandler: (message: string) => void;
  isEditing: boolean;
}

const AddAnotherStickyNote = ({
  isEditing,
  addMemoHandler,
  cancelMemoHandler,
  confirmHandler,
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
  const onClickConfirm: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      confirmHandler(values.new_post);
      onReset();
    },
    [isEditing, values.new_post]
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
          <Button onClick={onClickConfirm}>Confirm</Button>
          <Button onClick={onClickDismiss}>Cancel</Button>
        </ButtonGroup>
      </div>
    </StickyNoteUIBlock>
  );
};

export { StickyNote, AddAnotherStickyNote };
