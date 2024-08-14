import { onError } from "@apollo/client/link/error";
import { constants } from "../../constants";
import { useNavigate } from "react-router-dom";
import { logout } from "../../storage/localStorage";

// how to useNavigation in apollo client
export const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation, forward }) => {
    console.log("operation", operation);
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        if (extensions.statusCode == 401) {
          message = constants.Unauthorized;
          logout();

          // setLogout();
          // retry with a refresh token
        }
        console.log(graphQLErrors);

        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    if (networkError) console.error(`[Network error]: ${networkError}`);
  }
);
