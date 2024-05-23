import { gql } from "@apollo/client";
export const GET_TODO_LIST = gql`
  query {
    getTodoList {
      ownerId
      task
      urgency
      importance
      createdAt
      updatedAt
      taskId
    }
  }
`;

type Todo = {
  ownerId: string;
  task: string;
  urgency: number;
  importance: number;
  createdAt: Date;
  updatedAt: Date;
  taskId: string;
};

export type { Todo };
