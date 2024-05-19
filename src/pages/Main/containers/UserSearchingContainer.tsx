import React, { ChangeEventHandler, useState } from "react";
import { SeachingBar } from "../../../ui";
import useInputText from "../../../hooks/useInputText";
import { GET_SEARCHING_RESULT } from "../schemes/Users";
import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { ListViewer } from "../../../ui";
import type { Friend } from "../../Friends/FriendsPage";

interface IUserSearchingContainer extends React.PropsWithChildren {}
const UserSearchingContainer = ({ children }: IUserSearchingContainer) => {
  const initialState = {
    id_finder_name: "id_finder",
    id_finder: "",
    isSearching: false,
  };
  const [searchingState, setSearchingState] = useState(initialState);
  const { loading, error, data } = useQuery(GET_SEARCHING_RESULT, {
    variables: { keyword: searchingState.id_finder },
  });
  const onChange: ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    const isSearching = value == "" ? false : true;
    setSearchingState({
      ...searchingState,
      [name]: value,
      isSearching,
    });
  };
  const onReset = () => {
    setSearchingState(initialState);
  };

  if (error) return <div>{error.message}</div>;
  return (
    <div className="searchingBar">
      <SeachingBar
        placeholder="Look up your id to write a post"
        onChangeHandler={onChange}
        onReset={onReset}
        keyword={searchingState.id_finder}
        id={searchingState.id_finder_name}
      />
      {searchingState.isSearching &&
        (loading ? (
          <Spinner />
        ) : (
          <div className="searching__result">
            <ListViewer
              list={data?.searchUsers as Friend[]}
              renderer={(item, i: number) => <Text>{item.firstName}</Text>}
            />
          </div>
        ))}
    </div>
  );
};

export default UserSearchingContainer;
