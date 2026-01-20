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
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Confess Your Heart
      </h1>

      <h2
        className="
          text-base sm:text-lg lg:text-xl 
          mb-8 
          text-center 
          bg-clip-text 
          text-transparent 
          bg-gradient-to-r from-indigo-500 to-pink-500 
          drop-shadow-md
          tracking-wide
        "
        style={{ fontFamily: "'Times New Roman', serif" }}
      >
        100% Anonymous & Secure
      </h2>

      {/* TITLE + ADD BUTTON ROW */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className="
            text-lg sm:text-lg lg:text-xl
            bg-clip-text 
            text-transparent
            bg-gradient-to-r from-pink-500 to-indigo-500
            drop-shadow
          "
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          Recent Confessions (Anonymously)
        </h3>

        {/* Add Confession Button */}
        <button
          onClick={() => navigate("/add")}
          className="
    flex items-center justify-center
    w-8 h-8        /* mobile size */
    sm:w-9 sm:h-9  /* tablet */
    md:w-10 md:h-10 /* desktop */
    rounded-full
    bg-gradient-to-r from-pink-500 to-indigo-500
    text-white
    shadow-lg
    hover:scale-110
    active:scale-95
    transition-all
  "
          title="Add Confession"
        >
          <FiPlus className="text-base sm:text-lg md:text-xl" />
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
