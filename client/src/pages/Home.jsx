import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import ConfessionCard from "../components/ConfessionCard";
import api from "../api/api";

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/confession").then((res) => setData(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-6 sm:mt-10 p-4 min-h-screen text-white">
      {/* Header */}
      <h1
        className="
          text-4xl sm:text-5xl lg:text-6xl 
          font-extrabold 
          mb-2 
          text-center 
          text-pink-600
        "
        style={{ color: "#3B240C", fontFamily: "'Dancing Script', cursive" }}
      >
        Confess Your Heart
      </h1>

      <h2
        className="
          text-lg sm:text-xl md:text-xl lg:text-2xl 
          mb-2
          text-center
          tracking-wide
        "
        style={{ color: "#4A2B0C", fontFamily: "'Times New Roman', serif" }}
      >
        Say What Your Heart Feels - 100% Anonymously!
      </h2>
      <h2
        className="
    text-xs sm:text-sm md:text-base lg:text-lg
    mt-1 mb-6
    text-center
    opacity-80
    leading-relaxed
  "
        style={{
          color: "#4A2B0C",
          fontFamily: "'Times New Roman', serif",
        }}
      >
        Confess anything without fear. Someone is always listening.
      </h2>

      <button
      onClick={() => navigate("/add")}
        className="
    px-6 sm:px-8 
    py-2 sm:py-3 
    mb-6
    text-white 
    font-semibold 
    rounded-full 
    shadow-md 
    text-sm sm:text-base 
    flex items-center justify-center gap-2 
    mx-auto
    transition-all duration-300 
    hover:opacity-90 
    active:scale-95
  "
        style={{
          background: "linear-gradient(90deg, #F6B56B, #EFA75A)",
          boxShadow: "0px 4px 12px rgba(239, 167, 90, 0.5)",
        }}
      >
        <span style={{ fontSize: "1.1rem" }}>🖊️</span>
        Write a Confession
      </button>

      {/* TITLE + ADD BUTTON ROW */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className="
            text-lg sm:text-lg lg:text-xl
            bg-clip-text 
            text-transparent
            bg-linear-to-r from-pink-500 to-indigo-500
            drop-shadow
          "
          style={{ color: "#3B240C", fontFamily: "'Times New Roman', serif" }}
        >
          Recent Confessions (Anonymously)
        </h3>

        {/* Add Confession Button */}
        <button
          onClick={() => navigate("/add")}
          style={{
            backgroundColor: "#8B1E1E",
            color: "#E8D3A8",
            border: "2px solid #C9A86A",
            WebkitTextFillColor: "#E8D3A8",
          }}
          className="
          flex items-center justify-center
          w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
          rounded-full
          shadow-[0_4px_10px_rgba(0,0,0,0.4)]
          hover:scale-110 active:scale-95 transition-all 
  "
        >
          <FiPlus className="text-xl" />
        </button>
      </div>

      {/* Confession Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((c) => (
          <ConfessionCard key={c._id} confession={c} />
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <p className="text-gray-300 text-center mt-10 text-lg sm:text-xl">
          No confessions yet… Be the first 💬
        </p>
      )}
    </div>
  );
}
