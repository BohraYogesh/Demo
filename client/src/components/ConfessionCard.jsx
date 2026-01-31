import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";
import bg01 from "../assets/bg01.png";
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
    <div
      className="
        relative
        p-5 sm:p-6 
      "
      style={{
        backgroundImage: `url(${bg01})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Soft Background Overlay */}
      {/* <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div> */}

      {/* ⭐ BIG SEAL OVERLAY CENTER ME */}
      <img
        src={seal}
        alt="seal"
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-70 h-55 opacity-50
          pointer-events-none
          animate-fade-in
        "
        style={{ zIndex: 30 }}
      />

      {/* CATEGORY BADGE */}
      <span
        className="
          inline-block 
          px-3 py-1 
          text-xs sm:text-sm 
          font-semibold 
          rounded-full 
          mb-3 
          relative z-40
        "
        style={{ backgroundColor: '#6E1616', color: '#E8D3A8' }}
      >
        {getCategoryBadge(confession.category)}
      </span>

      {/* CONFESSION TEXT */}
      <p
        className="relative z-40 text-base sm:text-lg lg:text-xl leading-relaxed clamp-3"
        style={{ color: '#3A1F0A' }}
      >
        {confession.confession}
      </p>

      {/* Read More + Time */}
      <div className="mt-4 flex items-center justify-between relative z-40">
        <Link
          to={`/confession/${confession._id}`}
          className="
            font-semibold
            text-sm sm:text-base
            underline underline-offset-4
            hover:text-[#8B1E1E]
            transition
          "
          style={{ color: '#6B4F30' }}
        >
          Read more
        </Link>

        <small
          className="text-xs sm:text-sm"
          style={{ color: '#6B4F30' }}
        >
          {timeAgo(confession.createdAt)}
        </small>
      </div>
    </div>
  );
}
