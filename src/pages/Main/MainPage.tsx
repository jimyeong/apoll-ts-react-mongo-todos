import React, { useState } from "react";
import { SeachingBar } from "../../ui/";
import useInputText from "../../hooks/useInputText";
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import styled from "styled-components";
import UserSearchingContainer from "./containers/UserSearchingContainer";

import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
// import { SearchIcon } from "../../assets/icons";
import { SearchIcon } from "@chakra-ui/icons";

const MainUIBlock = styled.div`
  & input {
    padding-left: 32px;
  }
`;

const MainPage = ({ children }: React.PropsWithChildren) => {
  return (
    <MainUIBlock>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" boxSize={4} />
        </InputLeftElement>
        <UserSearchingContainer />
      </InputGroup>
    </MainUIBlock>
  );
};

export default MainPage;
