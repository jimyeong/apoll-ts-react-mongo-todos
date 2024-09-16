import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
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
  // when it's rendered for the firtime(when initiated),
  // when it's changing, they are different.
  const { values, onChange, onReset } = useInputText({ [note.id]: note.task });
  const onConfirmEditing: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      onClickConfirmEditing(note.index, values[note.id]);

      //** onReset!! becareful when  editing is confirmed*/
      // onReset();
    },
    [values]
  );

  if (note.isEditing) {
    console.log("note.id", values);
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

export default React.memo(StickyNote);
