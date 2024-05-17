import React, { ChangeEventHandler } from "react";
import { TextInput } from "../../../../ui";

interface IInputTodo extends React.PropsWithChildren {
  inputId: string;
  text: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputTodo = ({ inputId, onChange, text, children }: IInputTodo) => {
  return (
    <React.Fragment>
      <TextInput
        id={inputId}
        onChangeHandler={onChange}
        text={text}
        placeholder="Type a thing to do"
      />
    </React.Fragment>
  );
};
export default InputTodo;
