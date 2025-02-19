import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopBar from "../../components/shared/TopBar";

interface Meeting {
  meetingId: number;
  meetingName: string;
  information: string;
  maxPeople: number;
  curPeople: number;
  status: string;
  createdAt: string;
}

export default function MeetingPage() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [showModal, setShowModal] = useState(false); // ✅ 참가 확인 팝업
  const [showSuccessModal, setShowSuccessModal] = useState(false); // ✅ 참가 완료 팝업

  useEffect(() => {
    axios
      .get(`/api/v1/meetings/${id}`)
      .then((response) => {
        console.log("API 응답:", response.data);
        setMeeting(response.data.data || {});
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleJoin = () => {
    axios
      .post(`/api/v1/meetings/${id}/applications`)
      .then(() => {
        console.log("참가 완료");
        setIsJoined(true);
        setShowModal(false); // ✅ 참가 확인 팝업 닫기
        setShowSuccessModal(true); // ✅ 참가 완료 팝업 열기
        setMeeting((prev) =>
          prev ? { ...prev, curPeople: prev.curPeople + 1 } : prev
        );
      })
      .catch((error) => console.error("참가 신청 실패:", error));
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <TopBar />

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "white",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* 모임 정보 */}
        <h2 style={{ color: "#111", fontSize: "20px", fontWeight: "700" }}>
          {meeting?.meetingName}
        </h2>

        <p style={{ color: "#111", fontSize: "14px", fontWeight: "300" }}>
          {meeting?.maxPeople}명 중 {meeting?.curPeople}명이 모였어요!
        </p>
        <div
          style={{
            width: "100%",
            height: 0,
            border: "0.1px black solid",
            justifyContent: "center",
          }}
        ></div>

        {/* 버튼 영역 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              width: "140px",
              height: "40px",
              background: "white",
              borderRadius: "19px",
              border: "0.5px solid #845EC2",
              color: "#111",
              fontSize: "13px",
              fontWeight: "300",
              cursor: "pointer",
            }}
          >
            채팅 문의하기
          </button>
          <button
            style={{
              width: "140px",
              height: "40px",
              background: isJoined ? "#979797" : "#845EC2",
              borderRadius: "19px",
              color: "white",
              fontSize: "13px",
              fontWeight: "300",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => setShowModal(true)} // ✅ 참가 확인 팝업 열기
          >
            {isJoined ? "참가 취소" : "참가 신청하기"}
          </button>
        </div>

        <p
          style={{
            width: "90%",
            color: "black",
            fontSize: "16px",
            fontWeight: "300",
          }}
        >
          {meeting?.information}
        </p>
      </div>

      {/* ✅ 참가 확인 팝업 */}
      {showModal && (
        <div
          style={{
            width: "280px",
            height: "281px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#F9F9F9",
            boxShadow: "0px 4px 11px -4px rgba(132, 94, 194, 0.30)",
            borderRadius: "19px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>
            참가 신청을 하시겠습니까?
          </p>
          <p style={{ fontSize: "15px", fontWeight: "300", color: "black" }}>
            참가 신청 전, <strong>시간과 장소</strong>를 꼼꼼히 확인하여 다른
            회원에게 피해가 가지 않도록 주의바랍니다. <br />
            <br />
            <strong>참가 확정 후 취소할 경우, 불이익이 있습니다.</strong>
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => setShowModal(false)} // ✅ 팝업 닫기
              style={{
                width: "100px",
                height: "31px",
                background: "white",
                borderRadius: "19px",
                border: "0.5px solid #845EC2",
                color: "#111111",
                fontSize: "13px",
                fontWeight: "300",
                cursor: "pointer",
              }}
            >
              뒤로가기
            </button>
            <button
              onClick={handleJoin} // ✅ 참가 신청 실행
              style={{
                width: "100px",
                height: "31px",
                background: "#845EC2",
                borderRadius: "19px",
                color: "white",
                fontSize: "13px",
                fontWeight: "300",
                cursor: "pointer",
                border: "none",
              }}
            >
              신청하기
            </button>
          </div>
        </div>
      )}

      {/* ✅ 참가 완료 팝업 */}
      {showSuccessModal && (
        <div
          style={{
            width: "280px",
            height: "149px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#F9F9F9",
            boxShadow: "0px 4px 11px -4px rgba(132, 94, 194, 0.30)",
            borderRadius: "19px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>
            참가 신청이 완료되었습니다.
          </p>
          <button
            onClick={handleCloseSuccessModal}
            style={{
              width: "100px",
              height: "31px",
              background: "#845EC2",
              borderRadius: "19px",
              color: "white",
              fontSize: "13px",
              fontWeight: "300",
              cursor: "pointer",
              border: "none",
            }}
          >
            확인
          </button>
        </div>
      )}
    </>
  );
}
