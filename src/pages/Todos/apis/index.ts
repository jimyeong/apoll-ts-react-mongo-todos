import React from "react";
import { gql, useMutation } from "@apollo/client";

const REMOVE_POST = gql`
  mutation ($id: String!) {
    removeTask(id: $id) {
      id
    }
  }
`;

const UPDATE_POST = gql`
  mutation (
    $id: String!
    $task: String!
    $urgency: Int
    $importance: Int
    $ownerId: String
  ) {
    updateTask(
      input: {
        id: $id
        task: $task
        urgency: $urgency
        importance: $importance
        ownerId: $ownerId
      }
    ) {
      id
      ownerId
      task
      urgency
      importance
    }
  }
`;

const CREATE_POST = gql`
  # Increments a back-end counter and gets its resulting value
  mutation ($task: String!, $urgency: Int, $importance: Int, $ownerId: String) {
    createTask(
      input: {
        task: $task
        urgency: $urgency
        importance: $importance
        ownerId: $ownerId
      }
    ) {
      id
      ownerId
      task
      urgency
      importance
    }
  }
`;

const createNewPost = () => {};
const SUBSCRIBE_UPDATE_TASK = gql`
  subscription {
    taskUpdated {
      id
      ownerId
      task
      urgency
      importance
      colour
      createdAt
      updatedAt
    }
  }
`;

const SUBSCRIBE_REMOVE_TASK = gql`
  subscription {
    taskRemoved {
      id
      ownerId
      task
      urgency
      importance
      colour
      createdAt
      updatedAt
    }
  }
`;
const SUBSCRIBE_CREATE_TASK = gql`
  subscription {
    taskCreated {
      id
      ownerId
      task
      urgency
      importance
      colour
      createdAt
      updatedAt
    }
  }
`;

export {
  CREATE_POST,
  UPDATE_POST,
  REMOVE_POST,
  SUBSCRIBE_CREATE_TASK,
  SUBSCRIBE_UPDATE_TASK,
  SUBSCRIBE_REMOVE_TASK,
};
