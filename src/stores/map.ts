import { create } from "zustand";

/** 지도 페이지 : 상태 관리 파일입니다 */

interface IPlace {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  id: string;
  x: string;
  y: string;
  meetingList: IMeeting[];
}

interface IMeeting {
  title: string;
  maxParticipants: number;
  participants: number;
}

interface PlaceStore {
  places: IPlace[];
  updatePlaces: (newPlaces: IPlace[]) => void;
}

interface PlaceDetailStore {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  id: string;
  x: string;
  y: string;
  meetingList: IMeeting[];
  updatePlace: (place: IPlace) => void; // place 상태 업데이트 함수
}

const usePlaceStore = create<PlaceStore>((set) => ({
  places: [],
  updatePlaces: (newPlaces) => set({ places: newPlaces }),
}));

const usePlaceDetailStore = create<PlaceDetailStore>((set) => ({
  place_name: "",
  road_address_name: "",
  address_name: "",
  phone: "",
  id: "",
  x: "",
  y: "",
  place_id: "",
  meetingList: [],
  updatePlace: (newPlace) => set({ ...newPlace }), // place 정보 업데이트
}));

/** 바텀 시트 상태 관리 */
interface BottomSheetStore {
  height: number;
  contentDisplay: string;
  meetingDisplay: string;
  state: number;
  onClickHeader: () => void;
  setHeight: (height: number) => void;
  setContentDisplay: (display: string) => void;
  setMeetingDisplay: (display: string) => void;
  setState: (state: number) => void;
}

const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  height: 28,
  contentDisplay: "none",
  meetingDisplay: "none",
  state: 0,
  onClickHeader: () =>
    set((state) => {
      const newState = state.state === 0 ? 1 : state.state === 1 ? 2 : 0;
      const newHeight = newState === 0 ? 28 : newState === 1 ? 195 : 900;
      const newContentDisplay = newState === 0 ? "none" : "flex";
      const newMeetingDisplay = newState === 0 ? "none" : "flex";

      return {
        state: newState,
        height: newHeight,
        contentDisplay: newContentDisplay,
        meetingDisplay: newMeetingDisplay,
      };
    }),
  setHeight: (height) => set({ height }),
  setContentDisplay: (display) => set({ contentDisplay: display }),
  setMeetingDisplay: (display) => set({ meetingDisplay: display }),
  setState: (state) => set({ state }),
}));

export { usePlaceStore, usePlaceDetailStore, useBottomSheetStore };
