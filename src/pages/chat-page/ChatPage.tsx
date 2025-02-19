import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";

interface Message {
  sender: string;
  message: string;
}

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM5OTU3NzM5LCJleHAiOjE3Mzk5NTk1Mzl9.pYt-dLvgXlnp--J4bZVlY1HTKCM1sRBMc_rbGWr4v60";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const socket = new SockJS("http://54.180.30.146:8080/ws");
  const stompClient = Stomp.over(socket);

  useEffect(() => {
    stompClient.connect({ Authorization: `Bearer ${token}` }, () => {
      console.log("✅ STOMP 연결 성공!");

      // 실시간 메시지 구독
      stompClient.subscribe("/subscribe/chatroom.1", (message) => {
        const msg = JSON.parse(message.body);
        console.log("📩 메시지 수신:", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      // 채팅방 입장 알림
      stompClient.send("/publish/chat.1", { Authorization: `Bearer ${token}` }, JSON.stringify({ type: "ENTER", message: "" }));
      console.log("🚪 채팅방 입장!");

      // 창 닫을 때 퇴장 메시지 전송
      window.addEventListener("beforeunload", () => {
        stompClient.send("/publish/chat.1", { Authorization: `Bearer ${token}` }, JSON.stringify({ type: "LEAVE", message: "" }));
        console.log("🚶‍♂️ 채팅방 퇴장!");
        // stompClient.disconnect();
      });
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // 자동 스크롤
    }
  }, [messages]);

  const sendMessage = () => {
    const msg = inputRef.current?.value.trim();
    if (!msg) return;

    const socket = new SockJS("http://54.180.30.146:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({ Authorization: `Bearer ${token}` }, () => {
      stompClient.send("/publish/chat.1", { Authorization: `Bearer ${token}` }, JSON.stringify({ type: "TALK", message: msg }));
      console.log("📤 메시지 전송:", msg);
      inputRef.current!.value = "";
    });
  };

  return (
    <ChatContainer>
      <p>채팅방 (Room ID: 1)</p>
      <ChatBox ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.sender}:</b> {msg.message}
          </p>
        ))}
      </ChatBox>
      <Input type="text" placeholder="메시지를 입력하세요" ref={inputRef} />
      <Button onClick={sendMessage}>
        <div>전송</div>
      </Button>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  width: 440px;
  height: 600px;
  background-color: #fff;
`;

const ChatBox = styled.div`
  border: 1px solid black;
  width: 300px;
  height: 300px;
  overflow-y: auto;
  padding: 10px;
`;

const Input = styled.input`
  width: calc(100% - 60px);
`;

const Button = styled.button`
  width: 50px;
`;
