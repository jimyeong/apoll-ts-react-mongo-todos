import React from "react";
import Card from "./Card";

interface ICardRenderer extends React.PropsWithChildren {
  cardType: number;
}
const CardRenderer = ({ cardType, children }: ICardRenderer) => {
  if (cardType == 1) return <div></div>;
  return <div></div>;
};

export default CardRenderer;
