import React from "react";
import styled from "styled-components";
import humanIcon from "../assets/humanIcon.png";

// 임시 데이터입니다. API 완성되면 삭제 후 API 데이터로 수정하시면 됩니다.
const dummyData = [
  {
    title: "소형견만 가능해욧",
    maxParticipants: 5,
    participants: 3,
  },
  {
    title: "화,목 자주 모여요",
    maxParticipants: 10,
    participants: 6,
  },
  {
    title: "소형견만 가능해욧",
    maxParticipants: 5,
    participants: 3,
  },
  {
    title: "소형견만 가능해욧",
    maxParticipants: 5,
    participants: 3,
  },
  {
    title: "화, 목 자주 모여요",
    maxParticipants: 10,
    participants: 6,
  },
];

export default function BottomSheetMeetingList() {
  const onClickButton = () => {
    alert("모임 생성 페이지로 이동합니다. (수정 요망)");
  };
  return (
    <MeetingListContainer>
      <TitleButtonBox>
        <Title>모임 목록</Title>
        <CreateButton
          onClick={() => {
            onClickButton();
          }}
        >
          모임 생성
        </CreateButton>
      </TitleButtonBox>
      <MeetingList>
        {dummyData.map((data, index) => {
          return (
            <MeetingItem key={index}>
              <MeetingTitle>{data.title}</MeetingTitle>
              <IconPeopleBox>
                <Icon src={humanIcon} />
                <People>{`${data.participants} / ${data.maxParticipants}`}</People>
              </IconPeopleBox>
            </MeetingItem>
          );
        })}
      </MeetingList>
    </MeetingListContainer>
  );
}

const MeetingListContainer = styled.div`
  width: 408px;
`;

const TitleButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-bottom: 16px;
  align-items: center;
`;

const Title = styled.div`
  width: 150px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const CreateButton = styled.div`
  border-radius: 19px;
  background-color: #845ec2;
  width: 94px;
  height: 32px;
  color: #ffffff;
  text-align: center;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6f3f9b; /* 10% 어두운 색 */
  }
`;

const MeetingList = styled.div`
  width: 100%;
`;

const MeetingItem = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #845ec2;
  border-radius: 9px;
  margin-bottom: 24px;
  cursor: pointer;
`;

const MeetingTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-left: 48px;
`;

const IconPeopleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 48px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin: 8px;
`;

const People = styled.div`
  width: 48px;
  height: 16px;
  font-size: 14px;
`;
