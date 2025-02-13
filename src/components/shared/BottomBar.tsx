import { Link } from "react-router-dom"; // Link를 import
import homeIcon from "../../assets/icons/bottom-bar-icons/homeIcon.png";
import placeIcon from "../../assets/icons/bottom-bar-icons/placeIcon.png";
import groupIcon from "../../assets/icons/bottom-bar-icons/groupIcon.png";
import mypageIcon from "../../assets/icons/bottom-bar-icons/mypageIcon.png";
import styled from "styled-components";

export default function BottomBar() {
  const buttonData = [
    { icon: homeIcon, label: "홈", path: "/" },
    { icon: placeIcon, label: "장소", path: "/place" },
    { icon: groupIcon, label: "내 모임", path: "/group" },
    { icon: mypageIcon, label: "마이페이지", path: "/mypage" },
  ];

  return (
    <BottomBarContainer>
      {buttonData.map((button, index) => {
        return (
          <Link to={button.path} key={index} style={{ textDecoration: "none" }}>
            <BottomBarButton>
              <ButtonIcon src={button.icon} />
              <ButtonText>{button.label}</ButtonText>
            </BottomBarButton>
          </Link>
        );
      })}
    </BottomBarContainer>
  );
}

const BottomBarContainer = styled.div`
  display: flex;
  width: 360px;
  height: 69px;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
`;

const BottomBarButton = styled.div`
  width: 45px;
  height: 38px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ButtonIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ButtonText = styled.div`
  font-size: 10px;
  font-weight: 300;
  text-align: center;
  color: #000;
  margin-top: 4px;
`;
