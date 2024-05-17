import React, { ChangeEventHandler } from "react";
import { TextInput } from "../../";
import type { ITextInput } from "../../";

interface ISearchingBar extends ITextInput {
  keyword: string;
  onChangeHandler: ChangeEventHandler;
  onReset: () => void;
}

const SeachingBar = ({
  id,
  keyword,
  size,
  placeholder,
  onChangeHandler,
  onReset,
  children,
}: ISearchingBar) => {
  return (
    <div>
      <TextInput
        id={id}
        onReset={onReset}
        onChangeHandler={onChangeHandler}
        text={keyword}
        placeholder={placeholder}
      />
    </div>
  );
};

export type { ISearchingBar };
export default SeachingBar;
