import React from "react";
import styled from "styled-components";

interface ITodoCard extends React.PropsWithChildren {
  author: string;
  task: string;
  isDone: boolean;
}

const TodoCardUIBlock = styled.div`
  padding: 16px;
`;

const TodoCard = ({ author, task, isDone, children }: ITodoCard) => {
  return (
    <TodoCardUIBlock>
      {author}
      <div>{task}</div>
    </TodoCardUIBlock>
  );
};

export default TodoCard;
