import React, { ChangeEventHandler } from "react";
import { TextInput } from "../../../../ui";

interface IInputTodo extends React.PropsWithChildren {
  text: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputTodo = ({ onChange, text, children }: IInputTodo) => {
  return (
    <React.Fragment>
      <TextInput
        onChange={onChange}
        text={text}
        placeholder="Type a thing to do"
      />
    </React.Fragment>
  );
};
export default InputTodo;
