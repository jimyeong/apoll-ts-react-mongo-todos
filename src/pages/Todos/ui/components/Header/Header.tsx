import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import styled from "styled-components";
import {
  getPicture,
  isLogin,
  logout,
} from "../../../../../storage/localStorage";
import WrapperContainer from "../../../../../ui/components/Layouts/Containers/WrapperContainer";
import { IoIosLogOut } from "react-icons/io";
import CommonHelper from "../../../../../helper/CommonHelpers";
import { useAppContext } from "../../../../App/context/appContext";

const HeaderBlock = styled.header`
  .profile__box {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn__logout {
    color: white;
    &:hover {
      color: CommonHelper.shadeColor("tomato", 20);
    }
  }
  .btn__wrapper {
    margin-left: 10px;
  }
  .header__container {
    margin-top: 0;
    height: 100%;
  }
  .profile__img {
    border-radius: 50%;
    width: 42px;
  }
`;

const Header = ({ children }: React.PropsWithChildren) => {
  const { appContextState, updateContextState, navigate } = useAppContext();
  console.log("@@appContextState!@#!@#!@#", appContextState);

  const isLogined = isLogin();
  console.log("getPicture", getPicture());
  const handleLogout = () => {
    logout();
    console.log("@@@hi is this being excuted?");
    updateContextState({ type: "LOG_OUT" });
  };

  return (
    <HeaderBlock>
      <Box
        zIndex={1000}
        pos="fixed"
        top={0}
        left={0}
        w="100%"
        h="62px"
        bg="tomato"
      >
        {isLogined == "1" && (
          <WrapperContainer className="container por header__container">
            <div className="profile__box">
              <img className="profile__img" src={getPicture() || ""} alt="" />
              <div className="btn__wrapper">
                <button onClick={handleLogout} className="btn__logout">
                  <IoIosLogOut /> LogOut
                </button>
              </div>
            </div>
          </WrapperContainer>
        )}
      </Box>
    </HeaderBlock>
  );
};

export default Header;
