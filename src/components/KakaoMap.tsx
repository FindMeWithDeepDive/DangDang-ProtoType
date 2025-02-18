import { Map, MapMarker } from "react-kakao-maps-sdk";
import markerIcon from "../assets/markerIcon.png";
import { useBottomSheetStore, usePlaceStore } from "../stores/map";
import { usePlaceDetailStore } from "../stores/map"; // usePlaceDetailStore import 추가
import axios from "axios";
import { useEffect } from "react";

const KakaoMap = () => {
  const { places, updatePlaces } = usePlaceStore();
  const { updatePlace } = usePlaceDetailStore(); // 전역 상태 업데이트 함수 가져오기
  const { setHeight, setContentDisplay, setMeetingDisplay, setState } = useBottomSheetStore();
  useEffect(() => {
    const getPlace = async () => {
      try {
        const res = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
          params: { query: "애견동반", y: 37.514322572335935, x: 127.06283102249932, radius: 20000 },
          headers: { Authorization: "KakaoAK 3e5e48a79a281327bcbf876ef6b4d5f8" },
        });
        updatePlaces(res.data.documents);
      } catch (err) {
        console.error("장소 조회 에러 : ", err);
      }
    };
    getPlace();
  }, []);

  const initialLat = places.length > 0 ? parseFloat(places[0].y) : 37.5665;
  const initialLng = places.length > 0 ? parseFloat(places[0].x) : 126.978;

  const handleMarkerClick = (place) => {
    updatePlace(place); // 마커 클릭 시 해당 장소 정보를 전역 상태로 업데이트
    setHeight(195);
    setContentDisplay("flex");
    setMeetingDisplay("none");
    setState(1);
  };

  return (
    <>
      <Map center={{ lat: initialLat, lng: initialLng }} style={{ width: "100%", height: "100%" }}>
        {places.map((place, index) => (
          <MapMarker
            key={index}
            position={{ lat: parseFloat(place.y), lng: parseFloat(place.x) }}
            image={{
              src: markerIcon,
              size: {
                width: 24,
                height: 24,
              },
              options: {
                offset: { x: 0, y: 0 },
              },
            }}
            onClick={() => handleMarkerClick(place)} // 클릭 시 handleMarkerClick 호출
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
