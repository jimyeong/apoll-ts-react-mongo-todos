import React from "react";

interface IListViewer<T> extends React.PropsWithChildren {
  list: T[];
  renderer: (item: T, int: number) => React.ReactNode;
}
const ListViewer = <T,>({ list, renderer }: IListViewer<T>) => {
  return <React.Fragment>{list.map(renderer)}</React.Fragment>;
};

export default ListViewer;
