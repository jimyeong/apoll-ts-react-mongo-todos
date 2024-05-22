import { gql } from "@apollo/client";

export const GET_SEARCHING_RESULT = gql`
  query searchUsers($keyword: String) {
    searchUsers(keyword: $keyword) {
      firstName
      lastName
      tel
      avatar
      nationality
      gender
      email
    }
  }
`;
