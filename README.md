## TODO

tailwind css apply

Conditioan in GCL
import { gql } from "@apollo/client";

https://hasura.io/docs/latest/api-reference/graphql-api/query/#whereexp
export const GET_SEARCHING_RESULT = gql`  query searchUsers($keyword: String) {
    searchUsers(keyword: $keyword, where: { firstName: { _not: "" } }) {
      firstName
      lastName
      tel
      avatar
      nationality
      gender
      email
    }
  }`;

QUESTION!

## When you are searching by a keyword what if it's a just empty string, and you don't want to make an API request what would be good?

not making request from the client or just deal with the case from the server
