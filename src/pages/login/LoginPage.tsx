import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void; // ✅ boolean 타입만 허용
}

export default function LoginPage({ setIsAuthenticated }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/api/v1/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "",
          },
          withCredentials: true,
        }
      );

      console.log("✅ 로그인 성공:", response.data);

      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      // ✅ axiosInstance를 사용하여 이후 모든 요청에서 자동으로 Authorization 헤더 포함
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      console.log("✅ 이동", response.data);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error: any) {
      console.error("로그인 실패:", error);

      if (error.response) {
        console.error("서버 응답:", error.response.data);
        alert(
          `로그인 실패: ${error.response.data.message || "정보를 확인하세요."}`
        );
      } else if (error.request) {
        console.error("서버 응답 없음:", error.request);
        alert("서버와의 연결이 원활하지 않습니다.");
      } else {
        console.error("기타 오류:", error.message);
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Container>
      <Logo src="src/assets/logo.png" alt="댕댕크루 로고" />
      <Title>댕댕크루</Title>

      <InputContainer>
        <Input
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </InputContainer>

      <SignupContainer>
        <SignupText>아직 회원이 아니신가요?</SignupText>
        <SignupButton>회원가입</SignupButton>
      </SignupContainer>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding-top: 80px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Logo = styled.img`
  width: 202px;
  height: 196px;
  margin-bottom: 20px;
  position: rela;
`;

const Title = styled.div`
  color: #845ec2;
  font-size: 20px;
  font-family: "Gmarket Sans";
  font-weight: 700;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  width: 314px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  display: flex;
  border-radius: 19px;
  border: 1px solid #845ec2;
  padding: 0 16px;
  font-size: 14px;
  color: #845ec2;
  font-family: "Gmarket Sans";
  outline: none;
  pointer-events: auto;
  z-index= 100;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 19px;
  background: #845ec2;
  color: white;
  font-size: 16px;
  font-weight: 700;
  font-family: "Gmarket Sans";
  cursor: pointer;
  border: none;
  pointer-events: auto;
  z-index= 10000;
`;

const SignupContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SignupText = styled.div`
  font-size: 13px;
  color: gray;
  font-family: "Gmarket Sans";
`;

const SignupButton = styled.button`
  background: #b39cd0;
  border-radius: 19px;
  padding: 8px 16px;
  font-size: 13px;
  font-family: "Gmarket Sans";
  color: white;
  border: none;
  cursor: pointer;
`;
