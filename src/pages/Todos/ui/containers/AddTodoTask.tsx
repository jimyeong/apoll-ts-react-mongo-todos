import React, { ChangeEventHandler, useState } from "react";
import InputTodo from "../components/InputTodo";

const AddTodoTask = ({ children }: React.PropsWithChildren) => {
  const [inputText, setInputText] = useState("");
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setInputText(value);
  };
  return (
    <React.Fragment>
      <InputTodo text={inputText} onChange={onChange} />
    </React.Fragment>
  );
};

export default AddTodoTask;
