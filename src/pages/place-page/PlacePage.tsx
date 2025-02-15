import styled from "styled-components";
import KakaoMap from "../../components/KakaoMap";

export default function PlacePage() {
  return (
    <PlacePageContainer>
      <Header>헤더입니당 (수정예정)</Header>
      <Map>
        <KakaoMap></KakaoMap>
      </Map>
    </PlacePageContainer>
  );
}

const Header = styled.div`
  width: 100%;
  height: 51px;
  background-color: #d9d9d9;
  text-align: center;
`;

const PlacePageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Map = styled.div`
  width: 100%; /* 전체 너비에 맞추기 */
  flex: 1; /* 남은 공간을 채우기 */
`;
