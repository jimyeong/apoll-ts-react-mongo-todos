import React from "react";

interface ICard extends React.PropsWithChildren {
  name: string;
}

const Card = ({ name, children }: ICard) => {
  return (
    <div>
      <div
        className="block p-6 max-w-sm bg-green-600 
            rounded-lg border border-gray-200"
      >
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          The name of your friend is "{name}"
        </h1>
        <p className=" font-normal text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          reiciendis, corporis non pariatur iure modi debitis illum? Quis
          tempore aliquid est cumque cum. Iste quaerat officiis voluptatibus
          tenetur, illum saepe natus necessitatibus.
        </p>
      </div>
    </div>
  );
};

export default Card;
