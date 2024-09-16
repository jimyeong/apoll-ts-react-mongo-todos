import React, {
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import { StickyNote } from "./ui";

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
import { NewNote } from "./ui";

const TodoCardUIBlock = styled.div``;
type EditableNote = Todo & { isEditing: boolean; index: number };
type updated = {
  task: String;
  createdAt: Date;
};

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
  const taskRemoved = useSubscription(SUBSCRIBE_REMOVE_TASK, {
    onData: ({ data: removed }) => {
      const { data } = removed;
      const newList = todoList.filter(
        (item) => item.id !== data.taskRemoved.id
      );
      setTodoList(newList);
    },
  });
  const updateTask = useSubscription(SUBSCRIBE_UPDATE_TASK, {
    onData: ({ data: updated }) => {
      const newList = todoList.map((item, idx) => {
        if (item.isEditing) {
          const { data } = updated;
          item.task = data.taskUpdated.task;
          item.isEditing = false;
        }
        return item;
      });
      setTodoList([...newList]);
    },
  });

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
    [newPost, todoList]
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
        {todoList.map((item: EditableNote, i: number) => (
          <StickyNote
            onClickConfirmEditing={onClickConfirmEditing}
            onClickCancelEditing={onClickCancelEditing}
            onClickEditMemo={onClickEditMemo}
            onRemoveMemo={onRemoveMemo}
            note={item}
            key={i}
          />
        ))}

        {isLogin() == "1" && (
          <NewNote
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
