import React, { MouseEventHandler, useCallback } from "react";
import useInputText from "../../../../../hooks/useInputText";
import { ButtonGroup, Button } from "@chakra-ui/react";

import StickyNoteUIBlock from "./StickyNoteUIBlock";
interface INewNote extends React.PropsWithChildren {
  colour: string;
  addMemoHandler: MouseEventHandler<HTMLDivElement>;
  cancelMemoHandler: MouseEventHandler<HTMLButtonElement>;
  confirmHandler: (message: string) => void;
  isEditing: boolean;
}

const NewNote = ({
  isEditing,
  addMemoHandler,
  cancelMemoHandler,
  confirmHandler,
  colour,
  children,
}: INewNote) => {
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

export default React.memo(NewNote);
