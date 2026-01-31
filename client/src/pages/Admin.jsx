import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import api from "../api/api";
import seal from "../assets/wex-seal.png";
import bg01 from "../assets/bg01.png";

export default function Admin() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api.get("/confession").then((res) => setData(res.data));
  }, []);

  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const deleteConfession = async () => {
    try {
      await api.delete(`/confession/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setData(data.filter((c) => c._id !== selectedId));
      setShowModal(false);
      setSelectedId(null);
    } catch (err) {
      console.log(err);
    }
  };

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

  const categoryFilters = [
    { name: "All", label: "🌟 All" },
    { name: "Happy", label: "😊 Happy" },
    { name: "Sad", label: "😢 Sad" },
    { name: "Regret", label: "💔 Regret" },
    { name: "Funny", label: "😂 Funny" },
    { name: "Secret", label: "🤫 Secret" },
  ];

  const filteredData =
    filter === "All" ? data : data.filter((c) => c.category === filter);

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen">
      {/* HEADER */}
      <h1
        className="text-4xl sm:text-5xl text-center font-extrabold mb-2"
        style={{ fontFamily: "'Dancing Script', cursive", color: "#3B240C" }}
      >
        Admin Panel
      </h1>

      <h2
        className="text-center text-sm sm:text-base mb-3 tracking-wide"
        style={{ color: "#6B4F30" }}
      >
        Manage All Confessions
      </h2>

      {/* COUNT */}
      <p
        className="text-center mb-8 text-sm sm:text-base font-medium"
        style={{ color: "#4A2B0C" }}
      >
        Total Confessions:
        <span className="font-bold text-[#6E1616]"> {filteredData.length}</span>
      </p>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categoryFilters.map((cat) => {
          const active = filter === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setFilter(cat.name)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  active
                    ? "bg-[#6E1616] text-[#E8D3A8] scale-105 shadow-lg"
                    : "bg-white/20 text-[#3A1F0A] border border-[#C9A86A]/50 hover:bg-white/40"
                }
              `}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* CONFESSIONS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredData.map((confession) => (
          <div
            key={confession._id}
            className="
              relative bg-[rgba(255,255,255,0.25)] backdrop-blur-xl
              border border-[#C9A86A]/40 rounded-2xl p-6 shadow-lg
              hover:shadow-2xl hover:-translate-y-1 transition-all
            "
          >
            {/* SEAL */}
            <img
              src={seal}
              alt="seal"
              className="
    absolute left-1/2 top-1/2
    -translate-x-1/2 -translate-y-1/2
    pointer-events-none animate-fade-in
    opacity-40
  "
              style={{
                zIndex: 30,
                width: "60%", // mobile/tablet responsive width
                maxWidth: "280px", // on large screens
                height: "auto",
              }}
            />

            {/* ⭐ TOP BAR (Avatar Left | Category Center | Trash Right) */}
            <div
              className="relative flex items-center justify-between mb-4"
              style={{ zIndex: 40 }}
            >
              {/* LEFT → Avatar */}
              <img
                src={confession.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover border border-[#6E1616]"
              />

              {/* CENTER → Category (Perfect center absolute) */}
              <span
                className="
                  absolute left-1/2 -translate-x-1/2
                  px-3 py-1 text-xs sm:text-sm 
                  rounded-full font-semibold
                "
                style={{
                  backgroundColor: "#6E1616",
                  color: "#E8D3A8",
                  whiteSpace: "nowrap",
                }}
              >
                {getCategoryBadge(confession.category)}
              </span>

              {/* RIGHT → Delete */}
              <button
                onClick={() => openModal(confession._id)}
                className="
                  p-2 bg-[#6E1616] text-[#E8D3A8]
                  rounded-full shadow-md
                  hover:scale-110 active:scale-95 transition
                "
                style={{ zIndex: 50 }}
              >
                <FiTrash2 />
              </button>
            </div>

            {/* CONFESSION TEXT */}
            <p
              className="text-base whitespace-pre-wrap relative"
              style={{ color: "#3A1F0A", zIndex: 40 }}
            >
              {confession.confession}
            </p>

            {/* DATE */}
            <p
              className="text-xs text-right mt-4 relative"
              style={{ color: "#6B4F30", zIndex: 40 }}
            >
              {new Date(confession.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* NO DATA */}
      {filteredData.length === 0 && (
        <p className="text-center mt-10 text-lg" style={{ color: "#6B4F30" }}>
          No confessions found…
        </p>
      )}

      {/* DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center px-4">
          <div
            className="
              w-full max-w-sm p-6 text-center bg-cover bg-center bg-no-repeat
              relative overflow-hidden
            "
            style={{ backgroundImage: `url(${bg01})` }}
          >
            <h3
              className="text-lg sm:text-xl font-bold"
              style={{ color: "#3A1F0A" }}
            >
              Delete Confession?
            </h3>

            <p className="mt-2 text-sm" style={{ color: "#6B4F30" }}>
              Are you sure you want to delete this confession?
            </p>

            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="
                  px-4 py-2 rounded-xl bg-white/40 
                  text-[#3A1F0A] font-medium hover:bg-white/60 transition
                "
              >
                Cancel
              </button>

              <button
                onClick={deleteConfession}
                className="
                  px-4 py-2 rounded-xl bg-[#6E1616] 
                  text-[#E8D3A8] hover:bg-[#5A1212] transition font-semibold
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
