import React, { ChangeEventHandler } from "react";
import { Input } from "@chakra-ui/react";

interface ITextInput extends React.PropsWithChildren {
  placeholder: string;
  size?: string;
  text?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextInput = ({
  text,
  size,
  placeholder,
  onChange,
  children,
}: ITextInput) => {
  return (
    <Input
      onChange={onChange}
      placeholder={placeholder}
      size={size || "md"}
      value={text}
    />
  );
};

export default TextInput;
