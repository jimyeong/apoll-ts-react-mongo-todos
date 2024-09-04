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

/// localstorage event listener
if will be fired in other windows, or tabs not its own window which you were watching

** Be cautious about this message **
React hooks can be called only in react function or custom hook function.
So that was why you can use async hooks in the function not in the useEffect

Message: ** React Hook "useState" is called in function "handleCredentialResponse" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use" react-hooks/rules-of-hooks **

21.07.24
UseGoogleSignup hook has to work. get a token or fail flag

// error handling
server side's messages don't show up.

regarding refresh token handling,
refer to Retrying operations in the error handling section.
https://www.apollographql.com/docs/react/data/error-handling

// private router
https://stackoverflow.com/questions/54329486/how-to-correctly-redirect-after-catching-authentication-failure-with-apollo-and

```

for the cookies to be sent to the server
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});
```

```

  <ListViewer
          list={data.getTodoList}
          renderer={(item: Todo, i) => {
            const note = { ...item };
            return (
              <StickyNote
                onClickEditMemo={onClickEditMemo}
                note={note}
                key={i}
              />
            );
          }}
        />

```
