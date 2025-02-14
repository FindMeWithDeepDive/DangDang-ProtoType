import styled from "styled-components";

export default function PlacePage() {
  return (
    <PlacePageContainer>
      <Header>헤더입니당 (수정예정)</Header>
      <Map></Map>
    </PlacePageContainer>
  );
}

const Header = styled.div`
  width: 440px;
  height: 51px;
  background-color: #d9d9d9;
  text-align: center;
`;

const PlacePageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d1d1d1;
`;

const Map = styled.div`
  width: 440px;
`;
