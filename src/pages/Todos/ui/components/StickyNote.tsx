import React from "react";

type Note = {
  id: number;
  writer_id: number;
  title: string;
  task: string;
  colour: string;
  isDone: boolean;
};
interface IStickyNode extends React.PropsWithChildren {
  note: Note;
}

const StickyNote = ({ note, children }: IStickyNode) => {
  return <div className="">{note.title}</div>;
};

export default StickyNote;
