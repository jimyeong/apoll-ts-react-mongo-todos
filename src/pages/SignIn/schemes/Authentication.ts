import { gql } from "@apollo/client";

export const USER_AUTHENTICATE = gql`
  query googleOAuth($accessToken: String) {
    googleOAuth(accessToken: $token) {
      email
      email_verified: true
      nbf
      name
      picture
      given_name
      family_name
    }
  }
`;
