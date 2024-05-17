import React from "react";
import { Box } from "@chakra-ui/react";

const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <header>
      <Box pos="fixed" top={0} left={0} w="100%" h="45px" bg="tomato" />
    </header>
  );
};

export default Header;
