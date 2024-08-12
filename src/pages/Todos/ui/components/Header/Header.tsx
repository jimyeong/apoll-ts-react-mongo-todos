import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import styled from "styled-components";
import { getPicture, isLogin } from "../../../../../storage/localStorage";
import WrapperContainer from "../../../../../ui/components/Layouts/Containers/WrapperContainer";
import { IoIosLogOut } from "react-icons/io";

const HeaderBlock = styled.header`
  .profile__box {
  }
  .container {
    margin-top: 8px;
  }
  .profile__img {
    border-radius: 50%;
    width: 42px;
  }
`;

const Header = ({ children }: React.PropsWithChildren) => {
  const isLogined = isLogin();
  console.log("getPicture", getPicture());

  return (
    <HeaderBlock>
      <Box pos="fixed" top={0} left={0} w="100%" h="62px" bg="tomato">
        {isLogined == "1" && (
          <WrapperContainer className="container">
            <div className="profile__box">
              <img className="profile__img" src={getPicture() || ""} alt="" />
            </div>
            <button>
              {" "}
              <IoIosLogOut /> LogOut
            </button>
          </WrapperContainer>
        )}
      </Box>
    </HeaderBlock>
  );
};

export default Header;
