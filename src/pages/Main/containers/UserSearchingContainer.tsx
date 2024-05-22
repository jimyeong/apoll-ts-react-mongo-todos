import React, { ChangeEventHandler, useState } from "react";
import { SeachingBar, SearchingDisplayPanel, ListViewer } from "../../../ui";
import useInputText from "../../../hooks/useInputText";
import { GET_SEARCHING_RESULT } from "../schemes/Users";
import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import type { Friend } from "../../Friends/FriendsPage";
import styled from "styled-components";
import { Select } from "@chakra-ui/react";

export const UserSearchingContainerUIBlock = styled.div`
  position: relative;
  .searching__result {
    position: absolute;
    left: 0;
    right: 0;
    background-color: #f8f9f8;
    -webkit-box-shadow: -1px 1px 16px 1px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: -1px 1px 16px 1px rgba(0, 0, 0, 0.2);
    box-shadow: -1px 1px 16px 1px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 3px 3px;
  }
  .searching__option {
    cursor: pointer;
    padding: 8px 16px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .result__box {
    padding: 8px;
  }
`;

interface IUserSearchingContainer extends React.PropsWithChildren {}
const UserSearchingContainer = ({ children }: IUserSearchingContainer) => {
  const initialState = {
    id_finder_name: "id_finder",
    id_finder: "",
    isSearching: false,
    selectedId: "",
  };

  const [searchingState, setSearchingState] = useState(initialState);
  const isOpen =
    searchingState.id_finder != "" && searchingState.selectedId == "";
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
  const onSelect: React.MouseEventHandler<HTMLParagraphElement> = (e) => {
    const { dataset } = e.currentTarget;
    setSearchingState({
      ...searchingState,
      isSearching: false,
      selectedId: dataset["user"] as string,
    });
  };
  return (
    <UserSearchingContainerUIBlock className="searchingBar">
      <SeachingBar
        placeholder="Look up your id to write a post"
        onChangeHandler={onChange}
        onReset={onReset}
        keyword={searchingState.id_finder}
        id={searchingState.id_finder_name}
      />
      <SearchingDisplayPanel
        list={data ? data.searchUsers : []}
        isLoading={loading}
        isOpen={isOpen}
        keyword={searchingState.id_finder}
        renderer={(item: Friend, i: number) => (
          <Text
            className="searching__option"
            data-user={item.firstName}
            onClick={onSelect}
            key={i}
          >
            {item.firstName}
          </Text>
        )}
      />
    </UserSearchingContainerUIBlock>
  );
};

export default UserSearchingContainer;
