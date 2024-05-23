import React, { ReactElement } from "react";
import { Spinner, Button } from "@chakra-ui/react";
import ListViewer from "../ListViewer";

interface ISearchingDisplayPanel<T> {
  isOpen: boolean;
  isLoading: boolean;
  list: T[];
  renderer: (item: T, i: number) => ReactElement;
  keyword: string;
}

const SearchingDisplayPanel = <T,>({
  isOpen,
  isLoading,
  list,
  renderer,
  keyword,
}: ISearchingDisplayPanel<T>) => {
  if (!isOpen) return null;
  console.log("@@list", list);

  return (
    <div className="searching__result">
      {isLoading && <Spinner />}
      {list.length == 0 && (
        <div className="result__box">
          There is no user maching up with you, [Mr/Mrs.{keyword}] Would you
          sign up?
          <Button bg="#08c">Sign up</Button>
        </div>
      )}
      {list.length > 0 && (
        <div className="result__box">
          <ListViewer list={list} renderer={renderer} />
        </div>
      )}
    </div>
  );
};

export default SearchingDisplayPanel;
