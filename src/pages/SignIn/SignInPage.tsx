import React, { useEffect } from "react";
import { ButtonGroup, Button, Stack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { GoogleOAuthProvider } from "@react-oauth/google";

interface SignInPage extends React.PropsWithChildren {}

const SignInPage = ({ children }: SignInPage) => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: (error) => console.log(error),
    state: "pass-through value",
    redirect_uri: "http://localhost:4000/login",

    flow: "auth-code",
  });

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => login();

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <Stack direction="row" spacing={4}>
        <Button
          onClick={onClick}
          cursor="pointer"
          boxShadow={"1px 1px 2px 2px rgba(0,0,0,0.05)"}
          border={0}
          w={98}
          h={48}
          isLoading={false}
          loadingText="Submitting"
          leftIcon={<FcGoogle size={32} />}
          colorScheme="pink"
          variant="solid"
        >
          Sign in
        </Button>
      </Stack>
    </div>
  );
};

export default SignInPage;
