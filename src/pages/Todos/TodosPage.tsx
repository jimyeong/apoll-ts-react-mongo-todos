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

const TodoCardUIBlock = styled.div``;

interface ITodos extends React.PropsWithChildren {}
const TodosPage = ({ children }: ITodos) => {
  const { loading, error, data } = useQuery(GET_TODO_LIST, {
    errorPolicy: "all",
    onError: (error) => {
      if (error.message.includes(constants.Unauthorized)) {
      }
    },
  });

  const [newPost, setNewPost] = useState({
    isEditing: false,
    id: "new_post",
    text: "",
  });

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
  const onConfirmMemo: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      // useMuation can't be used within useCallback
      e.stopPropagation();
      const [mutationFunction, { loading, error, data }] = useMutation(
        CREATE_POST,
        {
          variables: {
            task: newPost.text,
            ownerId: getEmail(),
            urgency: 1,
            importance: 1,
          },
        }
      );

      setNewPost({
        ...newPost,
        isEditing: false,
      });
    },
    [newPost]
  );

  if (error) return <div>{error.message}</div>;
  if (loading) return <Spinner />;

  return (
    <TodoCardUIBlock>
      <div className="clearfix">
        <ListViewer
          list={data.getTodoList}
          renderer={(item: Todo, i) => {
            const note = { ...item };
            return <StickyNote note={note} key={i} />;
          }}
        />
        {isLogin() == "1" && (
          <AddAnotherStickyNote
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
