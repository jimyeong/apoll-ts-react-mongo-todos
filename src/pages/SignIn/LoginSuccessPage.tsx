import React, { useEffect } from "react";
import { setToken } from "../../storage/localStorage";
import CommonHelper from "../../helper/CommonHelpers";
import {
  useNavigate,
  useLocation,
  useMatches,
  useSearchParams,
} from "react-router-dom";

type OauthAuthentication = {
  access_token: string;
  expires_in: string;
  scope: string;
  state: string;
  token_type: string;
};

const LoginSuccessPage = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();
  const [searchParam, setSearchParam] = useSearchParams();

  console.log("@@matsearmatcheschParamches", location.hash.substring(1));

  // console.log("@@navigate", navigate);

  const getAccessToken = (url: string): OauthAuthentication => {
    const arr = url.split("&");
    return Object.fromEntries(arr.map((item: string) => item.split("=")));
  };

  useEffect(() => {
    const authentication = getAccessToken(location.hash.substring(1));
    setToken(authentication.access_token);
    navigate("/");
    return () => {};
  }, []);

  // getQueryString here

  return <div>token achived</div>;
};

export default LoginSuccessPage;
