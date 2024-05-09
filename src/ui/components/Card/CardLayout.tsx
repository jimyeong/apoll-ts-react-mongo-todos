import React from "react";

interface ICardLayout extends React.PropsWithChildren {
  childSize: string;
}
const CardLayout = ({ childSize, children }: ICardLayout) => {
  let classNames = "";
  if (!childSize) classNames = "basis-1/4";
  return (
    <div className="flex flex-row">
      {React.Children.map(children, (child) => (
        <div className={`${classNames}`}>{child}</div>
      ))}
    </div>
  );
};

export default CardLayout;
