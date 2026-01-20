import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ConfessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confession, setConfession] = useState(null);

  useEffect(() => {
    api.get(`/confession/${id}`).then((res) => {
      setConfession(res.data);
    });
  }, [id]);

  if (!confession) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 text-white">
      <div className="max-w-3xl mx-auto mt-6 sm:mt-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="
            text-indigo-400 
            hover:text-indigo-300 
            mb-6
            text-sm sm:text-base
          "
        >
          ← Back
        </button>

        {/* Glass Card */}
        <div
          className="
    bg-black/80
    sm:bg-white/10
    sm:backdrop-blur-xl
    border
    sm:border-white/20
    rounded-2xl
    p-5 sm:p-7
    shadow-xl
  "
        >
          {/* Confession Text */}
          <p
            className="
              text-pink-700
              text-base sm:text-lg lg:text-xl
              leading-relaxed
              whitespace-pre-wrap
            "
          >
            {confession.confession}
          </p>

          {/* Date */}
          <div className="mt-6 text-right">
            <small className="text-purple-500 text-xs sm:text-sm">
              {new Date(confession.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
