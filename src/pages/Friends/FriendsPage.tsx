import React, { ReactNode } from "react";
import { ListViewer } from "../../ui";
import { gql, useQuery } from "@apollo/client";
import { CardRenderer, Card } from "../../ui";

export interface Friend {
  firstName: string;
  lastName: string;
  tel: string;
  avatar: string;
  nationality: string;
  gender: string;
  email: string;
}

const Friend = [
  { firstName: "JIMYEONG", lastName: "JUNG", contact: "0481283828" },
];

const GET_FRIENDS = gql`
  query getUser {
    getUser {
      firstName
      lastName
      tel
      avatar
      nationality
      gender
      email
      todos {
        id
        ownerId
        task
        urgency
        importance
        createAt
        updatedAt
      }
    }
  }
`;
const FriendsPage = ({ children }: React.PropsWithChildren) => {
  const { loading, error, data } = useQuery(GET_FRIENDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const { getUser } = data;
  const users: Friend[] = getUser;

  return (
    <div>
      <ListViewer
        list={users}
        renderer={(item: Friend, i: number): ReactNode => (
          <React.Fragment key={i}>
            <Card name={`${item.firstName} ${item.lastName}`} />
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default FriendsPage;
