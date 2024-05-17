import React, { ChangeEventHandler } from "react";
import { Input } from "@chakra-ui/react";

interface ITextInput extends React.PropsWithChildren {
  id: string;
  placeholder: string;
  size?: string;
  text?: string;
  onChangeHandler?: ChangeEventHandler;
  onReset?: () => void;
}

const TextInput = ({
  id,
  text,
  size,
  placeholder,
  onChangeHandler,
  onReset,
  children,
}: ITextInput) => {
  return (
    <Input
      name={id}
      onChange={onChangeHandler}
      onReset={onReset}
      placeholder={placeholder}
      size={size || "md"}
      value={text}
    />
  );
};
export default TextInput;
export type { ITextInput };
