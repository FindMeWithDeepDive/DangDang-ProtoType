import React, { useEffect, useState } from "react";
import styled from "styled-components";
import humanIcon from "../assets/humanIcon.png";
import { usePlaceDetailStore } from "../stores/map";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BottomSheetMeetingList() {
  const { id } = usePlaceDetailStore(); // 여기서 id를 가져옴
  const [meetings, setMeetings] = useState<
    {
      title: string;
      maxParticipants: number;
      participants: number;
      id: number;
    }[]
  >([]);

  useEffect(() => {
    if (!id) return; // id가 없으면 API 요청 안 함
    const token = localStorage.getItem("accessToken");

    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`/api/v1/meetings?placeId=${id}`);

        console.log("응답 데이터 : ", response.data);

        const mappedData = response.data.data.map((meeting: any) => ({
          id: meeting.meetingId,
          title: meeting.meetingName, // 제목 매핑
          maxParticipants: meeting.maxPeople, // 최대 참여자 수
          participants: meeting.curPeople, // 현재 참여자 수
        }));

        setMeetings(mappedData);
      } catch (error) {
        console.error("모임 데이터 불러오기 실패:", error);
      }
    };

    fetchMeetings();
  }, [id]);

  const navigate = useNavigate();

  const goToMeetingPage = (meetingId: number) => {
    navigate(`/meeting/${meetingId}`);
  };

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
        {meetings.map((data, index) => {
          return (
            <MeetingItem key={index} onClick={() => goToMeetingPage(data.id)}>
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
