import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const socketLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscription",
  })
);

export { socketLink };
