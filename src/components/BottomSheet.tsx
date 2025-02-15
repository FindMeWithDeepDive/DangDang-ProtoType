import React from "react";
import styled from "styled-components";
import bottomBarIcon from "../assets/bottomBarIcon.png";
import starIcon from "../assets/starIcon.png";
import phoneIcon from "../assets/phoneIcon.png";

export default function BottomSheet() {
  return (
    <BottomSheetContainer>
      <BottomHeader>
        <BottomBarIcon src={bottomBarIcon} />
      </BottomHeader>
      <SheetContentWrapper>
        <SheetContent>
          <TitleIconWrapper>
            <Title>제목</Title>
            <Icon src={starIcon} />
          </TitleIconWrapper>
          <PlaceDescription>부산 해운대구 어디어디</PlaceDescription>
          <PlaceDescriptionSub>(구) 부산 해운대구 어디어디</PlaceDescriptionSub>
          <PhoneNumberWrapper>
            <PhoneIcon src={phoneIcon} />
            <PhoneNumber>053-111-2345</PhoneNumber>
          </PhoneNumberWrapper>
        </SheetContent>
      </SheetContentWrapper>
    </BottomSheetContainer>
  );
}

const BottomSheetContainer = styled.div`
  width: 440px;
  background-color: #ffffff;
  position: absolute;
  z-index: 1;
  display: flex;
  bottom: 6px;
  flex-direction: column;
`;

const BottomHeader = styled.div`
  height: 36px;
  margin: 0 auto;
`;

const BottomBarIcon = styled.img`
  justify-content: center;
`;

const SheetContentWrapper = styled.div`
  width: 440px;
  margin-bottom: 32px;
`;

const SheetContent = styled.div`
  width: 440px;
`;

const TitleIconWrapper = styled.div`
  width: 440px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.div`
  width: 200px;
  color: #845ec2;
  font-size: bold;
  font-size: 20px;
  margin-left: 16px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-left: auto;
  margin-right: 16px;
`;

const PlaceDescription = styled.div`
  width: 400px;
  height: 20px;
  font-size: 15px;
  margin-left: 16px;
  margin-bottom: 8px;
`;

const PlaceDescriptionSub = styled.div`
  width: 400px;
  height: 16px;
  font-size: 13px;
  margin-left: 16px;
  margin-bottom: 24px;
`;

const PhoneNumberWrapper = styled.div`
  width: 440px;
  height: 24px;
  display: flex;
  margin-left: 16px;
`;

const PhoneIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;
const PhoneNumber = styled.div`
  width: 200px;
  height: 21px;
  font-size: 15px;
`;
