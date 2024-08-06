import React, { useEffect } from "react";
import CommonHelper from "../../helper/CommonHelpers";
import {
  useNavigate,
  useLocation,
  useMatches,
  useSearchParams,
} from "react-router-dom";
import { useAppContext } from "../App/context/appContext";
import { Types } from "../App/reducers/MainReducer";

type OauthAuthentication = {
  access_token: string;
  expires_in: string;
  scope: string;
  state: string;
  token_type: string;
};

const LoginSuccessPage = ({ children }: React.PropsWithChildren) => {
  const { navigate, appContextState, updateContextState } = useAppContext();

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
    updateContextState({
      type: Types.SET_TOKEN,
      payload: authentication.access_token,
    });

    return () => {};
  }, []);

  // getQueryString here
  console.log("@@appContextState", appContextState);
  if (appContextState.token) {
    console.log("@@appContextState@@@@", appContextState);
  }

  return <div>token achived</div>;
};

export default LoginSuccessPage;
