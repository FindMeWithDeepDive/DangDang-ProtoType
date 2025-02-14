import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import BottomBar from "./components/shared/BottomBar";
import HomePage from "./pages/home-page/HomePage";
import PlacePage from "./pages/place-page/PlacePage";
import GroupPage from "./pages/group-page/GroupPage";
import MyPage from "./pages/my-page/MyPage";

const App = () => {
  return (
    <AppContainer>
      <AppContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/place" element={<PlacePage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </AppContent>
      <BottomBar /> {/* 하단 바 컴포넌트 */}
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  width: 440px;
  min-height: 800px;
  height: 100vh; /* 화면의 크기 전체에 맞게 설정 */
  margin: 0 auto;
  background-color: #999999;
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.div`
  width: 440px;
  height: 100%;
  overflow-y: auto; /* 내용이 많으면 스크롤이 생기도록 설정 */
  flex-grow: 1; /* BottomBar를 제외한 나머지 공간을 채움 */
`;
