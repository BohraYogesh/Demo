import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { timeAgo } from "../utils/timeAgo";

export default function ConfessionDetail() {
  const { id } = useParams();
  const [confession, setConfession] = useState(null);

  useEffect(() => {
    api.get(`/confession/${id}`).then((res) => {
      setConfession(res.data);
    });
  }, [id]);

  if (!confession) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-linear-to-b from-[#F6E7D8] to-[#F1DCC9] text-[#3A1F0A]">
      {/* PAGE WRAPPER */}
      <div className="max-w-3xl mx-auto mt-6 sm:mt-12">
        {/* GLASS CARD */}
        <div
          className="
            bg-white/20 
            backdrop-blur-xl
            border border-white/30
            shadow-xl
            rounded-2xl
            p-6 sm:p-8
          "
        >
          {/* CATEGORY BADGE */}
          <span
            className="
              inline-block px-4 py-1
              rounded-full mb-4
              text-sm font-semibold
            "
            style={{
              backgroundColor: "#6E1616",
              color: "#E8D3A8",
            }}
          >
          </span>

          {/* CONFESSION TEXT */}
          <p
            className="
              text-base sm:text-lg lg:text-xl
              leading-relaxed
              whitespace-pre-wrap
            "
            style={{ color: "#3A1F0A" }}
          >
            {confession.confession}
          </p>

          {/* DATE */}
          <div className="mt-6 text-right">
            <small
              className="text-xs sm:text-sm"
              style={{ color: "#6B4F30", WebkitTextFillColor: "#6B4F30" }}
            >
              {timeAgo(confession.createdAt)}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
