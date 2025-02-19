import { Route, Routes, Navigate } from "react-router-dom"; // ✅ Router 제거
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import BottomBar from "./components/shared/BottomBar";
import HomePage from "./pages/home-page/HomePage";
import GroupPage from "./pages/group-page/GroupPage";
import MyPage from "./pages/my-page/MyPage";
import LoginPage from "./pages/login/LoginPage";
import MeetingPage from "./pages/meeting-page/MeetingPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // ✅ 초기값은 null 허용

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>로딩 중...</div>;
  }

  return (
    <AppContainer>
      <AppContent>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/group" element={<GroupPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/*" element={<Navigate to="/" replace />} />{" "}
              <Route path="/meeting/:id" element={<MeetingPage />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route path="/*" element={<Navigate to="/login" replace />} />{" "}
            </>
          )}
        </Routes>
      </AppContent>
      {!isAuthenticated && <BottomBar />}
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  width: 440px;
  height: 100vh;
  margin: 0 auto;
  background-color: #999999;
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.div`
  width: 440px;
  height: 100%;
  overflow-y: auto;
  flex-grow: 1;
`;
