import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, Stack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import OAuth2Login from "react-simple-oauth2-login";
import { useMutation } from "@apollo/client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { gql } from "@apollo/client";

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
  const [signUpGoogle, { data, loading, error }] = useMutation(SIGN_UP_GOOGLE);
  const [accessToken, setAccessToken] = useState<null | string>(null);

  const onSuccess = (response: any) => console.log(response);
  const onFailure = (response: any) => console.error(response);
  function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    let params = {
      client_id: API,
      redirect_uri: "http://localhost:3000/logined",
      response_type: "token",
      scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
      include_granted_scopes: "true",
      state: "pass-through value",
    };

    type type_params = typeof params;

    // Add form parameters as hidden input values.
    for (let p in params) {
      const val: string = params[p as keyof type_params];
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", val);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

  useEffect(() => {
    if (accessToken) {
      // signUpGoogle({ variables: { accessToken } });
      if (data && !error) {
        //navigate user to profile
      }
    }
  }, [accessToken]);

  // const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => login();

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <Stack direction="row" spacing={4}>
        <Button
          onClick={oauthSignIn}
          cursor="pointer"
          boxShadow={"1px 1px 2px 2px rgba(0,0,0,0.05)"}
          border={0}
          isLoading={false}
          loadingText="Submitting"
          leftIcon={<FcGoogle size={32} />}
          variant="solid"
        >
          Sign in
        </Button>
      </Stack>
    </div>
  );
};

export default SignInPage;
