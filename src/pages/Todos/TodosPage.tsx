import React, {
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ListViewer } from "../../ui";
import { StickyNote, AddAnotherStickyNote } from "./ui";
import AddTodoTask from "./containers/AddTodoTask";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODO_LIST } from "./schemes/Todos";
import { Spinner } from "@chakra-ui/react";
import { Todo } from "./schemes/Todos";
import { stickyNotesColours } from "../../config/stickyNotesColours";
import { getEmail, isLogin } from "../../storage/localStorage";
import { constants } from "../../constants";
import { CREATE_POST } from "./apis";
import { Button, ButtonGroup } from "@chakra-ui/react";

const TodoCardUIBlock = styled.div``;
type EditableNote = Todo & { isEditing: boolean; index: number };

interface ITodos extends React.PropsWithChildren {}
const TodosPage = ({ children }: ITodos) => {
  const [newPost, setNewPost] = useState({
    isEditing: false,
    id: "new_post",
    text: "",
  });
  const [todoList, setTodoList] = useState<EditableNote[]>([]);
  const { loading, error, data } = useQuery(GET_TODO_LIST, {
    errorPolicy: "all",

    onCompleted: (data) => {
      const { getTodoList: list } = data;
      setTodoList(
        list.map((item: Todo, index: number) => {
          return {
            index,
            ...item,
            isEditing: false,
          };
        })
      );
    },
    onError: (error) => {
      if (error.message.includes(constants.Unauthorized)) {
      }
    },
  });
  const [updatePost, {}] = useMutation(CREATE_POST);
  const onClickEditMemo = useCallback(
    (idx: number) => {
      const newList = todoList;
      newList[idx].isEditing = true;
      setTodoList([...newList]);
    },
    [todoList]
  );
  const onClickAddMemo: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      setNewPost({
        ...newPost,
        isEditing: true,
      });
    },
    [newPost]
  );
  const onClickCancelMemo: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      setNewPost({
        ...newPost,
        isEditing: false,
      });
    },
    [newPost]
  );
  const onConfirmMemo = useCallback(
    (message: string) => {
      // useMuation can't be used within useCallback

      updatePost({
        variables: {
          task: message,
          ownerId: getEmail(),
          urgency: 1,
          importance: 1,
        },
      });

      setNewPost({
        ...newPost,
        isEditing: false,
      });
    },
    [newPost]
  );
  const onClickCancelEditing = useCallback(
    (idx: number) => {
      const newList = todoList;
      newList[idx].isEditing = !todoList[idx].isEditing;
      setTodoList([...newList]);
    },
    [todoList]
  );

  if (error) return <div>{error.message}</div>;
  if (loading) return <Spinner />;
  return (
    <TodoCardUIBlock>
      <div className="clearfix">
        {todoList.map((item: EditableNote, i: number) => {
          return (
            <StickyNote
              onClickCancelEditing={onClickCancelEditing}
              onClickEditMemo={onClickEditMemo}
              note={item}
              key={i}
            />
          );
        })}

        {isLogin() == "1" && (
          <AddAnotherStickyNote
            confirmHandler={onConfirmMemo}
            addMemoHandler={onClickAddMemo}
            cancelMemoHandler={onClickCancelMemo}
            colour="#f8f9f8"
            isEditing={newPost.isEditing}
          />
        )}
      </div>
    </TodoCardUIBlock>
  );
};

export default TodosPage;
