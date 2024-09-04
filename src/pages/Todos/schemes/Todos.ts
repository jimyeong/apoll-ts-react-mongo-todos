import { gql } from "@apollo/client";
export const GET_TODO_LIST = gql`
  query {
    getTodoList {
      id
      ownerId
      task
      urgency
      importance
      createdAt
      updatedAt
      taskId
      colour
    }
  }
`;

type Todo = {
  id: string;
  ownerId: string;
  task: string;
  urgency: number;
  importance: number;
  createdAt: Date;
  updatedAt: Date;
  taskId: string;
  colour: string;
};

export type { Todo };
