import React from "react";
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

interface MainProps {
  id: string;
  name: string;
  description: string;
  photo: string;
}
const Main = ({ children }: React.PropsWithChildren) => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }: MainProps) => {
    return (
      <div key={id}>
        <h3>{name}</h3>
        <img
          width="400"
          height="250"
          alt="location-reference"
          src={`${photo}`}
        />
        <br />
        <b>About this location:</b>
        <p>{description}</p>
        <br />
      </div>
    );
  });
};

export default Main;
