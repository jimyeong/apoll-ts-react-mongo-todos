import React, {
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import { StickyNote, AddAnotherStickyNote } from "./ui";
import styled from "styled-components";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_TODO_LIST } from "./schemes/Todos";
import {
  SUBSCRIBE_UPDATE_TASK,
  SUBSCRIBE_CREATE_TASK,
  SUBSCRIBE_REMOVE_TASK,
} from "./apis";
import { Spinner } from "@chakra-ui/react";
import { Todo } from "./schemes/Todos";
import { stickyNotesColours } from "../../config/stickyNotesColours";
import { getEmail, isLogin } from "../../storage/localStorage";
import { constants } from "../../constants";
import { CREATE_POST, REMOVE_POST, UPDATE_POST } from "./apis";
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
  const [createPost, {}] = useMutation(CREATE_POST);
  const [updatePost, {}] = useMutation(UPDATE_POST);
  const [removePost, {}] = useMutation(REMOVE_POST);
  const { data: subscription } = useSubscription(SUBSCRIBE_UPDATE_TASK);
  console.log("@@@taskupdated", subscription);

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
  const onRemoveMemo = useCallback(
    (index: number) => {
      removePost({
        variables: {
          id: todoList[index].id,
        },
      });
    },
    [todoList]
  );
  const onConfirmMemo = useCallback(
    (message: string) => {
      // useMuation can't be used within useCallback
      createPost({
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
  const onClickConfirmEditing = useCallback(
    (index: number, message: string) => {
      const newList = todoList;
      updatePost({
        variables: {
          id: newList[index].id,
          task: message,
          ownerId: newList[index].ownerId,
          urgency: 1,
          importance: 1,
        },
      });
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
              onClickConfirmEditing={onClickConfirmEditing}
              onClickCancelEditing={onClickCancelEditing}
              onClickEditMemo={onClickEditMemo}
              onRemoveMemo={onRemoveMemo}
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
