import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";
import bg from "../assets/bg.png";
import seal from "../assets/wex-seal.png";

export default function ConfessionCard({ confession }) {
  const getCategoryBadge = (cat) => {
    switch (cat) {
      case "Regret":
        return "💔 Regret";
      case "Secret":
        return "🤫 Secret";
      case "Happy":
        return "😊 Happy";
      case "Funny":
        return "😂 Funny";
      case "Sad":
        return "😢 Sad";
      default:
        return cat;
    }
  };

  return (
    <div className="relative p-5 sm:p-6 overflow-hidden rounded-xl">

      {/* ⭐ BLURRED BACKGROUND IMAGE */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(0px)",
          transform: "scale(1.1)",
        }}
      ></div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/20"></div>

      {/* SEAL */}
      <img
        src={seal}
        alt="seal"
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-70 h-55 opacity-40 pointer-events-none
          animate-fade-in
        "
        style={{ zIndex: 30 }}
      />

      {/* CONTENT */}
      <div className="relative z-40">

        {/* ⭐ TOP ROW — Avatar Left | Category Right */}
        <div className="flex items-center justify-between mb-3">

          {/* Avatar */}
          <div className="flex items-center gap-2">
            <img
              src={confession.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border border-[#6E1616]"
            />
          </div>

          {/* Category Badge */}
          <span
            className="
              inline-block px-3 py-1 
              text-xs sm:text-sm font-semibold 
              rounded-full
            "
            style={{
              backgroundColor: "#6E1616",
              color: "#E8D3A8",
              fontFamily: "'Dancing Script', cursive",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {getCategoryBadge(confession.category)}
          </span>
        </div>

        {/* CONFESSION TEXT */}
        <p
          className="text-base sm:text-lg lg:text-xl leading-relaxed clamp-3"
          style={{
            color: "#3A1F0A",
            fontFamily: "'Dancing Script', cursive",
            fontWeight: "bold",
          }}
        >
          {confession.confession}
        </p>

        {/* READ MORE + TIME */}
        <div className="mt-4 flex items-center justify-between">

          <Link
            to={`/confession/${confession._id}`}
            className="
              font-bold text-sm sm:text-base
              underline underline-offset-4 transition
            "
            style={{
              color: "#6B4F30",
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            Read more
          </Link>

          <small
            className="text-xs sm:text-sm"
            style={{
              color: "#6B4F30",
              fontFamily: "'Dancing Script', cursive",
              fontWeight: "bold",
            }}
          >
            {timeAgo(confession.createdAt)}
          </small>

        </div>
      </div>
    </div>
  );
}
