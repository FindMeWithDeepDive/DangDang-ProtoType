import { Map, MapMarker } from "react-kakao-maps-sdk";
import markerIcon from "../assets/markerIcon.png"; // 마커 아이콘 이미지

const KakaoMap = () => {
  const markerData = [
    { s_lat: 37.5665, s_lng: 126.978, title: "서울" },
    { s_lat: 37.57, s_lng: 126.99, title: "명동" },
  ];

  // 첫 번째 마커 위치로 맵의 중심을 설정
  const initialLat = markerData[0].s_lat;
  const initialLng = markerData[0].s_lng;

  return (
    <>
      <Map center={{ lat: initialLat, lng: initialLng }} style={{ width: "100%", height: "100%" }}>
        {markerData.map((marker, index) => (
          <MapMarker
            key={index}
            position={{ lat: marker.s_lat, lng: marker.s_lng }}
            image={{
              src: markerIcon, // 커스텀 마커 아이콘
              size: {
                width: 24, // 이미지 너비
                height: 24, // 이미지 높이
              },
              options: {
                offset: { x: 0, y: 0 }, // 마커 이미지의 하단 중앙을 기준으로 설정 (마커의 중앙 하단 위치)
              },
            }}
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
