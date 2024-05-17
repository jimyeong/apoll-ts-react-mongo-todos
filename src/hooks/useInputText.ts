import React, { ChangeEventHandler, useState } from "react";

/**
 * TODO
 */
interface IUseInputText<T> {}

const useInputText = (initialState: any) => {
  const [values, setValues] = useState(initialState);
  const onReset = () => setValues(initialState);

  const onChange: ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return { onChange, onReset, values };
};

export default useInputText;
