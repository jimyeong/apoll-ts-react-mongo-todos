import React, { ChangeEventHandler, useState } from "react";
import { SeachingBar } from "../../../ui";
import useInputText from "../../../hooks/useInputText";

interface IUserSearchingContainer extends React.PropsWithChildren {}
const UserSearchingContainer = ({ children }: IUserSearchingContainer) => {
  const initialState = {
    id_finder_name: "id_finder",
    id_finder: "",
  };
  const [searchingState, setSearchingState] = useState(initialState);
  const onChange: ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    setSearchingState({
      ...searchingState,
      [name]: value,
    });
  };
  const onReset = () => {
    setSearchingState(initialState);
  };
  return (
    <React.Fragment>
      <SeachingBar
        placeholder="Look up your id to write a post"
        onChangeHandler={onChange}
        onReset={onReset}
        keyword={searchingState.id_finder}
        id={searchingState.id_finder_name}
      />
    </React.Fragment>
  );
};

export default UserSearchingContainer;
