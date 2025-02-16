import React from "react";
import styled from "styled-components";
import starIcon from "../assets/starIcon.png";
import phoneIcon from "../assets/phoneIcon.png";
import { usePlaceDetailStore } from "../stores/map";

export default function BottomSheetContent() {
  const { place_name, road_address_name, address_name, phone } = usePlaceDetailStore();
  return (
    <SheetContent>
      <TitleIconWrapper>
        <Title>{place_name}</Title>
        <Icon src={starIcon} />
      </TitleIconWrapper>
      <PlaceDescription>{road_address_name}</PlaceDescription>
      <PlaceDescriptionSub>{address_name}</PlaceDescriptionSub>
      <PhoneNumberWrapper>
        <PhoneIcon src={phoneIcon} />
        <PhoneNumber>{phone}</PhoneNumber>
      </PhoneNumberWrapper>
    </SheetContent>
  );
}

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
  margin-top: 16px;
`;

const Title = styled.div`
  width: 300px;
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
  height: 56px;
  display: flex;
  margin-left: 16px;
  margin-right: 16px;
  border-bottom: 1px solid #000000;
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
