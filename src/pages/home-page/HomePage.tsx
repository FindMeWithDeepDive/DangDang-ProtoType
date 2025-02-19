import styled from "styled-components";
import KakaoMap from "../../components/KakaoMap";
import BottomSheet from "../../components/BottomSheet";
import PlaceHeader from "../../components/PlaceHeader";

export default function HomePage() {
  return (
    <PlacePageContainer>
      <PlaceHeader></PlaceHeader>
      <Map>
        <KakaoMap></KakaoMap>
      </Map>
      <BottomSheet></BottomSheet>
    </PlacePageContainer>
  );
}

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
