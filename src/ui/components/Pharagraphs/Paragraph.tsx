import React from "react";
import styled from "styled-components";

const TextUIBlock = styled.p``;
const Pharagraph = ({ children }: React.PropsWithChildren) => {
  return <TextUIBlock className="ft-sp__b">{children}</TextUIBlock>;
};

export default Pharagraph;
