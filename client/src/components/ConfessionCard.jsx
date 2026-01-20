import { Link } from "react-router-dom";

export default function ConfessionCard({ confession }) {
  return (
    <div
      className="
        p-5 sm:p-6 
        rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* Confession Text */}
      <p
        className="
          text-pink-700
          text-base sm:text-lg lg:text-xl
          leading-relaxed
          clamp-3
        "
      >
        {confession.confession}
      </p>

      {/* Read More + Date in one line */}
      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/confession/${confession._id}`}
          className="
            bg-clip-text 
            text-transparent 
            bg-gradient-to-r from-indigo-500 to-pink-500 
            drop-shadow-md
            tracking-wide
            hover:opacity-75
            text-sm sm:text-base
            font-semibold
            underline
            underline-offset-4
          "
        >
          Read more →
        </Link>

        {/* <small className="text-purple-400 text-xs sm:text-sm">
          {new Date(confession.createdAt).toLocaleString()}
        </small> */}
      </div>
    </div>
  );
}
