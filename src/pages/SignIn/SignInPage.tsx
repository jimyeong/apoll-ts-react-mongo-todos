import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, Stack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import OAuth2Login from "react-simple-oauth2-login";
import { useMutation, gql, useQuery } from "@apollo/client";
import { USER_AUTHENTICATE } from "./schemes/Authentication";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleSignIn } from "../../hooks/useGoogleSign";
import {} from "@apollo/client";

interface SignInPage extends React.PropsWithChildren {}
const API = `${process.env.REACT_APP_CLIENT_ID}`;
export const SIGN_UP_GOOGLE = gql`
  mutation ($accessToken: String!) {
    signUpGoogle(accessToken: $accessToken) {
      accessToken
      refreshToken
    }
  }
`;

const SignInPage = ({ children }: SignInPage) => {
  const { accessToken, error: tokenError } = useGoogleSignIn();
  const [user, setUser] = useState();
  // const [accessToken, setAccessToken] = useState<null | string>(null);
  const fetchUser = async (accessToken: string) => {
    try {
      const response = await fetch(`http://localhost:4000/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("@@@data", data);
      if (data.code == "200") {
        localStorage.setItem("login", "1");
        localStorage.setItem("userPicture", data.payload.picture);
        localStorage.setItem("familyName", data.payload.family_name);
        localStorage.setItem("givenName", data.payload.given_name);
        localStorage.setItem("email", data.payload.email);
        localStorage.setItem(
          "name",
          data.payload.family_name + data.payload.given_name
        );
      }

      return data;
    } catch (error) {
      console.log("@@error");
    }
  };

  // const { loading, error, data } = useQuery(USER_AUTHENTICATE, {
  //   variables: { accessToken: accessToken },
  // });

  useEffect(() => {
    if (accessToken) {
      fetchUser(accessToken);
    }

    return () => {};
  }, [accessToken]);

  // const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => login();

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <Stack direction="row" spacing={4}>
        <div id="buttonDiv"></div>
      </Stack>
    </div>
  );
};

export default SignInPage;
