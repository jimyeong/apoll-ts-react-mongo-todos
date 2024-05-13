import React from "react";
import { ListViewer } from "../../ui";
import { StickyNote } from "./ui";

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
  return (
    <div>
      <ListViewer
        list={todos}
        renderer={(item, i) => <StickyNote note={item} key={i} />}
      />
    </div>
  );
};

export default TodosPage;
