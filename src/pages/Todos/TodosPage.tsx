import React from "react";
import { ListViewer } from "../../ui";
import { StickyNote, AddAnotherStickyNote } from "./ui";
import AddTodoTask from "./containers/AddTodoTask";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_TODO_LIST } from "./schemes/Todos";
import { Spinner } from "@chakra-ui/react";
import { Todo } from "./schemes/Todos";
import { stickyNotesColours } from "../../config/stickyNotesColours";

const TodoCardUIBlock = styled.div``;

interface ITodos extends React.PropsWithChildren {}
const todos = [
  {
    id: 0,
    writer_id: 1,
    title: "Lorem ipsum dolor sit amet.",
    task: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nostrum!",
    isDone: false,
    colour: "#E3D4FF",
  },
];
const TodosPage = ({ children }: ITodos) => {
  const { loading, error, data } = useQuery(GET_TODO_LIST);
  if (error) return <div>{error.message}</div>;
  if (loading) return <Spinner />;

  return (
    <TodoCardUIBlock>
      <div className="clearfix">
        <ListViewer
          list={data.getTodoList}
          renderer={(item: Todo, i) => {
            const notesNum = stickyNotesColours.length;
            const noteColourIndex = Math.floor(Math.random() * notesNum);
            const note = {
              ...item,
              colour: stickyNotesColours[noteColourIndex],
            };
            return <StickyNote note={note} key={i} />;
          }}
        />
        <AddAnotherStickyNote colour="#f8f9f8" />
      </div>
    </TodoCardUIBlock>
  );
};

export default TodosPage;
