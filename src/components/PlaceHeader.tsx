import { useState } from "react";
import styled from "styled-components";
import alertOffIcon from "../assets/alertOffIcon.png";
import alertOnIcon from "../assets/alertOnIcon.png";

export default function PlaceHeader() {
  const [alertState, setAlertState] = useState(true);
  return <HeaderContainer>{alertState ? <Icon src={alertOnIcon} /> : <Icon src={alertOffIcon} />}</HeaderContainer>;
}

const HeaderContainer = styled.div`
  width: 440px;
  height: 56px;
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin: auto;
  margin-right: 16px;
  cursor: pointer;
`;
