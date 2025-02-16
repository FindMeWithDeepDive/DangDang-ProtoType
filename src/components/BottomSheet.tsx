import { useState } from "react";
import styled from "styled-components";
import bottomBarIcon from "../assets/bottomBarIcon.png";
import BottomSheetContent from "./BottomSheetContent";
import BottomSheetMeetingList from "./BottomSheetMeetingList";

export default function BottomSheet() {
  const [height, setHeight] = useState(28); // 기본 height 값을 400으로 설정
  const [contentDisplay, setContentDisplay] = useState("none");
  const [meetingDisplay, setMeetingDisplay] = useState("none");
  const [state, setState] = useState(0);

  const onClickHeader = () => {
    if (state === 0) {
      setState(1);
      setHeight(195);
      setContentDisplay("flex");
      setMeetingDisplay("flex");
    } else if (state === 1) {
      setState(2);
      setHeight(900);
    } else if (state === 2) {
      setState(0);
      setHeight(28);
      setContentDisplay("none");
      setMeetingDisplay("none");
    }
  };

  return (
    <BottomSheetContainer height={height}>
      <BottomHeader
        onClick={() => {
          onClickHeader();
        }}
      >
        <BottomBarIcon src={bottomBarIcon} />
      </BottomHeader>
      <SheetContentWrapper contentDisplay={contentDisplay}>
        <BottomSheetContent />
      </SheetContentWrapper>
      <SheetMeetingListWrapper meetingDisplay={meetingDisplay}>
        <BottomSheetMeetingList />
      </SheetMeetingListWrapper>
    </BottomSheetContainer>
  );
}

// BottomSheetContainer의 height를 props로 받음
const BottomSheetContainer = styled.div`
  width: 440px;
  background-color: #ffffff;
  position: absolute;
  z-index: 1;
  display: flex;
  bottom: 65px;
  flex-direction: column;
  height: ${({ height }) => height}px; /* height를 props로 받음 */
  border-top-left-radius: 20px; /* Top-left corner rounded */
  border-top-right-radius: 20px; /* Top-right corner rounded */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: height 0.3s ease-in-out; /* height가 변경될 때 부드럽게 애니메이션 */
`;

const BottomHeader = styled.div`
  height: 36px;
  margin: 0 auto;
  margin-top: 8px;
  cursor: pointer;
`;

const BottomBarIcon = styled.img`
  justify-content: center;
  margin: 0 auto;
`;

const SheetContentWrapper = styled.div`
  width: 440px;
  display: ${({ contentDisplay }) => contentDisplay};
`;

const SheetMeetingListWrapper = styled.div`
  margin: 0 16px;
  margin-bottom: 16px;
  display: ${({ meetingDisplay }) => meetingDisplay};
`;
