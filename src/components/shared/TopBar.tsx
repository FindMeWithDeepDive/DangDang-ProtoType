import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/뒤로가기.png"; // ✅ 뒤로가기 아이콘 가져오기

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "51px",
        background: "white",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        boxSizing: "border-box",
        borderBottom: "1px solid #ddd",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={backIcon} // ✅ 이미지 사용
          alt="뒤로가기"
          style={{ width: "14px", height: "14px" }} // 아이콘 크기 조정
        />
      </button>
    </div>
  );
}
