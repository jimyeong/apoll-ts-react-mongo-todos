import React, { useState } from "react";
import { SeachingBar } from "../../ui/";
import useInputText from "../../hooks/useInputText";
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import styled from "styled-components";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { createIcon } from "@chakra-ui/icons";

const MainUIBlock = styled.div``;

// using `path`
export const PhoneIcon = createIcon({
  displayName: "PhoneIcon",
  viewBox: "0 0 200 200",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
  ),
});

const MainPage = ({ children }: React.PropsWithChildren) => {
  const {
    onChange,
    onReset,
    values: pageState,
  } = useInputText({
    id_finder_name: "id_finder",
    id_finder: "",
  });

  return (
    <MainUIBlock>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <PhoneIcon color="gray.300" />
        </InputLeftElement>

        <SeachingBar
          placeholder="Look up your id to write a post"
          onChangeHandler={onChange}
          onReset={onReset}
          keyword={pageState.id_finder}
          id={pageState.id_finder_name}
        />
        {/* <Input type='tel' placeholder='Phone number' /> */}
      </InputGroup>
    </MainUIBlock>
  );
};

export default MainPage;
